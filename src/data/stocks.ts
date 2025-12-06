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

export const stocks: Stock[] = [
  // USA Stocks
  { symbol: "AAPL", name: "Apple Inc.", price: 193.42, change: 2.15, changePercent: 1.12, market: "NASDAQ", marketFlag: "🇺🇸", volume: "52.3M", sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft Corporation", price: 378.91, change: -1.23, changePercent: -0.32, market: "NASDAQ", marketFlag: "🇺🇸", volume: "23.1M", sector: "Technology" },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 175.23, change: 3.45, changePercent: 2.01, market: "NASDAQ", marketFlag: "🇺🇸", volume: "28.4M", sector: "Technology" },
  { symbol: "AMZN", name: "Amazon.com Inc.", price: 185.67, change: 1.89, changePercent: 1.03, market: "NASDAQ", marketFlag: "🇺🇸", volume: "45.6M", sector: "Consumer" },
  { symbol: "NVDA", name: "NVIDIA Corporation", price: 142.08, change: 5.67, changePercent: 4.16, market: "NASDAQ", marketFlag: "🇺🇸", volume: "312.5M", sector: "Technology" },
  { symbol: "TSLA", name: "Tesla Inc.", price: 352.56, change: -8.34, changePercent: -2.31, market: "NASDAQ", marketFlag: "🇺🇸", volume: "98.7M", sector: "Automotive" },
  { symbol: "META", name: "Meta Platforms Inc.", price: 614.21, change: 12.45, changePercent: 2.07, market: "NASDAQ", marketFlag: "🇺🇸", volume: "15.8M", sector: "Technology" },
  { symbol: "BRK.B", name: "Berkshire Hathaway", price: 456.78, change: 0.45, changePercent: 0.10, market: "NYSE", marketFlag: "🇺🇸", volume: "3.2M", sector: "Financial" },
  { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 245.32, change: 1.23, changePercent: 0.50, market: "NYSE", marketFlag: "🇺🇸", volume: "8.9M", sector: "Financial" },
  { symbol: "V", name: "Visa Inc.", price: 298.45, change: -0.87, changePercent: -0.29, market: "NYSE", marketFlag: "🇺🇸", volume: "6.4M", sector: "Financial" },
  
  // Brazilian Stocks
  { symbol: "PETR4", name: "Petrobras PN", price: 37.85, change: 0.92, changePercent: 2.49, market: "B3", marketFlag: "🇧🇷", volume: "125.3M", sector: "Energy" },
  { symbol: "VALE3", name: "Vale S.A.", price: 58.42, change: -1.34, changePercent: -2.24, market: "B3", marketFlag: "🇧🇷", volume: "45.6M", sector: "Mining" },
  { symbol: "ITUB4", name: "Itaú Unibanco", price: 32.15, change: 0.45, changePercent: 1.42, market: "B3", marketFlag: "🇧🇷", volume: "32.1M", sector: "Financial" },
  { symbol: "BBDC4", name: "Bradesco PN", price: 12.87, change: -0.23, changePercent: -1.76, market: "B3", marketFlag: "🇧🇷", volume: "28.9M", sector: "Financial" },
  { symbol: "WEGE3", name: "WEG S.A.", price: 52.34, change: 1.56, changePercent: 3.07, market: "B3", marketFlag: "🇧🇷", volume: "8.7M", sector: "Industrial" },
  { symbol: "ABEV3", name: "Ambev S.A.", price: 11.23, change: 0.12, changePercent: 1.08, market: "B3", marketFlag: "🇧🇷", volume: "18.4M", sector: "Consumer" },
  
  // European Stocks
  { symbol: "SAP", name: "SAP SE", price: 234.56, change: 3.21, changePercent: 1.39, market: "XETRA", marketFlag: "🇩🇪", volume: "2.1M", sector: "Technology" },
  { symbol: "ASML", name: "ASML Holding", price: 745.32, change: 15.67, changePercent: 2.15, market: "AMS", marketFlag: "🇳🇱", volume: "1.8M", sector: "Technology" },
  { symbol: "NVO", name: "Novo Nordisk", price: 98.45, change: -2.34, changePercent: -2.32, market: "CPH", marketFlag: "🇩🇰", volume: "4.5M", sector: "Healthcare" },
  { symbol: "LVMH", name: "LVMH Moët Hennessy", price: 712.34, change: 8.90, changePercent: 1.27, market: "EPA", marketFlag: "🇫🇷", volume: "1.2M", sector: "Consumer" },
  { symbol: "NESN", name: "Nestlé S.A.", price: 85.67, change: -0.45, changePercent: -0.52, market: "SWX", marketFlag: "🇨🇭", volume: "3.4M", sector: "Consumer" },
  
  // UK Stocks
  { symbol: "SHEL", name: "Shell plc", price: 32.45, change: 0.67, changePercent: 2.11, market: "LSE", marketFlag: "🇬🇧", volume: "12.3M", sector: "Energy" },
  { symbol: "AZN", name: "AstraZeneca PLC", price: 118.90, change: 2.34, changePercent: 2.01, market: "LSE", marketFlag: "🇬🇧", volume: "5.6M", sector: "Healthcare" },
  { symbol: "HSBA", name: "HSBC Holdings", price: 7.85, change: -0.12, changePercent: -1.51, market: "LSE", marketFlag: "🇬🇧", volume: "45.2M", sector: "Financial" },
  { symbol: "BP", name: "BP plc", price: 4.92, change: 0.08, changePercent: 1.65, market: "LSE", marketFlag: "🇬🇧", volume: "32.1M", sector: "Energy" },
  
  // Asian Stocks
  { symbol: "9988", name: "Alibaba Group", price: 85.34, change: 2.45, changePercent: 2.96, market: "HKEX", marketFlag: "🇭🇰", volume: "23.4M", sector: "Technology" },
  { symbol: "7203", name: "Toyota Motor Corp", price: 2456.00, change: 34.00, changePercent: 1.40, market: "TSE", marketFlag: "🇯🇵", volume: "8.9M", sector: "Automotive" },
  { symbol: "005930", name: "Samsung Electronics", price: 71500.00, change: 1200.00, changePercent: 1.71, market: "KRX", marketFlag: "🇰🇷", volume: "12.3M", sector: "Technology" },
  { symbol: "RELIANCE", name: "Reliance Industries", price: 2876.45, change: -23.45, changePercent: -0.81, market: "NSE", marketFlag: "🇮🇳", volume: "15.6M", sector: "Energy" },
  { symbol: "TCS", name: "Tata Consultancy", price: 4123.50, change: 45.30, changePercent: 1.11, market: "NSE", marketFlag: "🇮🇳", volume: "3.2M", sector: "Technology" },
];

export const filterStocks = (
  stockList: Stock[],
  searchTerm: string,
  priceRange: string,
  market: string
): Stock[] => {
  return stockList.filter((stock) => {
    // Search filter
    const matchesSearch =
      searchTerm === "" ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.market.toLowerCase().includes(searchTerm.toLowerCase());

    // Price range filter
    let matchesPrice = true;
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map((v) => {
        if (v === "500+") return [500, Infinity];
        return parseFloat(v);
      });
      if (priceRange === "500+") {
        matchesPrice = stock.price >= 500;
      } else {
        matchesPrice = stock.price >= (min as number) && stock.price <= (max as number);
      }
    }

    // Market filter
    let matchesMarket = true;
    if (market !== "all") {
      const marketMappings: Record<string, string[]> = {
        usa: ["NASDAQ", "NYSE"],
        brazil: ["B3"],
        europe: ["XETRA", "AMS", "CPH", "EPA", "SWX"],
        asia: ["HKEX", "TSE", "KRX", "NSE"],
        uk: ["LSE"],
      };
      matchesMarket = marketMappings[market]?.includes(stock.market) ?? false;
    }

    return matchesSearch && matchesPrice && matchesMarket;
  });
};
