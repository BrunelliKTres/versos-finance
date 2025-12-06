import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  priceRange: string;
  onPriceRangeChange: (value: string) => void;
  market: string;
  onMarketChange: (value: string) => void;
}

const SearchBar = ({
  searchTerm,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
  market,
  onMarketChange,
}: SearchBarProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar ações por nome, símbolo ou mercado..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-14 pl-12 pr-4 text-lg search-input rounded-xl"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={priceRange} onValueChange={onPriceRangeChange}>
          <SelectTrigger className="w-[180px] bg-secondary border-border">
            <SelectValue placeholder="Faixa de Preço" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os preços</SelectItem>
            <SelectItem value="0-10">$0 - $10</SelectItem>
            <SelectItem value="10-50">$10 - $50</SelectItem>
            <SelectItem value="50-100">$50 - $100</SelectItem>
            <SelectItem value="100-500">$100 - $500</SelectItem>
            <SelectItem value="500+">$500+</SelectItem>
          </SelectContent>
        </Select>

        <Select value={market} onValueChange={onMarketChange}>
          <SelectTrigger className="w-[180px] bg-secondary border-border">
            <SelectValue placeholder="Mercado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os mercados</SelectItem>
            <SelectItem value="usa">🇺🇸 Estados Unidos</SelectItem>
            <SelectItem value="brazil">🇧🇷 Brasil</SelectItem>
            <SelectItem value="europe">🇪🇺 Europa</SelectItem>
            <SelectItem value="asia">🌏 Ásia</SelectItem>
            <SelectItem value="uk">🇬🇧 Reino Unido</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Mais Filtros
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
