import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Index {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

interface IndexCardProps {
  index: Index;
}

const IndexCard = ({ index }: IndexCardProps) => {
  const isPositive = index.change >= 0;

  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-secondary/50 rounded-lg transition-colors cursor-pointer">
      <div>
        <p className="font-medium text-foreground">{index.symbol}</p>
        <p className="text-xs text-muted-foreground">{index.name}</p>
      </div>
      <div className="text-right">
        <p className="font-mono font-medium">
          {index.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
        <div
          className={cn(
            "flex items-center gap-1 justify-end text-sm font-mono",
            isPositive ? "stock-positive" : "stock-negative"
          )}
        >
          {isPositive ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span>
            {isPositive && "+"}
            {index.changePercent.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default IndexCard;
