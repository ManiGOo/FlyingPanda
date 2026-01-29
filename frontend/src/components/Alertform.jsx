import { useState, useEffect } from 'react';
import { createAlert } from '../api';
import { Country, City } from 'country-state-city';

export default function AlertForm({ onSuccess }) {
  const [form, setForm] = useState({
    country: '',
    countryCode: '', // Required to fetch specific cities
    city: '',
    visaType: 'Tourist',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [availableCities, setAvailableCities] = useState([]);

  // Load cities whenever the country changes
  useEffect(() => {
    if (form.countryCode) {
      const cities = City.getCitiesOfCountry(form.countryCode);
      setAvailableCities(cities);
    } else {
      setAvailableCities([]);
    }
  }, [form.countryCode]);

  const handleCountryChange = (e) => {
    const code = e.target.value;
    const name = e.target.options[e.target.selectedIndex].text;
    setForm({ ...form, country: name, countryCode: code, city: '' });
  };

  const handleCityChange = (e) => {
    setForm({ ...form, city: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Send only what your backend expects (usually country name and city name)
      const payload = { 
        country: form.country, 
        city: form.city, 
        visaType: form.visaType 
      };
      await createAlert(payload);
      onSuccess();
      setForm({ country: '', countryCode: '', city: '', visaType: 'Tourist' });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create alert');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 mb-10 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
          <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Alert</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Panda will watch for slots in your chosen city.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-end gap-5">
        {/* Country Selector */}
        <div className="w-full space-y-1.5">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase ml-1 tracking-wider text-[10px]">Country</label>
          <select
            value={form.countryCode}
            onChange={handleCountryChange}
            required
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none cursor-pointer"
          >
            <option value="" disabled>Select Country</option>
            {Country.getAllCountries().map((c) => (
              <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* City Selector (Filtered by Country) */}
        <div className="w-full space-y-1.5">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase ml-1 tracking-wider text-[10px]">City</label>
          <select
            name="city"
            value={form.city}
            onChange={handleCityChange}
            required
            disabled={!form.countryCode}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none cursor-pointer disabled:opacity-40"
          >
            <option value="" disabled>
              {form.countryCode ? 'Select City' : 'Choose Country First'}
            </option>
            {availableCities.map((city) => (
              <option key={`${city.name}-${city.latitude}`} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Visa Type */}
        <div className="w-full space-y-1.5">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase ml-1 tracking-wider text-[10px]">Visa Type</label>
          <select
            name="visaType"
            value={form.visaType}
            onChange={(e) => setForm({...form, visaType: e.target.value})}
            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 outline-none cursor-pointer"
          >
            <option value="Tourist">Tourist</option>
            <option value="Business">Business</option>
            <option value="Student">Student</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-8 py-2.5 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 active:scale-95 disabled:bg-indigo-300 dark:disabled:bg-indigo-900/50 transition-all shadow-lg shadow-indigo-200 dark:shadow-none shrink-0"
        >
          {loading ? 'Creating...' : 'Add Alert'}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg text-red-600 dark:text-red-400 text-xs">
          {error}
        </div>
      )}
    </div>
  );
}
