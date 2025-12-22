import { useState, useEffect } from 'react';
import { account, tablesDB } from '@/lib/appwrite';
import { Query } from 'appwrite';
import { toast } from 'sonner';

const CACHE_KEY = 'password_vault_cache';
const CACHE_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Custom hook for managing password data with caching
 * @param {Object} options - Configuration options
 * @param {boolean} options.lightweight - Fetch lightweight data (without password values) for Dashboard
 * @param {boolean} options.autoFetch - Automatically fetch data on mount
 * @returns {Object} - { passwords, loading, error, refetch }
 */
export function usePasswordData({ lightweight = false, autoFetch = true } = {}) {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const tableId = import.meta.env.VITE_APPWRITE_PASSOWORD_TABLE_ID;

  // Get cached data
  const getCachedData = () => {
    try {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > CACHE_EXPIRY_MS;

      if (isExpired) {
        sessionStorage.removeItem(CACHE_KEY);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error reading cache:', err);
      return null;
    }
  };

  // Set cached data
  const setCachedData = (data) => {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error('Error setting cache:', err);
    }
  };

  // Clear cache
  const clearCache = () => {
    try {
      sessionStorage.removeItem(CACHE_KEY);
    } catch (err) {
      console.error('Error clearing cache:', err);
    }
  };

  // Fetch passwords
  const fetchPasswords = async (userId, useCache = true) => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      if (useCache) {
        const cached = getCachedData();
        if (cached && cached.userId === userId) {
          setPasswords(cached.passwords);
          setLoading(false);
          return cached.passwords;
        }
      }

      // Fetch from Appwrite
      const response = await tablesDB.listRows({
        databaseId,
        tableId,
        queries: [
          Query.equal('userId', [userId]),
          Query.orderDesc('$createdAt')
        ]
      });

      let passwordData = response.rows || [];

      // If lightweight mode, remove password values for security
      if (lightweight) {
        passwordData = passwordData.map(item => ({
          ...item,
          password: undefined // Remove password value from memory
        }));
      }

      // Cache the data
      setCachedData({
        passwords: passwordData,
        userId
      });

      setPasswords(passwordData);
      setLoading(false);
      return passwordData;
    } catch (err) {
      console.error('Error fetching passwords:', err);
      setError(err.message || 'Failed to fetch passwords');
      toast.error(err.message || 'Failed to fetch passwords');
      setLoading(false);
      return [];
    }
  };

  // Refetch data (bypass cache)
  const refetch = async () => {
    if (!user) {
      try {
        const userData = await account.get();
        setUser(userData);
        return await fetchPasswords(userData.$id, false);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Authentication required');
        setLoading(false);
        return [];
      }
    }
    return await fetchPasswords(user.$id, false);
  };

  // Initial fetch
  useEffect(() => {
    if (!autoFetch) {
      setLoading(false);
      return;
    }

    const initFetch = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
        await fetchPasswords(userData.$id);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Authentication required');
        setLoading(false);
      }
    };

    initFetch();
  }, [autoFetch]);

  // Clear cache on unmount (optional - for extra security)
  useEffect(() => {
    return () => {
      // Only clear if lightweight mode (Dashboard)
      if (lightweight) {
        clearCache();
      }
    };
  }, [lightweight]);

  return {
    passwords,
    loading,
    error,
    refetch,
    clearCache
  };
}
