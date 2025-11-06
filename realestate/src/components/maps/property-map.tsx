"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { Icon, LatLngExpression } from "leaflet";
import type { Property } from "@/data/properties";

const MapContainer = dynamic(
  async () =>
    (await import("react-leaflet")).MapContainer,
  { ssr: false },
);

const TileLayer = dynamic(
  async () =>
    (await import("react-leaflet")).TileLayer,
  { ssr: false },
);

const Marker = dynamic(
  async () =>
    (await import("react-leaflet")).Marker,
  { ssr: false },
);

const Popup = dynamic(
  async () =>
    (await import("react-leaflet")).Popup,
  { ssr: false },
);

const Circle = dynamic(
  async () =>
    (await import("react-leaflet")).Circle,
  { ssr: false },
);

import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { RegionBadge } from "@/components/property/region-badge";

type PropertyMapProps = {
  properties: Property[];
  userLocation?: { lat: number; lng: number };
};

export function PropertyMap({ properties, userLocation }: PropertyMapProps) {
  const [icons, setIcons] = useState<{ property?: Icon; user?: Icon }>({});

  useEffect(() => {
    let active = true;
    import("leaflet").then((leaflet) => {
      if (!active) return;
      setIcons({
        property: leaflet.icon({
          iconUrl: "/map-pin.svg",
          iconRetinaUrl: "/map-pin.svg",
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -32],
        }),
        user: leaflet.icon({
          iconUrl:
            "data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='18' cy='18' r='16' stroke='%232C8C7D' stroke-width='4' fill='white'/%3E%3Ccircle cx='18' cy='18' r='6' fill='%234C67D3'/%3E%3C/svg%3E",
          iconRetinaUrl:
            "data:image/svg+xml,%3Csvg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='18' cy='18' r='16' stroke='%232C8C7D' stroke-width='4' fill='white'/%3E%3Ccircle cx='18' cy='18' r='6' fill='%234C67D3'/%3E%3C/svg%3E",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        }),
      });
    });
    return () => {
      active = false;
    };
  }, []);

  const center = useMemo<LatLngExpression>(() => {
    if (userLocation) {
      return [userLocation.lat, userLocation.lng];
    }
    return [27.7172, 85.324]; // Kathmandu default
  }, [userLocation]);

  return (
    <div className="overflow-hidden rounded-[32px] border border-[var(--color-border)] shadow-lg">
      <MapContainer
        center={center}
        zoom={userLocation ? 10 : 7}
        className="h-[420px] w-full"
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && icons.user && (
          <>
            <Marker position={center} icon={icons.user} />
            <Circle center={center} radius={1500} pathOptions={{ color: "#2C8C7D", opacity: 0.35 }} />
          </>
        )}

        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.coordinates.lat, property.coordinates.lng]}
            icon={icons.property}
          >
            <Popup minWidth={220}>
              <div className="space-y-2">
                <div className="relative h-28 w-full overflow-hidden rounded-2xl">
                  <Image
                    src={property.heroImage}
                    alt={property.title}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <RegionBadge region={property.region} />
                  <h3 className="text-sm font-semibold text-foreground">
                    {property.title}
                  </h3>
                  <p className="text-xs text-[var(--color-muted)]">
                    {property.location}
                  </p>
                  <p className="text-sm font-semibold text-[var(--color-primary)]">
                    {property.price}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
