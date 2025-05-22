import { useState } from "react";
import { Search, User, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";

const Header = ({ onSearch }: { onSearch?: (query: string) => void }) => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useCart();
  const navigate = useNavigate();

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">
              Uni<span className="text-amber-500">market</span>
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-xl relative">
            <form onSubmit={handleSearch} className="w-full">
              <Input
                type="text"
                placeholder="O que você está procurando?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 focus-visible:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Perfil</span>
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Carrinho</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>

        {isMobile && (
          <form onSubmit={handleSearch} className="mt-2 relative">
            <Input
              type="text"
              placeholder="O que você está procurando?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>
        )}
      </div>
    </header>
  );
};

export default Header;
