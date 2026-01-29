import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'success', duration = 3000, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entry animation on mount
    const entryTimer = setTimeout(() => setVisible(true), 10);
    
    // Start exit sequence
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500); // Allow time for transition
    }, duration);

    return () => {
      clearTimeout(entryTimer);
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  // Styling based on type
  const styles = {
    success: 'bg-emerald-600 shadow-emerald-200/50',
    error: 'bg-rose-600 shadow-rose-200/50',
    warning: 'bg-amber-500 shadow-amber-200/50'
  };

  const icons = {
    success: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  };

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl text-white font-medium shadow-2xl transition-all duration-500 ease-out transform ${
        styles[type] || styles.success
      } ${
        visible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-12 opacity-0 scale-95'
      }`}
    >
      <div className="shrink-0 bg-white/20 p-1 rounded-lg">
        {icons[type] || icons.success}
      </div>
      
      <span className="text-sm tracking-wide">{message}</span>
      
      <button 
        onClick={() => setVisible(false)}
        className="ml-2 p-1 hover:bg-white/10 rounded-md transition-colors"
      >
        <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
