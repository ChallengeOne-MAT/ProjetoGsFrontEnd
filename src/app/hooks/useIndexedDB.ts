import { useEffect } from 'react';
import { openDB } from 'idb'; 

export function useIndexedDB(key: string, value: any) {
  useEffect(() => {
    if (!('indexedDB' in window)) {
      console.warn('IndexedDB não suportado');
      return;
    }
    const save = async () => {
      const db = await openDB('MeuDB', 1, {
        upgrade(db: { createObjectStore: (arg0: string) => void; }) {
          db.createObjectStore('store');
        },
      });
      await db.put('store', value, key);
    };
    save();
  }, [key, value]);
}
