import { useState, useRef, useCallback, useEffect } from 'react';
import { useSettings } from '../contexts/SettingsContext';

export function usePrompterControls() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);
  const { settings } = useSettings();
  
  // Calculate scroll speed in pixels per frame
  const scrollSpeed = useCallback(() => {
    return settings.scrollSpeed * 0.5; // Adjust multiplier as needed for smooth scrolling
  }, [settings.scrollSpeed]);

  // Handles auto-scrolling animation
  const animate = useCallback(() => {
    if (scrollContainerRef.current) {
      // Update scroll position
      scrollContainerRef.current.scrollTop += scrollSpeed();
      setCurrentPosition(scrollContainerRef.current.scrollTop);
      
      // Find the current word based on scroll position
      if (settings.highlightEnabled) {
        const words = scrollContainerRef.current.querySelectorAll('.word');
        const containerRect = scrollContainerRef.current.getBoundingClientRect();
        const centerY = containerRect.top + containerRect.height / 3;
        
        for (let i = 0; i < words.length; i++) {
          const wordRect = words[i].getBoundingClientRect();
          if (wordRect.top <= centerY && wordRect.bottom >= centerY) {
            setHighlightedWordIndex(i);
            break;
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [settings.highlightEnabled, scrollSpeed]);

  // Start scrolling
  const play = useCallback(() => {
    setIsPlaying(true);
    animationRef.current = requestAnimationFrame(animate);
  }, [animate]);
  
  // Pause scrolling
  const pause = useCallback(() => {
    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);
  
  // Reset to beginning
  const reset = useCallback(() => {
    pause();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      setCurrentPosition(0);
      setHighlightedWordIndex(0);
    }
  }, [pause]);

  // Toggle play/pause
  const toggle = useCallback(() => {
    isPlaying ? pause() : play();
  }, [isPlaying, pause, play]);
  
  // Adjust speed during playback
  useEffect(() => {
    if (isPlaying) {
      // Restart animation with new speed
      cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [settings.scrollSpeed, animate, isPlaying]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return {
    isPlaying,
    currentPosition,
    highlightedWordIndex,
    scrollContainerRef,
    play,
    pause,
    reset,
    toggle
  };
}