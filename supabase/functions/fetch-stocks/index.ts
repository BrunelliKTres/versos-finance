import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Brapi API for Brazilian stocks (free, no API key required for basic data)
const BRAPI_BASE_URL = "https://brapi.dev/api";

interface StockData {
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

// Format volume number
function formatVolume(vol: number): string {
  if (vol >= 1_000_000_000) {
    return `${(vol / 1_000_000_000).toFixed(1)}B`;
  }
  if (vol >= 1_000_000) {
    return `${(vol / 1_000_000).toFixed(1)}M`;
  }
  if (vol >= 1_000) {
    return `${(vol / 1_000).toFixed(1)}K`;
  }
  return vol.toString();
}

// Fetch Brazilian stocks from Brapi
async function fetchBrazilianStocks(symbols: string[]): Promise<StockData[]> {
  try {
    const tickerList = symbols.join(',');
    const response = await fetch(`${BRAPI_BASE_URL}/quote/${tickerList}?fundamental=false`);
    
    if (!response.ok) {
      console.error(`Brapi API error: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    
    if (!data.results || !Array.isArray(data.results)) {
      console.error('Invalid Brapi response format');
      return [];
    }
    
    return data.results.map((stock: any) => ({
      symbol: stock.symbol,
      name: stock.longName || stock.shortName || stock.symbol,
      price: stock.regularMarketPrice || 0,
      change: stock.regularMarketChange || 0,
      changePercent: stock.regularMarketChangePercent || 0,
      market: "B3",
      marketFlag: "🇧🇷",
      volume: formatVolume(stock.regularMarketVolume || 0),
      sector: stock.sector || "Diversos"
    }));
  } catch (error) {
    console.error('Error fetching Brazilian stocks:', error);
    return [];
  }
}

// Fetch available Brazilian stocks list
async function fetchAvailableBrazilianStocks(): Promise<string[]> {
  try {
    const response = await fetch(`${BRAPI_BASE_URL}/available`);
    
    if (!response.ok) {
      console.error(`Brapi available API error: ${response.status}`);
      return [];
    }
    
    const data = await response.json();
    return data.stocks || [];
  } catch (error) {
    console.error('Error fetching available stocks:', error);
    return [];
  }
}

// Search for stocks
async function searchStocks(query: string): Promise<StockData[]> {
  try {
    // Get available stocks and filter by query
    const availableStocks = await fetchAvailableBrazilianStocks();
    const matchingSymbols = availableStocks
      .filter((symbol: string) => symbol.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 20);
    
    if (matchingSymbols.length === 0) {
      return [];
    }
    
    return await fetchBrazilianStocks(matchingSymbols);
  } catch (error) {
    console.error('Error searching stocks:', error);
    return [];
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, symbols, query } = await req.json();
    console.log(`Received request: action=${action}, symbols=${symbols}, query=${query}`);

    let stocks: StockData[] = [];

    switch (action) {
      case 'fetch':
        // Fetch specific symbols
        if (symbols && Array.isArray(symbols) && symbols.length > 0) {
          stocks = await fetchBrazilianStocks(symbols);
        }
        break;
      
      case 'search':
        // Search for stocks by query
        if (query && typeof query === 'string') {
          stocks = await searchStocks(query);
        }
        break;
      
      case 'popular':
        // Fetch popular Brazilian stocks
        const popularSymbols = [
          'PETR4', 'VALE3', 'ITUB4', 'BBDC4', 'WEGE3', 
          'ABEV3', 'B3SA3', 'RENT3', 'SUZB3', 'GGBR4',
          'RADL3', 'JBSS3', 'RAIL3', 'EQTL3', 'LREN3',
          'BBAS3', 'MGLU3', 'CSAN3', 'HAPV3', 'VIVT3'
        ];
        stocks = await fetchBrazilianStocks(popularSymbols);
        break;
      
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action. Use "fetch", "search", or "popular"' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    console.log(`Returning ${stocks.length} stocks`);
    
    return new Response(
      JSON.stringify({ stocks, timestamp: new Date().toISOString() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in fetch-stocks function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
