import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Home, Compass, Crown, Users, Menu, Star, Zap, Search, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ModernNavigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    {
      title: "Inicio",
      href: "/",
      icon: <Home className="h-4 w-4" />,
      description: "Página principal con apps destacadas"
    },
    {
      title: "Descubrir",
      href: "/discover",
      icon: <Compass className="h-4 w-4" />,
      description: "Explora todas las categorías"
    },
    {
      title: "Premium",
      href: "/premium",
      icon: <Crown className="h-4 w-4" />,
      description: "Funciones exclusivas y apps premium",
      badge: "Pro"
    },
    {
      title: "Comunidad",
      href: "/community",
      icon: <Users className="h-4 w-4" />,
      description: "Conecta con otros usuarios"
    }
  ];

  const categories = [
    { name: "Juegos", href: "/category/games", icon: "🎮" },
    { name: "Social", href: "/category/social", icon: "💬" },
    { name: "Productividad", href: "/category/productivity", icon: "📊" },
    { name: "Media", href: "/category/media", icon: "🎵" },
    { name: "Herramientas", href: "/category/tools", icon: "🛠️" }
  ];

  const isActivePath = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-black/80 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/10" 
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    THE STYLE OF NEXUS
                  </h1>
                  <p className="text-xs text-gray-400 -mt-1">Premium Mod Apps</p>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="space-x-2">
                {navigationItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link href={item.href}>
                      <NavigationMenuLink
                        className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-purple-600/20 hover:text-purple-300 focus:bg-purple-600/20 focus:text-purple-300 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
                          isActivePath(item.href)
                            ? "bg-purple-600/30 text-purple-300"
                            : "text-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}

                {/* Categories Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-300 hover:text-purple-300">
                    Categorías
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                      {categories.map((category) => (
                        <Link key={category.href} href={category.href}>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-purple-600/20 hover:text-purple-300 focus:bg-purple-600/20 focus:text-purple-300">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{category.icon}</span>
                              <div>
                                <div className="text-sm font-medium leading-none text-white">
                                  {category.name}
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-gray-400">
                                  Apps de {category.name.toLowerCase()}
                                </p>
                              </div>
                            </div>
                          </NavigationMenuLink>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-purple-300">
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Premium
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-gray-300">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-black/95 border-purple-500/30">
                <SheetHeader>
                  <SheetTitle className="text-left text-white">Menú</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {navigationItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        isActivePath(item.href)
                          ? "bg-purple-600/30 text-purple-300"
                          : "text-gray-300 hover:bg-purple-600/20 hover:text-purple-300"
                      }`}>
                        {item.icon}
                        <span className="font-medium">{item.title}</span>
                        {item.badge && (
                          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs ml-auto">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  ))}
                  
                  <div className="border-t border-purple-500/20 pt-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-3">Categorías</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <Link key={category.href} href={category.href} onClick={() => setIsMobileMenuOpen(false)}>
                          <div className="flex items-center gap-3 p-2 rounded-lg text-gray-300 hover:bg-purple-600/20 hover:text-purple-300 transition-colors">
                            <span>{category.icon}</span>
                            <span className="text-sm">{category.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>

      {/* Spacer to prevent content from being hidden under fixed header */}
      <div className="h-16" />
    </>
  );
}