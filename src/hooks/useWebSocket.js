import { useState, useEffect, useRef, useCallback } from 'react';

const WS_URL = 'ws://192.168.4.1/ws';

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [telemetry, setTelemetry] = useState({
    distance: 0,
    battery: 0,
    signal: 0
  });
  const ws = useRef(null);
  const reconnectTimeout = useRef(null);

  const connect = useCallback(() => {
    if (ws.current) {
      ws.current.close();
    }

    console.log('[WebSocket] Connecting to Metsuke...', WS_URL);
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log("[WebSocket] Metsuke'ye bağlandım! (Connected)");
      setIsConnected(true);
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };

    ws.current.onclose = () => {
      console.log('[WebSocket] Bağlantı koptu (Disconnected)');
      setIsConnected(false);
      // Try to reconnect after 3 seconds
      reconnectTimeout.current = setTimeout(() => {
        connect();
      }, 3000);
    };

    ws.current.onerror = (error) => {
      console.error('[WebSocket] Hata (Error)', error);
      ws.current.close();
    };

    ws.current.onmessage = (event) => {
      // Handle "distance" sent as string or JSON from ESP32
      try {
        const data = JSON.parse(event.data);
        setTelemetry(prev => ({ ...prev, ...data }));
      } catch (err) {
        // Fallback for simple raw string messages e.g. distance value "145"
        console.log("Robottan gelen veri:", event.data);
        if (!isNaN(parseFloat(event.data))) {
          setTelemetry(prev => ({ ...prev, distance: parseFloat(event.data) }));
        }
      }
    };
  }, []);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
      if (ws.current) {
        ws.current.onclose = null; // Prevent reconnection attempt on unmount
        ws.current.close();
      }
    };
  }, [connect]);

  const sendCommand = useCallback((command) => {
    console.log('[WebSocket TX]', command);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      // Send command as string if it's already a string, or JSON stringify it if it's an object
      const payload = typeof command === 'string' ? command : JSON.stringify(command);
      ws.current.send(payload);
    } else {
      console.warn('[WebSocket TX Failed] Not connected to Metsuke!');
    }
  }, []);

  return { isConnected, telemetry, sendCommand };
};
