import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { useTheme } from '../contexts/ThemeContext';
import Slider from '../components/common/Slider';
import Toggle from '../components/common/Toggle';

export default function SettingsPage() {
  const { settings, updateSettings } = useSettings();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  
  const fontOptions = [
    'Arial, sans-serif',
    'Georgia, serif',
    'Courier New, monospace',
    'Verdana, sans-serif',
    'Trebuchet MS, sans-serif',
    'Times New Roman, serif',
    'Impact, fantasy',
    'Roboto, sans-serif'
  ];
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Teleprompter Settings</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save & Return
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Display Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Slider
              label="Scroll Speed"
              min={1}
              max={10}
              value={settings.scrollSpeed}
              onChange={(value) => updateSettings({ scrollSpeed: value })}
            />
            
            <Slider
              label="Font Size"
              min={12}
              max={72}
              value={settings.fontSize}
              onChange={(value) => updateSettings({ fontSize: value })}
            />
            
            <Slider
              label="Line Height"
              min={1}
              max={3}
              step={0.1}
              value={settings.lineHeight}
              onChange={(value) => updateSettings({ lineHeight: value })}
            />
            
            <Slider
              label="Padding"
              min={0}
              max={100}
              value={settings.padding}
              onChange={(value) => updateSettings({ padding: value })}
            />
          </div>
          
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Font Family
              </label>
              <select
                value={settings.fontFamily}
                onChange={(e) => updateSettings({ fontFamily: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
              >
                {fontOptions.map(font => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font.split(',')[0]}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Font Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.fontColor}
                  onChange={(e) => updateSettings({ fontColor: e.target.value })}
                  className="h-10 w-10 cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={settings.fontColor}
                  onChange={(e) => updateSettings({ fontColor: e.target.value })}
                  className="flex-grow p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Background Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                  className="h-10 w-10 cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={settings.backgroundColor}
                  onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                  className="flex-grow p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Highlight Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.highlightColor}
                  onChange={(e) => updateSettings({ highlightColor: e.target.value })}
                  className="h-10 w-10 cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={settings.highlightColor}
                  onChange={(e) => updateSettings({ highlightColor: e.target.value })}
                  className="flex-grow p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                />
                </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <Toggle
            label="Mirror Text (for teleprompter hardware)"
            checked={settings.mirrored}
            onChange={() => updateSettings({ mirrored: !settings.mirrored })}
          />
          
          <Toggle
            label="Word Highlighting"
            checked={settings.highlightEnabled}
            onChange={() => updateSettings({ highlightEnabled: !settings.highlightEnabled })}
          />
          
          <Toggle
            label="Voice Control (experimental)"
            checked={settings.voiceControlEnabled}
            onChange={() => updateSettings({ voiceControlEnabled: !settings.voiceControlEnabled })}
          />
          
          <Toggle
            label="Dark Mode"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Keyboard Shortcuts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between border-b pb-2">
            <span>Start/Pause Teleprompter</span>
            <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Space</kbd>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span>Reset Teleprompter</span>
            <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">R</kbd>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span>Exit Teleprompter</span>
            <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Esc</kbd>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span>Scroll Up</span>
            <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">↑</kbd>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span>Scroll Down</span>
            <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">↓</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}