'use client';

import { useEffect } from 'react';

const BUILD_VERSION = '1.9.6';

export default function RegisterAdminSW() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    let registration: ServiceWorkerRegistration | undefined;

    const register = async () => {
      try {
        registration = await navigator.serviceWorker.register(
          `/admin-sw.js?v=${BUILD_VERSION}`,
          { scope: '/admin/' }
        );

        await registration.update();

        const worker = registration.waiting || registration.installing;

        if (worker) {
          worker.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) {
              window.location.reload();
            }
          });
        }
      } catch (error) {
        console.error('Admin PWA service worker registration failed:', error);
      }
    };

    register();

    const onControllerChange = () => {
      window.location.reload();
    };

    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
    };
  }, []);

  return null;
}
