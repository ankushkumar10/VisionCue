import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ScriptProvider } from './contexts/ScriptContext';
import { SettingsProvider } from './contexts/SettingsContext';
import Layout from './components/layout/Layout';
import EditorPage from './pages/EditorPage';
import PrompterPage from './pages/PrompterPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter basename="/VisionCue">
      <ThemeProvider>
        <SettingsProvider>
          <ScriptProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<EditorPage />} />
                <Route path="/prompter" element={<PrompterPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </ScriptProvider>
        </SettingsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
