import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { SunIcon, MoonIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/logo.png'
import textLogo from '../../assets/textLogo.png'

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
          <img src={logo} alt="" style={{height: '40px'}} />
          <img src={textLogo} alt="" style={{height: '30px', filter: darkMode ? 'invert(1)' : 'none'}} />
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/settings"
            className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${location.pathname === '/settings' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
            aria-label="Settings"
          >
            <Cog6ToothIcon className="h-6 w-6" />
          </Link>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? (
              <SunIcon className="h-6 w-6" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}