"use client"

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CountryDataProps } from "@/types/typeCountryData";

interface MapChartProps {
    hoveredCountry: string | null;
    selectedCountry: string | null;
    countryAll: CountryDataProps[];
}

export default function MapChart({hoveredCountry, selectedCountry, countryAll}: MapChartProps) {
    const mapRef = useRef<L.Map | null>(null);
    const markersRef = useRef<L.Marker[]>([]);
    const [highlightedCountry, setHighlightedCountry] = useState<string | null>(null);
    const geoJsonLayerRef = useRef<L.GeoJSON | null>(null);

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
    }, [selectedCountry]);

    useEffect(() => {
        if (hoveredCountry && !selectedCountry) {
            highlightCountry(hoveredCountry);
        } else if (!selectedCountry) {
            resetHighlight();
        }
    }, [hoveredCountry, selectedCountry]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        let L: any;
        
        const initMap = async () => {
            try {
                L = (await import('leaflet')).default;
                
                const map = L.map('map').setView([20, 0], 2);
                mapRef.current = map;
                
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: ' ',
                    maxZoom: 18,
                    className: 'map-tiles',
                }).addTo(map);
                
                const customIcon = L.icon({
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
                        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
                        
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
                
                fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
                    .then(response => response.json())
                    .then(data => {
                        const geoJsonLayer = L.geoJSON(data, {
                            style: (feature: any) => ({
                                fillColor: 'transparent',
                                weight: 1,
                                opacity: 1,
                                color: 'black',
                                fillOpacity: 0
                            })
                        }).addTo(map);
                        
                        geoJsonLayerRef.current = geoJsonLayer;
                    });
            } catch (error) {
                console.error('Error initializing map:', error);
            }
        };
        initMap();
        
        return () => {
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
    }, []);
    
    const highlightCountry = (countryName: string) => {
        if (geoJsonLayerRef.current) {
            geoJsonLayerRef.current.eachLayer((layer: any) => {
                if (layer.feature.properties.name === countryName) {
                    layer.setStyle({
                        fillColor: '#000',
                        fillOpacity: 0.3
                    });
                }
            });
        }
    };
    
    const resetHighlight = () => {
        if (geoJsonLayerRef.current) {
            geoJsonLayerRef.current.eachLayer((layer: any) => {
                layer.setStyle({
                    fillColor: 'transparent',
                    fillOpacity: 0
                });
            });
        }
    };
    
    useEffect(() => {
        if (highlightedCountry) {
            highlightCountry(highlightedCountry);
        } else {
            resetHighlight();
        }
    }, [highlightedCountry]);

    return (
        <article className="w-[800px] h-[470px] bg-white rounded-lg p-4">
            <div id="map" className="w-full h-full rounded-lg"></div>
        </article>
    );
}