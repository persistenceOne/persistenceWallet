// Safe localStorage utilities for Next.js SSR compatibility

export const safeGetItem = (key) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('Error accessing localStorage:', error);
      return null;
    }
  }
  return null;
};

export const safeGetJSON = (key) => {
  const item = safeGetItem(key);
  if (item) {
    try {
      return JSON.parse(item);
    } catch (error) {
      console.warn('Error parsing JSON from localStorage:', error);
      return null;
    }
  }
  return null;
};

export const safeSetItem = (key, value) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn('Error setting localStorage:', error);
      return false;
    }
  }
  return false;
};

export const safeSetJSON = (key, value) => {
  try {
    return safeSetItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Error stringifying value for localStorage:', error);
    return false;
  }
};
