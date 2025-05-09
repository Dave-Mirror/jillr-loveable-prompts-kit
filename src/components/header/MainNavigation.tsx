
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from '../ui/button';
import { 
  Camera, VideoIcon, Gift, PanelRight, Users, 
  Trophy, Map, Wallet, PlusCircle, Flag, ShoppingBag
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Custom NavigationMenuLink component that conditionally renders either a NextLink or a button
const NavLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof NavigationMenuLink> & { href: string; onClick?: () => void }
>(({ className, href, onClick, children, ...props }, ref) => {
  return (
    <RouterLink to={href}>
      <NavigationMenuLink
        className={cn(navigationMenuTriggerStyle(), className)}
        {...props}
        ref={ref}
        onClick={onClick}
      >
        {children}
      </NavigationMenuLink>
    </RouterLink>
  );
});
NavLink.displayName = "NavLink";

const MainNavigation: React.FC = () => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return null; // We use bottom navigation on mobile
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Challenges Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-jillr-darkAccent/50">Challenges</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li>
                <NavLink
                  href="/explore"
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-jillr-dark/50 to-jillr-neonPurple/20 p-6 no-underline outline-none focus:shadow-md"
                >
                  <VideoIcon className="h-6 w-6 text-jillr-neonPurple" />
                  <div className="mb-2 mt-4 text-lg font-medium text-white">
                    Alle Challenges
                  </div>
                  <p className="text-sm leading-tight text-white/70">
                    Entdecke alle verfügbaren Challenges und Filter nach deinen Interessen.
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/challenge-feed"
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-jillr-dark/50 to-jillr-neonPink/20 p-6 no-underline outline-none focus:shadow-md"
                >
                  <Flag className="h-6 w-6 text-jillr-neonPink" />
                  <div className="mb-2 mt-4 text-lg font-medium text-white">
                    Challenge Feed
                  </div>
                  <p className="text-sm leading-tight text-white/70">
                    Entdecke User-Content und nimm an beliebten Challenges teil.
                  </p>
                </NavLink>
              </li>
              <li className="col-span-2">
                <NavLink
                  href="/dashboard"
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-jillr-dark/50 to-jillr-neonGreen/20 p-6 no-underline outline-none focus:shadow-md"
                >
                  <PanelRight className="h-6 w-6 text-jillr-neonGreen" />
                  <div className="mb-2 mt-4 text-lg font-medium text-white">
                    Dashboard
                  </div>
                  <p className="text-sm leading-tight text-white/70">
                    Dein persönliches Dashboard mit deinen aktiven Challenges und Fortschritt.
                  </p>
                </NavLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        {/* Community Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-jillr-darkAccent/50">Community</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li>
                <NavLink
                  href="/leaderboard"
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-jillr-dark/50 to-jillr-neonPurple/20 p-6 no-underline outline-none focus:shadow-md"
                >
                  <Trophy className="h-6 w-6 text-jillr-neonPurple" />
                  <div className="mb-2 mt-4 text-lg font-medium text-white">
                    Leaderboard
                  </div>
                  <p className="text-sm leading-tight text-white/70">
                    Sieh die Top-Performer und deinen Rang in der Community.
                  </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/creator-marketplace"
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-jillr-dark/50 to-jillr-neonPink/20 p-6 no-underline outline-none focus:shadow-md"
                >
                  <Users className="h-6 w-6 text-jillr-neonPink" />
                  <div className="mb-2 mt-4 text-lg font-medium text-white">
                    Creator Marketplace
                  </div>
                  <p className="text-sm leading-tight text-white/70">
                    Entdecke talentierte Creator und vernetze dich.
                  </p>
                </NavLink>
              </li>
              <li className="col-span-2">
                <NavLink
                  href="/livemap"
                  className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-jillr-dark/50 to-jillr-neonGreen/20 p-6 no-underline outline-none focus:shadow-md"
                >
                  <Map className="h-6 w-6 text-jillr-neonGreen" />
                  <div className="mb-2 mt-4 text-lg font-medium text-white">
                    Live Map
                  </div>
                  <p className="text-sm leading-tight text-white/70">
                    Entdecke Events und Challenges in deiner Nähe auf der interaktiven Karte.
                  </p>
                </NavLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Direct Links */}
        <NavigationMenuItem>
          <NavLink href="/shop" className="bg-transparent hover:bg-jillr-darkAccent/50">
            <ShoppingBag className="mr-1 h-4 w-4" />
            Shop
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink href="/wallet" className="bg-transparent hover:bg-jillr-darkAccent/50">
            <Wallet className="mr-1 h-4 w-4" />
            Rewards
          </NavLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavLink 
            href="/creator-marketplace" 
            className="bg-transparent hover:bg-jillr-darkAccent/50 text-jillr-neonPurple"
          >
            <Users className="mr-1 h-4 w-4" />
            Creator Marketplace
          </NavLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
