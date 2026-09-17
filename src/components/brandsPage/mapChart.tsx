"use client"

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CountryDataProps } from "@/types/typesProject";

interface MapChartProps {
    hoveredCountry: string | null;
    selectedCountry: string | null;
    countryAll: CountryDataProps[];
}

export default function MapChart({hoveredCountry, selectedCountry, countryAll}: MapChartProps) {
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.Marker[]>([]);
    const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const [mapStatus, setMapStatus] = useState<"loading" | "ready" | "error">("loading");

    useEffect(() => {
        if (selectedCountry) {
            highlightCountry(selectedCountry);
            
            const selectedData = countryAll.find(
                obj => obj.country.countryName === selectedCountry
            );
            
            if (selectedData && selectedData.country.coordinates) {
                markersRef.current.forEach(marker => {
                    const markerLatLng = marker.getLatLng();
                    if (markerLatLng.lat === selectedData.country.coordinates![0] && 
                        markerLatLng.lng === selectedData.country.coordinates![1]) {
                        marker.openPopup();
                    }
                });
            }
        } else {
            resetHighlight();
            markersRef.current.forEach(marker => marker.closePopup());
        }
    }, [countryAll, selectedCountry]);

    useEffect(() => {
        if (hoveredCountry && !selectedCountry) {
            highlightCountry(hoveredCountry);
        } else if (!selectedCountry) {
            resetHighlight();
        }
    }, [hoveredCountry, selectedCountry]);

    useEffect(() => {
        if (typeof window === 'undefined' || !mapContainerRef.current) return;
        const controller = new AbortController();
        let disposed = false;
        const initMap = async () => {
            try {
                const leaflet = (await import('leaflet')).default;
                if (disposed || !mapContainerRef.current) return;

                const map = leaflet.map(mapContainerRef.current).setView([20, 0], 2);
                mapRef.current = map;
                
                leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: ' ',
                    maxZoom: 18,
                    className: 'map-tiles',
                }).addTo(map);
                
                const customIcon = leaflet.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                });
                
                countryAll.forEach(obj => {
                    if (obj.country.coordinates) {
                        const [lat, lng] = obj.country.coordinates;
                        const marker = leaflet.marker([lat, lng], { icon: customIcon }).addTo(map);
                        
                        const popupContent = `
                            <div style="font-family: Arial, sans-serif; padding: 10px;">
                                <h3 style="margin: 0 0 10px; color: #000; font-size: 16px; font-weight: bold;">
                                    ${obj.country.countryName}
                                </h3>
                                <p style="margin: 5px 0; color: #666;">
                                    Revenue: <span style="color: #000; font-weight: bold;">${obj.financeData.revenue}B</span>
                                </p>
                                <p style="margin: 5px 0; color: #666;">
                                    Market Share: <span style="color: #000; font-weight: bold;">${obj.financeData.marketShare}%</span>
                                </p>
                                <p style="margin: 5px 0; color: #666;">
                                    Stores: <span style="color: #000; font-weight: bold;">${obj.financeData.storeCount}</span>
                                </p>
                                <p style="margin: 5px 0; color: #666;">
                                    Online Presence: <span style="color: #000; font-weight: bold;">${obj.financeData.onlinePresence}%</span>
                                </p>
                            </div>
                        `;
                        
                        marker.bindPopup(popupContent);
                        markersRef.current.push(marker);
                    }
                });
                
                const response = await fetch('/api/brand-map', { signal: controller.signal });
                if (!response.ok) throw new Error('Could not load map boundaries');
                const data = await response.json();
                if (disposed) return;
                const geoJsonLayer = leaflet.geoJSON(data, {
                    style: () => ({
                        fillColor: 'transparent',
                        weight: 1,
                        opacity: 1,
                        color: 'black',
                        fillOpacity: 0
                    })
                }).addTo(map);
                geoJsonLayerRef.current = geoJsonLayer;
                setMapStatus("ready");
            } catch (error) {
                if (!disposed && (error as Error).name !== "AbortError") setMapStatus("error");
            }
        };
        initMap();
        
        return () => {
            disposed = true;
            controller.abort();
            if (mapRef.current) {
                markersRef.current.forEach(marker => marker.remove());
                if (geoJsonLayerRef.current) {
                    geoJsonLayerRef.current.remove();
                }
                mapRef.current.remove();
                mapRef.current = null;
                markersRef.current = [];
                geoJsonLayerRef.current = null;
            }
        };
    }, [countryAll]);
    
    const highlightCountry = (countryName: string) => {
        if (geoJsonLayerRef.current) {
            geoJsonLayerRef.current.eachLayer((layer) => {
                const feature = (layer as L.Layer & { feature?: { properties?: { name?: string } } }).feature;
                if (feature?.properties?.name === countryName) {
                    (layer as L.Path).setStyle({
                        fillColor: '#000',
                        fillOpacity: 0.3
                    });
                }
            });
        }
    };
    
    const resetHighlight = () => {
        if (geoJsonLayerRef.current) {
            geoJsonLayerRef.current.eachLayer((layer) => {
                (layer as L.Path).setStyle({
                    fillColor: 'transparent',
                    fillOpacity: 0
                });
            });
        }
    };
    
    return (
        <article className="relative w-full max-w-[800px] h-[300px] sm:h-[470px] bg-white rounded-lg p-2 sm:p-4">
            <div ref={mapContainerRef} className="w-full h-full rounded-lg" aria-label="Brand country map" />
            {mapStatus === "loading" && <p className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/80 text-sm text-black/60">Loading map...</p>}
            {mapStatus === "error" && <p role="alert" className="absolute inset-0 flex items-center justify-center rounded-lg bg-white p-6 text-center text-sm text-black/60">The map is currently unavailable. Country data is still available in the list.</p>}
        </article>
    );
}