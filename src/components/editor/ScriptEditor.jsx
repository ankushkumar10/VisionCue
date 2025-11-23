import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScript } from '../../contexts/ScriptContext';
import { PencilIcon, PlayIcon, TrashIcon, DocumentPlusIcon } from '@heroicons/react/24/solid';

export default function ScriptEditor() {
  const { currentScript, saveScript, createNewScript, deleteScript, scripts } = useScript();
  const [title, setTitle] = useState(currentScript?.title || 'Untitled Script');
  const [content, setContent] = useState(currentScript?.content || '');
  const navigate = useNavigate();

  // Update local state when current script changes
  useEffect(() => {
    if (currentScript) {
      setTitle(currentScript.title);
      setContent(currentScript.content);
    }
  }, [currentScript]);

  // Save the script with debounce
  const handleSave = () => {
    saveScript({
      ...currentScript,
      title,
      content
    });
  };

  // Auto-save on changes
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSave();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [title, content]);

  const handleStartPrompt = () => {
    handleSave();
    navigate('/prompter');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex-grow flex flex-col sm:flex-row items-start sm:items-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold bg-transparent border-b border-gray-300 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:focus:border-blue-400 mr-2 w-full sm:w-auto"
            aria-label="Script title"
          />
          
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <PencilIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(currentScript?.updatedAt).toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={createNewScript}
            className="bg-blue-600 text-white px-3 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors"
          >
            <DocumentPlusIcon className="h-5 w-5 mr-1" />
            New Script
          </button>
          
          {scripts.length > 1 && (
            <button
              onClick={() => deleteScript(currentScript.id)}
              className="bg-red-600 text-white p-2 rounded-md flex items-center hover:bg-red-700 transition-colors"
              aria-label="Delete script"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      
      {/* Script selector if multiple scripts exist */}
      {scripts.length > 1 && (
        <div className="mb-4">
          <select
            className="block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
            value={currentScript.id}
            onChange={(e) => loadScript(e.target.value)}
          >
            {scripts.map(script => (
              <option key={script.id} value={script.id}>
                {script.title}
              </option>
            ))}
          </select>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 min-h-[400px] text-gray-900 dark:text-white bg-transparent focus:outline-none resize-y"
          placeholder="Enter your script content here..."
        />
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleStartPrompt}
          className="bg-green-600 text-white px-4 py-3 rounded-md flex items-center hover:bg-green-700 transition-colors"
        >
          <PlayIcon className="h-5 w-5 mr-2" />
          Start Teleprompter
        </button>
      </div>
    </div>
  );
}