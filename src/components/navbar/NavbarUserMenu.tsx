
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Globe, LogIn, Menu, User } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "@/hooks/useAuth";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarUserMenuProps {
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavbarUserMenu: React.FC<NavbarUserMenuProps> = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen 
}) => {
  const { user } = useAuth();
  const { settings } = useSiteSettings();
  const [userAvatar, setUserAvatar] = useState<string | undefined>(user?.avatar);
  
  // Charger l'avatar depuis le localStorage
  useEffect(() => {
    const storedAvatar = localStorage.getItem('userAvatar');
    if (storedAvatar) {
      setUserAvatar(storedAvatar);
    } else if (user?.avatar) {
      setUserAvatar(user.avatar);
    }
  }, [user]);
  
  return (
    <div className="flex items-center gap-4">
      {/* Bouton de langue */}
      <button className="hidden md:flex items-center gap-1 text-sm hover:text-sholom-primary transition-colors">
        <Globe className="h-4 w-4" />
        <span>{settings.language === 'fr' ? 'FR' : 'EN'}</span>
      </button>

      {/* Menu utilisateur */}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center border border-gray-200 rounded-full px-3 py-1.5 gap-2 bg-white hover:shadow-md cursor-pointer relative"
            >
              <Menu className="h-4 w-4" />
              <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 overflow-hidden border border-gray-200">
                {userAvatar ? (
                  <img 
                    src={userAvatar} 
                    alt={user.name}
                    className="h-full w-full object-cover" 
                    onError={(e) => {
                      // Si l'image échoue à charger, afficher un fallback
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
                    }}
                  />
                ) : (
                  <User className="h-5 w-5 text-gray-500" />
                )}
              </div>
              <div className="h-2 w-2 absolute top-1 right-2 rounded-full bg-red-500"></div>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white shadow-md z-50">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/profile" className="w-full">Profil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/favorites" className="w-full">Favoris</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/reservations" className="w-full">Réservations</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/messages" className="w-full">Messages</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/notifications" className="w-full">Notifications</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/logout" className="w-full text-red-500">Se déconnecter</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-sholom-primary text-white rounded-full px-4 py-2 gap-2 shadow-sm hover:bg-sholom-primary/90"
          >
            <LogIn className="h-4 w-4" />
            <span className="font-medium">Connexion</span>
          </motion.div>
        </Link>
      )}
    </div>
  );
};
