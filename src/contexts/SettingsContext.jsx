import { createContext, useContext } from 'react';
import useLocalStorageState from 'use-local-storage-state';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  // Default settings
  const [settings, setSettings] = useLocalStorageState('prompterSettings', {
    defaultValue: {
      scrollSpeed: 3,
      fontSize: 28,
      fontColor: '#ffffff',
      backgroundColor: '#000000',
      mirrored: false,
      highlightColor: '#ffcc00',
      highlightEnabled: true,
      fontFamily: 'Arial, sans-serif',
      lineHeight: 1.5,
      padding: 16,
      voiceControlEnabled: false
    }
  });

  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}