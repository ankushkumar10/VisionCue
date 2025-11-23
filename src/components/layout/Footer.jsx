export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 text-center text-gray-600 dark:text-gray-400 text-sm">
      <div className="container mx-auto px-4">
        <p>
          VisionCue &copy; {new Date().getFullYear()} | Keyboard shortcuts: 
          <span className="ml-1 space-x-2">
            <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Space</kbd>
            <span>to play/pause</span>
          </span>
        </p>
        <p className="mt-2">
          <a href="#" className="text-blue-500 hover:underline">Help</a>
          <span className="mx-2">•</span>
          <a href="#" className="text-blue-500 hover:underline">Privacy</a>
          <span className="mx-2">•</span>
          <a href="#" className="text-blue-500 hover:underline">Terms</a>
        </p>
      </div>
    </footer>
  );
}