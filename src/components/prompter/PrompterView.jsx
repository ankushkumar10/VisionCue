import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotkeys } from 'react-hotkeys-hook';
import { useScript } from '../../contexts/ScriptContext';
import { useSettings } from '../../contexts/SettingsContext';
import { usePrompterControls } from '../../hooks/usePrompterControls';
import ScriptDisplay from './ScriptDisplay';
import PrompterControls from './PrompterControls';

export default function PrompterView() {
  const { currentScript } = useScript();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const {
    isPlaying,
    currentPosition,
    highlightedWordIndex,
    scrollContainerRef,
    play,
    pause,
    reset,
    toggle
  } = usePrompterControls();

  // Register keyboard shortcuts
  useHotkeys('space', (e) => {
    e.preventDefault();
    toggle();
  });
  
  useHotkeys('r', (e) => {
    e.preventDefault();
    reset();
  });
  
  useHotkeys('escape', (e) => {
    e.preventDefault();
    pause();
    navigate('/');
  });
  
  useHotkeys('up', (e) => {
    e.preventDefault();
    // Scroll up manually
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop -= 50;
    }
  });
  
  useHotkeys('down', (e) => {
    e.preventDefault();
    // Scroll down manually
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop += 50;
    }
  });

  // Voice control using Web Speech API (if enabled)
  useEffect(() => {
    if (settings.voiceControlEnabled) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        
        recognition.onresult = (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
          
          if (transcript.includes('play') || transcript.includes('start')) {
            play();
          } else if (transcript.includes('pause') || transcript.includes('stop')) {
            pause();
          } else if (transcript.includes('reset')) {
            reset();
          } else if (transcript.includes('exit') || transcript.includes('back')) {
            navigate('/');
          }
        };
        
        recognition.start();
        return () => recognition.stop();
      }
    }
  }, [settings.voiceControlEnabled, play, pause, reset, navigate]);

  return (
    <div className="h-screen flex flex-col">
      <div 
        className={`relative flex-grow overflow-hidden ${settings.mirrored ? 'scale-x-[-1]' : ''}`}
        style={{ backgroundColor: settings.backgroundColor }}
      >
        <ScriptDisplay
          ref={scrollContainerRef}
          content={currentScript.content}
          highlightedWordIndex={highlightedWordIndex}
          settings={settings}
        />
        
        {/* Center marker line */}
        <div className="absolute left-0 right-0 border-t-2 border-red-500 pointer-events-none"
          style={{ top: '33%' }}
        />
      </div>
      
      <PrompterControls
        isPlaying={isPlaying}
        onPlay={play}
        onPause={pause}
        onReset={reset}
        onBack={() => navigate('/')}
        scrollSpeed={settings.scrollSpeed}
      />
    </div>
  );
}