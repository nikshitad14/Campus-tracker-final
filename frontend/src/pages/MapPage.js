import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchRoutes, fetchRoute } from '../utils/api';

// Fix Leaflet default icon issue with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const COLORS = ['#1B4FE4','#FF6B35','#16A34A','#9333EA'];

export default function MapPage() {
  const [routes, setRoutes]         = useState([]);
  const [routeDetails, setDetails]  = useState({});
  const [activeRoute, setActive]    = useState(null);

  useEffect(() => {
    fetchRoutes().then(r => {
      const data = r.data.data;
      setRoutes(data);
      // Load stops for each route
      data.forEach(route => {
        fetchRoute(route.route_id).then(res => {
          setDetails(prev => ({ ...prev, [route.route_id]: res.data.data }));
        });
      });
    });
  }, []);

  const VCE_CENTER = [17.530, 78.298];

  return (
    <div>
      <h1 className="page-title">🗺️ Campus Bus Map</h1>
      <p className="page-subtitle">Interactive map showing all bus routes and stops.</p>

      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        <button
          className={`btn ${activeRoute === null ? 'btn-primary' : 'btn-outline'} btn-sm`}
          onClick={() => setActive(null)}
        >All Routes</button>
        {routes.map((r, i) => (
          <button
            key={r.route_id}
            className={`btn btn-sm`}
            style={{
              background: activeRoute === r.route_id ? COLORS[i % COLORS.length] : 'transparent',
              color: activeRoute === r.route_id ? '#fff' : COLORS[i % COLORS.length],
              border: `1.5px solid ${COLORS[i % COLORS.length]}`
            }}
            onClick={() => setActive(activeRoute === r.route_id ? null : r.route_id)}
          >
            {r.route_code}: {r.route_name}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <MapContainer center={VCE_CENTER} zoom={11} style={{ height: 500 }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {routes.map((route, idx) => {
            const detail = routeDetails[route.route_id];
            if (!detail?.stops) return null;
            if (activeRoute && activeRoute !== route.route_id) return null;

            const stops = detail.stops.filter(s => s.latitude && s.longitude);
            const positions = stops.map(s => [parseFloat(s.latitude), parseFloat(s.longitude)]);
            const color = COLORS[idx % COLORS.length];

            return (
              <React.Fragment key={route.route_id}>
                {positions.length > 1 && (
                  <Polyline positions={positions} color={color} weight={3} opacity={0.8} />
                )}
                {stops.map((stop, i) => (
                  <Marker key={stop.stop_id} position={[parseFloat(stop.latitude), parseFloat(stop.longitude)]}>
                    <Popup>
                      <strong>{stop.stop_name}</strong><br />
                      Route: {route.route_name}<br />
                      Stop #{stop.stop_order}
                    </Popup>
                  </Marker>
                ))}
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

      <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 12, textAlign: 'center' }}>
        📌 Click markers to see stop details. Toggle routes using the buttons above.
      </p>
    </div>
  );
}
