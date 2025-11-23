import { useState, useEffect } from 'react';

export default function Slider({ label, min, max, value, onChange, step = 1, disabled = false }) {
  const [localValue, setLocalValue] = useState(value);
  
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setLocalValue(newValue);
  };

  const handleAfterChange = () => {
    onChange(localValue);
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium">{label}</label>
        <span className="text-sm font-medium">{localValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={localValue}
        onChange={handleChange}
        onMouseUp={handleAfterChange}
        onTouchEnd={handleAfterChange}
        disabled={disabled}
        className={`w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      />
    </div>
  );
}