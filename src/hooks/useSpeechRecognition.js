import { useState, useEffect } from 'react';

export function useSpeechRecognition({ 
  onResult = () => {}, 
  onError = () => {},
  continuous = true,
  interimResults = true,
  enabled = false
}) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Get the SpeechRecognition object (different in browsers)
    const SpeechRecognition = 
      window.SpeechRecognition || 
      window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      onError(new Error('Speech recognition not supported in this browser'));
      return;
    }
    
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = continuous;
    recognitionInstance.interimResults = interimResults;
    recognitionInstance.lang = 'en-US'; // Can make this configurable
    
    recognitionInstance.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const transcript = result[0].transcript;
      const isFinal = result.isFinal;
      
      onResult({ transcript, isFinal });
    };
    
    recognitionInstance.onerror = (event) => {
      onError(new Error(event.error || 'Unknown speech recognition error'));
    };
    
    recognitionInstance.onend = () => {
      if (isListening) {
        // Auto-restart if we're supposed to be listening
        recognitionInstance.start();
      } else {
        setIsListening(false);
      }
    };
    
    setRecognition(recognitionInstance);
    
    return () => {
      try {
        recognitionInstance.stop();
      } catch (e) {
        // Ignore errors on cleanup
      }
    };
  }, [continuous, interimResults, onError, onResult]);

  useEffect(() => {
    if (!recognition) return;
    
    if (enabled && !isListening) {
      try {
        recognition.start();
        setIsListening(true);
      } catch (e) {
        onError(e);
      }
    } else if (!enabled && isListening) {
      try {
        recognition.stop();
        setIsListening(false);
      } catch (e) {
        onError(e);
      }
    }
  }, [enabled, isListening, onError, recognition]);

  const toggle = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      recognition?.start();
      setIsListening(true);
    }
  };

  return {
    isListening,
    toggle,
    supported: !!recognition
  };
}