import { TrendingUp, Menu } from "lucide-react";
import { Button } from "./ui/button";
const Header = () => {
  const navItems = ["Mercados", "Ações", "Índices", "Criptomoedas", "Commodities", "ETFs"];
  return <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Versos Finance<span className="text-primary">Finder</span>
            </span>
          </a>
          
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => <a key={item} href="#" className="nav-link text-sm font-medium">
                {item}
              </a>)}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            Entrar
          </Button>
          <Button size="sm">
            Criar Conta
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>;
};
export default Header;