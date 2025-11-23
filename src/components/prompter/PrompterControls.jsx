import { ArrowUturnLeftIcon, PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import Slider from '../common/Slider';

export default function PrompterControls({ 
  isPlaying, 
  onPlay, 
  onPause, 
  onReset, 
  onBack,
  scrollSpeed
}) {
  return (
    <div className="bg-gray-800 text-white p-2 shadow-md flex items-center justify-between">
      <button
        onClick={onBack}
        className="rounded-full bg-gray-700 p-2 hover:bg-gray-600 flex items-center"
        aria-label="Back to editor"
      >
        <ArrowUturnLeftIcon className="h-5 w-5" />
        <span className="ml-2 hidden sm:inline">Back</span>
      </button>

      <div className="flex items-center space-x-2">
        <button
          onClick={onReset}
          className="rounded-full bg-gray-700 p-2 hover:bg-gray-600"
          aria-label="Reset"
        >
          <ArrowPathIcon className="h-5 w-5" />
        </button>
        
        {isPlaying ? (
          <button
            onClick={onPause}
            className="rounded-full bg-red-600 p-3 hover:bg-red-700"
            aria-label="Pause"
          >
            <PauseIcon className="h-6 w-6" />
          </button>
        ) : (
          <button
            onClick={onPlay}
            className="rounded-full bg-green-600 p-3 hover:bg-green-700"
            aria-label="Play"
          >
            <PlayIcon className="h-6 w-6" />
          </button>
        )}
      </div>

      <div className="flex-grow mx-4 max-w-xs hidden sm:block">
        <Slider
          label="Speed"
          min={1}
          max={10}
          value={scrollSpeed}
          onChange={() => {}} // Speed is controlled through settings context
          disabled
        />
      </div>

      <div className="text-sm text-gray-300 italic">
        <span className="hidden sm:inline">Press </span>
        <kbd className="px-1 bg-gray-700 rounded">Space</kbd>
        <span className="hidden sm:inline"> to toggle play/pause</span>
      </div>
    </div>
  );
}