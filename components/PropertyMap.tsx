'use client';

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PropertyMapProps {
  location: string;
  coordinates?: { lat: number; lng: number };
}

export const PropertyMap: React.FC<PropertyMapProps> = ({ location, coordinates }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Default to Beverly Hills coordinates if not specified
  const lat = coordinates?.lat || 34.0736;
  const lng = coordinates?.lng || -118.4004;

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Create a custom SVG marker pin using Leaflet divIcon
      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `
          <div style="
            width: 40px;
            height: 40px;
            background-color: #C9A96E;
            border: 3px solid #0A1A1A;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);
            animation: bounce 2s infinite;
          ">
            <svg style="width: 20px; height: 20px; color: #0A1A1A;" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z"/>
            </svg>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      L.marker([lat, lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family: sans-serif; font-size: 13px; font-weight: 600; color: #0A1A1A;">
            <strong>Aura Estate</strong><br/>${location}
          </div>`
        );

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([lat, lng], 14);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, location]);

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-midnight-onyx/10 z-0">
      <div ref={mapRef} className="w-full h-full" />
      <div className="absolute bottom-3 left-3 right-3 bg-cloud-white/90 backdrop-blur-md p-3 rounded-xl border border-midnight-onyx/10 flex justify-between items-center z-[400] shadow-md">
        <div className="text-xs text-midnight-onyx font-medium truncate pr-2">
          📍 {location}
        </div>
        <a
          href={`https://maps.google.com/?q=${lat},${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-desert-gold hover:underline whitespace-nowrap">
          Abrir en Google Maps ↗
        </a>
      </div>
    </div>
  );
};
