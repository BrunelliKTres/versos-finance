import { Star, Bell, BarChart3 } from "lucide-react";
import IndexCard from "./IndexCard";

const indices = [
  { symbol: "S&P 500", name: "Estados Unidos", value: 6070.40, change: 13.28, changePercent: 0.22 },
  { symbol: "NASDAQ", name: "Estados Unidos", value: 21536.90, change: 98.65, changePercent: 0.46 },
  { symbol: "DOW JONES", name: "Estados Unidos", value: 44860.31, change: -123.19, changePercent: -0.27 },
  { symbol: "IBOVESPA", name: "Brasil", value: 125842.00, change: 1253.45, changePercent: 1.01 },
  { symbol: "DAX", name: "Alemanha", value: 20344.25, change: 156.32, changePercent: 0.77 },
  { symbol: "FTSE 100", name: "Reino Unido", value: 8335.67, change: -45.23, changePercent: -0.54 },
  { symbol: "NIKKEI 225", name: "Japão", value: 39457.85, change: 234.56, changePercent: 0.60 },
];

const Sidebar = () => {
  return (
    <aside className="w-full lg:w-80 space-y-6">
      {/* Quick Actions */}
      <div className="glass-card rounded-xl p-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center gap-2 p-4 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
            <Star className="h-5 w-5 text-warning" />
            <span className="text-sm">Favoritos</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
            <Bell className="h-5 w-5 text-primary" />
            <span className="text-sm">Alertas</span>
          </button>
        </div>
      </div>

      {/* Market Indices */}
      <div className="glass-card rounded-xl p-4">
        <h3 className="font-semibold mb-4">Índices Globais</h3>
        <div className="space-y-1">
          {indices.map((index) => (
            <IndexCard key={index.symbol} index={index} />
          ))}
        </div>
      </div>

      {/* Market Status */}
      <div className="glass-card rounded-xl p-4">
        <h3 className="font-semibold mb-4">Status dos Mercados</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">🇺🇸 NYSE</span>
            <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">Aberto</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">🇧🇷 B3</span>
            <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">Aberto</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">🇯🇵 TSE</span>
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">Fechado</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">🇬🇧 LSE</span>
            <span className="text-xs bg-success/20 text-success px-2 py-1 rounded-full">Aberto</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
