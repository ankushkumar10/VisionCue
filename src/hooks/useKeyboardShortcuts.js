import { useEffect } from 'react';

export default function useKeyboardShortcuts(shortcuts) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in input fields
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }
      
      for (const { key, metaKey, ctrlKey, action } of shortcuts) {
        if (
          e.key.toLowerCase() === key.toLowerCase() &&
          !!e.metaKey === !!metaKey &&
          !!e.ctrlKey === !!ctrlKey
        ) {
          e.preventDefault();
          action(e);
          break;
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.addEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
}