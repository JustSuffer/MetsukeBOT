import { useState, useEffect, useRef, useCallback } from 'react';

// Default mock WebSocket URL for Metsuke ESP32-S3
const WS_URL = 'ws://192.168.4.1/ws';

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [telemetry, setTelemetry] = useState({
    distance: 145,
    battery: 8.2,
    signal: 98
  });
  const ws = useRef(null);

  useEffect(() => {
    // In a real scenario, we establish a WS connection to the ESP32 here
    // For Metsuke Controller demo/UI mock, we will simulate the connection
    setIsConnected(true);

    // Mock telemetry updates
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        ...prev,
        distance: Math.max(10, Math.min(400, prev.distance + (Math.random() > 0.5 ? 2 : -2))),
        signal: Math.max(20, Math.min(100, prev.signal + (Math.random() > 0.8 ? 1 : -1)))
      }));
    }, 2000);

    return () => {
      clearInterval(interval);
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendCommand = useCallback((command) => {
    // Expected format e.g: {"type": "move", "dir": "forward", "speed": 255}
    console.log('[WebSocket TX]', JSON.stringify(command));
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(command));
    }
  }, []);

  return { isConnected, telemetry, sendCommand };
};
