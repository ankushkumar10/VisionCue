import { createContext, useContext } from 'react';
import useLocalStorageState from 'use-local-storage-state';

const ScriptContext = createContext();

export function ScriptProvider({ children }) {
  const [scripts, setScripts] = useLocalStorageState('scripts', {
    defaultValue: []
  });
  
  const [currentScriptId, setCurrentScriptId] = useLocalStorageState('currentScriptId', {
    defaultValue: null
  });
  
  const [currentScript, setCurrentScript] = useLocalStorageState('currentScript', {
    defaultValue: { 
      id: 'default',
      title: 'Untitled Script', 
      content: 'Welcome to the teleprompter app. Enter your script here to get started.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  });

  const saveScript = (script) => {
    const updatedScript = {
      ...script,
      updatedAt: new Date().toISOString()
    };
    
    if (!script.id) {
      // New script
      const newScript = {
        ...updatedScript,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      setScripts([...scripts, newScript]);
      setCurrentScript(newScript);
      setCurrentScriptId(newScript.id);
      return newScript;
    } else {
      // Update existing script
      const updatedScripts = scripts.map(s => 
        s.id === script.id ? updatedScript : s
      );
      setScripts(updatedScripts);
      setCurrentScript(updatedScript);
      return updatedScript;
    }
  };

  const loadScript = (scriptId) => {
    const script = scripts.find(s => s.id === scriptId) || currentScript;
    setCurrentScript(script);
    setCurrentScriptId(script.id);
    return script;
  };

  const createNewScript = () => {
    const newScript = { 
      id: Date.now().toString(),
      title: 'Untitled Script', 
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setScripts([...scripts, newScript]);
    setCurrentScript(newScript);
    setCurrentScriptId(newScript.id);
    return newScript;
  };

  const deleteScript = (scriptId) => {
    const updatedScripts = scripts.filter(s => s.id !== scriptId);
    setScripts(updatedScripts);
    
    if (currentScriptId === scriptId) {
      if (updatedScripts.length > 0) {
        setCurrentScript(updatedScripts[0]);
        setCurrentScriptId(updatedScripts[0].id);
      } else {
        createNewScript();
      }
    }
  };

  return (
    <ScriptContext.Provider value={{
      currentScript,
      scripts,
      saveScript,
      loadScript,
      createNewScript,
      deleteScript
    }}>
      {children}
    </ScriptContext.Provider>
  );
}

export function useScript() {
  return useContext(ScriptContext);
}