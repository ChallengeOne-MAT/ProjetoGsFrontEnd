import { useEffect } from 'react';

export default function usePushNotifications(message: string) {
  useEffect(() => {
    if (!("Notification" in window)) {
      console.warn("Este navegador não suporta notificações.");
      return;
    }

    if (Notification.permission === "granted") {
      new Notification("🚨 Alerta de emergência!", { body: message });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("🚨 Alerta de emergência!", { body: message });
        }
      });
    }
  }, [message]);
}
