import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  market: string;
  marketFlag: string;
  volume: string;
  sector: string;
}

interface UseStocksReturn {
  stocks: Stock[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  fetchPopularStocks: () => Promise<void>;
  searchStocks: (query: string) => Promise<void>;
  fetchStocksBySymbols: (symbols: string[]) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useStocks(): UseStocksReturn {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPopularStocks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke('fetch-stocks', {
        body: { action: 'popular' }
      });
      
      if (fnError) {
        throw new Error(fnError.message);
      }
      
      if (data?.stocks) {
        setStocks(data.stocks);
        setLastUpdated(new Date(data.timestamp));
      }
    } catch (err) {
      console.error('Error fetching popular stocks:', err);
      setError(err instanceof Error ? err.message : 'Erro ao buscar ações');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchStocks = useCallback(async (query: string) => {
    if (!query.trim()) {
      await fetchPopularStocks();
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke('fetch-stocks', {
        body: { action: 'search', query }
      });
      
      if (fnError) {
        throw new Error(fnError.message);
      }
      
      if (data?.stocks) {
        setStocks(data.stocks);
        setLastUpdated(new Date(data.timestamp));
      }
    } catch (err) {
      console.error('Error searching stocks:', err);
      setError(err instanceof Error ? err.message : 'Erro ao buscar ações');
    } finally {
      setIsLoading(false);
    }
  }, [fetchPopularStocks]);

  const fetchStocksBySymbols = useCallback(async (symbols: string[]) => {
    if (symbols.length === 0) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke('fetch-stocks', {
        body: { action: 'fetch', symbols }
      });
      
      if (fnError) {
        throw new Error(fnError.message);
      }
      
      if (data?.stocks) {
        setStocks(data.stocks);
        setLastUpdated(new Date(data.timestamp));
      }
    } catch (err) {
      console.error('Error fetching stocks by symbols:', err);
      setError(err instanceof Error ? err.message : 'Erro ao buscar ações');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await fetchPopularStocks();
  }, [fetchPopularStocks]);

  // Fetch popular stocks on mount
  useEffect(() => {
    fetchPopularStocks();
  }, [fetchPopularStocks]);

  return {
    stocks,
    isLoading,
    error,
    lastUpdated,
    fetchPopularStocks,
    searchStocks,
    fetchStocksBySymbols,
    refetch
  };
}
