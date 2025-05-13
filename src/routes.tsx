
import { MapExperience, Dashboard, LiveMap, Profile, NotFound, ChallengeDetails } from "@/pages";
import { Compass, Home, LayoutDashboard, LucideIcon, MapPin, Settings as SettingsIcon, User, Users, Map } from "lucide-react";
import { Challenge } from "./components/challenge/types";

interface Route {
  path: string;
  element: React.ComponentType<any>;
  label?: string;
  icon?: LucideIcon;
  children?: Route[];
  sidebar?: boolean;
  protected?: boolean;
}

export const protectedRoutes = ['/dashboard', '/profile', '/settings', '/create-challenge', '/community', '/city-clash'];

const routes: Route[] = [
  {
    path: '/',
    element: MapExperience, // Wechsle zu MapExperience für die Startseite
    label: 'Home',
    icon: Home,
    sidebar: true,
  },
  {
    path: '/login',
    element: NotFound, // Temporär NotFound verwenden, bis Login implementiert ist
  },
  {
    path: '/register',
    element: NotFound, // Temporär NotFound verwenden, bis Register implementiert ist
  },
  {
    path: '/onboarding',
    element: MapExperience, // Wechsle zu MapExperience für Onboarding
  },
  {
    path: '/dashboard',
    element: Dashboard,
    label: 'Dashboard',
    icon: LayoutDashboard,
    sidebar: true,
    protected: true,
  },
  {
    path: '/profile',
    element: Profile,
    label: 'Profile',
    icon: User,
    sidebar: true,
    protected: true,
  },
  {
    path: '/settings',
    element: Profile, // Verwende vorübergehend Profile anstelle von Settings
    label: 'Settings',
    icon: SettingsIcon,
    sidebar: true,
    protected: true,
  },
  {
    path: '/map',
    element: MapExperience,
    label: 'Jillr Map',
    icon: Map,
    sidebar: true,
  },
  {
    path: '/explore',
    element: MapExperience,
    label: 'Explore',
    icon: Compass,
    sidebar: true,
  },
  {
    path: '/community',
    element: NotFound, // Temporär NotFound verwenden, bis Community implementiert ist
    label: 'Community',
    icon: Users,
    sidebar: true,
    protected: true,
  },
  {
    path: '/challenge/:challengeId',
    element: ChallengeDetails,
  },
  {
    path: '/livemap',
    element: LiveMap,
  },
  {
    path: '*',
    element: NotFound,
  },
];

export default routes;
