import { useState, useMemo } from "react";
import { Search, TrendingUp, Globe, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import StockCard from "@/components/StockCard";
import Sidebar from "@/components/Sidebar";
import { stocks, filterStocks } from "@/data/stocks";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [market, setMarket] = useState("all");

  const filteredStocks = useMemo(() => {
    return filterStocks(stocks, searchTerm, priceRange, market);
  }, [searchTerm, priceRange, market]);

  const stats = useMemo(() => {
    const totalStocks = stocks.length;
    const gainers = stocks.filter((s) => s.change > 0).length;
    const losers = stocks.filter((s) => s.change < 0).length;
    return { totalStocks, gainers, losers };
  }, []);

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
              Encontre as melhores oportunidades de investimento por preço.
              Acesse dados de mercados globais em tempo real.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
            <div className="glass-card rounded-xl p-4 text-center">
              <Globe className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.totalStocks}</p>
              <p className="text-sm text-muted-foreground">Ações Globais</p>
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
            </div>

            {filteredStocks.length > 0 ? (
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
          <p>© 2024 StockFinder. Dados com atraso de 15 minutos.</p>
          <p className="mt-1">
            Este site é apenas para fins informativos e não constitui conselho de investimento.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
