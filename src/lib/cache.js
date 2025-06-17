// utils/cache.js

export const cache = {
   set: (key, data, ttlMinutes = 10) => {
      const expires = Date.now() + ttlMinutes * 60 * 1000;
      const payload = { data, expires };
      localStorage.setItem(key, JSON.stringify(payload));
   },

   get: (key) => {
      const item = localStorage.getItem(key);
      if (!item) return null;

      try {
         const { data, expires } = JSON.parse(item);
         if (Date.now() > expires) {
            localStorage.removeItem(key);
            return null;
         }
         return data;
      } catch {
         localStorage.removeItem(key);
         return null;
      }
   },

   remove: (key) => {
      localStorage.removeItem(key);
   },

   clear: () => {
      localStorage.clear();
   },
};
