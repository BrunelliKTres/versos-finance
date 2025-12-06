import { useState, useMemo, useEffect } from "react";
import { Search, TrendingUp, Globe, DollarSign, RefreshCw, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import StockCard from "@/components/StockCard";
import Sidebar from "@/components/Sidebar";
import { useStocks, Stock } from "@/hooks/useStocks";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const filterStocks = (
  stockList: Stock[],
  searchTerm: string,
  priceRange: string,
  market: string
): Stock[] => {
  return stockList.filter((stock) => {
    const matchesSearch =
      searchTerm === "" ||
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.market.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesPrice = true;
    if (priceRange !== "all") {
      if (priceRange === "500+") {
        matchesPrice = stock.price >= 500;
      } else {
        const [min, max] = priceRange.split("-").map(parseFloat);
        matchesPrice = stock.price >= min && stock.price <= max;
      }
    }

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

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [market, setMarket] = useState("all");
  
  const { stocks, isLoading, error, lastUpdated, searchStocks, refetch } = useStocks();

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length >= 2) {
        searchStocks(searchTerm);
      } else if (searchTerm.length === 0) {
        refetch();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, searchStocks, refetch]);

  const filteredStocks = useMemo(() => {
    return filterStocks(stocks, "", priceRange, market);
  }, [stocks, priceRange, market]);

  const stats = useMemo(() => {
    const totalStocks = stocks.length;
    const gainers = stocks.filter((s) => s.change > 0).length;
    const losers = stocks.filter((s) => s.change < 0).length;
    return { totalStocks, gainers, losers };
  }, [stocks]);

  const handleRefresh = async () => {
    await refetch();
    toast.success("Dados atualizados!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Busque Ações do{" "}
              <span className="gradient-text">Mundo Inteiro</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Dados em tempo real da B3. Encontre as melhores oportunidades de investimento.
            </p>
            {lastUpdated && (
              <p className="text-sm text-muted-foreground mt-2">
                Última atualização: {lastUpdated.toLocaleTimeString('pt-BR')}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
            <div className="glass-card rounded-xl p-4 text-center">
              <Globe className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.totalStocks}</p>
              <p className="text-sm text-muted-foreground">Ações</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold stock-positive">{stats.gainers}</p>
              <p className="text-sm text-muted-foreground">Em Alta</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center">
              <DollarSign className="h-6 w-6 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold stock-negative">{stats.losers}</p>
              <p className="text-sm text-muted-foreground">Em Baixa</p>
            </div>
          </div>

          {/* Search */}
          <div className="max-w-4xl mx-auto">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              market={market}
              onMarketChange={setMarket}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Stock Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Resultados{" "}
                <span className="text-muted-foreground font-normal">
                  ({filteredStocks.length} ações)
                </span>
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                Atualizar
              </Button>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
                {error}
              </div>
            )}

            {isLoading && stocks.length === 0 ? (
              <div className="text-center py-16 glass-card rounded-xl">
                <Loader2 className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
                <h3 className="text-lg font-semibold mb-2">
                  Carregando dados...
                </h3>
                <p className="text-muted-foreground">
                  Buscando informações em tempo real da B3.
                </p>
              </div>
            ) : filteredStocks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredStocks.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 glass-card rounded-xl">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Nenhuma ação encontrada
                </h3>
                <p className="text-muted-foreground">
                  Tente ajustar os filtros ou buscar por outro termo.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2024 StockFinder. Dados fornecidos pela Brapi (B3).</p>
          <p className="mt-1">
            Este site é apenas para fins informativos e não constitui conselho de investimento.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
