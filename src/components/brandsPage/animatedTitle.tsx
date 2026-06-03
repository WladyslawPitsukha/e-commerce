"use client"

import { useEffect, useState } from "react";

interface AnimateTitleProps {
    title: string;
    className?: string;
}

export default function AnimatedTitle({
    title,
    className = "text-white font-integral font-bold text-9xl uppercase",
}: AnimateTitleProps) {
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true)
    }, [])

    return(
        <h1 
            className={`animated-gradient-text ${isVisible ? 'visible' : ''} ${className}`}
            style={{
                background: 'linear-gradient(90deg, #000000, #FFFFFF, #F0F0F0)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                backgroundSize: '200% auto'
            }}
        >
            {title}
        </h1>
    )
}