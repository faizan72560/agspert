import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AnimateRoute = ({ path }) => {
  const map = useMap();
  const [step, setStep] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setStep((currentStep) => {
        const nextStep = currentStep + 1;
        if (nextStep >= path.length) {
          clearInterval(intervalId);
          return currentStep;
        }
        return nextStep;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [path]);

  useEffect(() => {
    map.panTo(path[step]);
  }, [step, map, path]);

  return (
    <>
      <Marker position={path[step]} />
      <Polyline positions={path} />
    </>
  );
};

const WalkingRouteAnimation = () => {
  const startPosition = [40.7128, -74.0060];
  const endPosition = [40.730610, -73.935242];
  const path = [startPosition];


  for (let i = 1; i <= 100; i++) {
    const lat = startPosition[0] + (endPosition[0] - startPosition[0]) * (i / 100);
    const lng = startPosition[1] + (endPosition[1] - startPosition[1]) * (i / 100);
    path.push([lat, lng]);
  }

  return (
    <MapContainer center={startPosition} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <AnimateRoute path={path} />
    </MapContainer>
  );
};

export default WalkingRouteAnimation;
