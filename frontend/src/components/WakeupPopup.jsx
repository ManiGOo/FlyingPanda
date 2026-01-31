import { useState, useEffect } from "react";

const WakeupPopup = ({ isDark }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const triggerPopup = () => {
      // Prevent multiple timers if multiple requests fail
      if (isVisible) return;

      setIsVisible(true);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.reload();
          }
          return prev - 1;
        });
      }, 1000);
    };

    // Listen for the custom event dispatched by Axios interceptor
    window.addEventListener('server-cold-start', triggerPopup);

    // Optional: Keep a silent "pre-warm" fetch that doesn't trigger the UI
    // This starts the Render spin-up as soon as the component mounts
    fetch(`${import.meta.env.VITE_API_URL}/api/health`).catch(() => {
      /* Silent catch: Axios will handle the visible error */
    });

    return () => window.removeEventListener('server-cold-start', triggerPopup);
  }, [isVisible]);


  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-right-10 duration-500">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-2xl max-w-sm flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h4 className="font-bold text-gray-900 dark:text-white">Server Waking Up</h4>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          Render's free tier is spinning up. Please wait while we connect to the visa database.
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Refreshing in {countdown}s
          </span>
          <div className="flex-1 ml-4 h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-1000 ease-linear"
              style={{ width: `${(countdown / 30) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WakeupPopup;