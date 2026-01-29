import { useState, useEffect } from 'react';
import AlertForm from './components/Alertform';
import AlertList from './components/AlertList';
import Toast from './components/Toast';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [toast, setToast] = useState(null);
  
  // Dark Mode State
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );

  // Sync with <html> class for Tailwind v4
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleSuccess = (message = 'Alert created successfully!') => {
    setRefreshTrigger((prev) => prev + 1);
    setToast({ message, type: 'success' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-500">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 dark:bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <span className="text-xl font-black">P</span>
            </div>
            <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              The Flying Panda <span className="text-indigo-600 dark:text-indigo-400">Alerts</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            {/* Proper Slider Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                {isDark ? 'Dark' : 'Light'}
              </span>
              <button
                onClick={() => setIsDark(!isDark)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isDark ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    isDark ? 'translate-x-5' : 'translate-x-0'
                  } flex items-center justify-center`}
                >
                  {isDark ? (
                    <svg className="w-3 h-3 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                  ) : (
                    <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.457 4.907a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 011.414-1.414l.707.707zM10 18a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM3.707 5.293a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707A1 1 0 013.707 5.293zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm9-9a1 1 0 011 1v1a1 1 0 11-2 0V2a1 1 0 011-1zm3.707 11.293a1 1 0 11-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707z"/></svg>
                  )}
                </span>
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              LIVE
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Secure Your Slot</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl text-lg">
            Real-time visa tracking for the modern traveler.
          </p>
        </div>

        <div className="space-y-8">
          <AlertForm onSuccess={handleSuccess} />
          <AlertList 
            key={refreshTrigger} 
            onDeleteSuccess={() => handleSuccess('Alert deleted successfully')}
          />
        </div>
      </main>

      <footer className="py-12 text-center text-sm text-gray-400 dark:text-gray-600 font-medium">
        © {new Date().getFullYear()} The Flying Panda.
      </footer>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default App;
