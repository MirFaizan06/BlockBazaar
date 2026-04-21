import { useState, useEffect, useCallback } from 'react';
import type { Mod } from '../types';
import { getAllMods, getModBySlug } from '../services/modService';
import { MOCK_MODS } from '../utils/mockData';

interface UseModsResult {
  mods: Mod[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useMods(): UseModsResult {
  const [mods, setMods] = useState<Mod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMods = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllMods();
      setMods(data.length > 0 ? data : MOCK_MODS);
    } catch {
      setMods(MOCK_MODS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMods();
  }, [fetchMods]);

  return { mods, loading, error, refetch: fetchMods };
}

interface UseModResult {
  mod: Mod | null;
  loading: boolean;
  error: string | null;
}

export function useMod(slug: string): UseModResult {
  const [mod, setMod] = useState<Mod | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMod() {
      setLoading(true);
      setError(null);
      try {
        const data = await getModBySlug(slug);
        if (data) {
          setMod(data);
        } else {
          const mockMod = MOCK_MODS.find(m => m.slug === slug) ?? null;
          setMod(mockMod);
          if (!mockMod) setError('Mod not found');
        }
      } catch {
        const mockMod = MOCK_MODS.find(m => m.slug === slug) ?? null;
        setMod(mockMod);
        if (!mockMod) setError('Mod not found');
      } finally {
        setLoading(false);
      }
    }
    fetchMod();
  }, [slug]);

  return { mod, loading, error };
}
