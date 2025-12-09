import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const DonationMap = ({ location, title }) => {
  // Default to Delhi if no coordinates provided
  const defaultLat = location?.coordinates?.lat || 28.6139;
  const defaultLng = location?.coordinates?.lng || 77.2090;

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg border-2 border-blue-200">
      <MapContainer
        center={[defaultLat, defaultLng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        {/* OpenStreetMap Tile Layer - 100% FREE */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Marker for donation location */}
        <Marker position={[defaultLat, defaultLng]}>
          <Popup>
            <div className="text-center">
              <p className="font-bold text-blue-600">{title || 'Donation Location'}</p>
              <p className="text-sm text-gray-600 mt-1">
                {location?.address || 'Address not provided'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                📍 {location?.city || 'City'}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default DonationMap;