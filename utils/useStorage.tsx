declare global {
    interface Window {
      setItem:any;
      removeItem:any
    }
  }
  
  // Hook to perform curd operations on localstorage variables. 
  const useStorage = () => {
      // type would be 'session' | 'local'
  
    const storageType: any = (type: string) => `${type ?? 'local'}Storage`;
  
    const isBrowser = typeof window !== 'undefined'
  
    // function to get local storage value
    const getItem = (key: any, type?: string) => {
      return isBrowser ? window[storageType(type ?? 'local')][key] : '';
    };
  
    // function to set value to local storage
    const setItem = (key: string, value: any, type?: string) => {
      if (isBrowser) {
        window[storageType(type ?? 'local')].setItem(key, value);
        return true;
      }
      return false;
    };
  
    // function to remove value from local storage
    const removeItem = (key: string, type?: string) => {
      window[storageType(type || 'local')].removeItem(key);
    };
  
    return {
      getItem,
      setItem,
      removeItem,
    };
  };
  
  export default useStorage;