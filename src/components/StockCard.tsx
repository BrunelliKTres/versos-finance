import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  market: string;
  marketFlag: string;
  volume: string;
}

interface StockCardProps {
  stock: Stock;
}

const StockCard = ({ stock }: StockCardProps) => {
  const isPositive = stock.change > 0;
  const isNegative = stock.change < 0;
  const isNeutral = stock.change === 0;

  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

  return (
    <div className="stock-card group animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{stock.marketFlag}</span>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {stock.symbol}
            </h3>
            <p className="text-sm text-muted-foreground truncate max-w-[150px]">
              {stock.name}
            </p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
          {stock.market}
        </span>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold font-mono">
            ${stock.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Vol: {stock.volume}
          </p>
        </div>

        <div className="text-right">
          <div
            className={cn(
              "flex items-center gap-1 justify-end",
              isPositive && "stock-positive",
              isNegative && "stock-negative",
              isNeutral && "stock-neutral"
            )}
          >
            <TrendIcon className="h-4 w-4" />
            <span className="font-semibold font-mono">
              {isPositive && "+"}
              {stock.change.toFixed(2)}
            </span>
          </div>
          <span
            className={cn(
              "text-sm font-mono",
              isPositive && "stock-positive",
              isNegative && "stock-negative",
              isNeutral && "stock-neutral"
            )}
          >
            ({isPositive && "+"}
            {stock.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
