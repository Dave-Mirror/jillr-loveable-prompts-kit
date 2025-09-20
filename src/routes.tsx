import { 
  Compass, 
  Home as HomeIcon, 
  LayoutDashboard, 
  MapPin, 
  Settings as SettingsIcon, 
  User, 
  Users 
} from "lucide-react";

// Import pages individually
import Explore from "@/pages/Explore";
import ChallengeFeed from "@/pages/ChallengeFeed";
import CityClashPage from "@/pages/CityClashPage";
import Community from "@/pages/NotFound";
import CreateChallenge from "@/pages/ChallengeEditor";
import Dashboard from "@/pages/Dashboard";
import Home from "@/pages/Index";
import LandingPage from "@/pages/Index";
import Legal from "@/pages/NotFound";
import LiveMap from "@/pages/LiveMap";
import Login from "@/pages/Auth";
import NotFound from "@/pages/NotFound";
import Onboarding from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import Register from "@/pages/Auth";
import Settings from "@/pages/NotFound";
import ChallengeDetail from "@/pages/ChallengeDetail";
import CompanyProfile from "@/pages/CompanyProfile";

import { LucideIcon } from "lucide-react";
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
    element: LandingPage,
    label: 'Home',
    icon: HomeIcon,
    sidebar: true,
  },
  {
    path: '/home',
    element: Home,
  },
  {
    path: '/login',
    element: Login,
  },
  {
    path: '/register',
    element: Register,
  },
  {
    path: '/onboarding',
    element: Onboarding,
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
    element: Settings,
    label: 'Settings',
    icon: SettingsIcon,
    sidebar: true,
    protected: true,
  },
  {
    path: '/legal',
    element: Legal,
  },
  {
    path: '/explore',
    element: Explore,
    label: 'Explore',
    icon: Compass,
    sidebar: true,
  },
  {
    path: '/create-challenge',
    element: CreateChallenge,
    label: 'Create Challenge',
    icon: MapPin,
    sidebar: true,
    protected: true,
  },
  {
    path: '/community',
    element: Community,
    label: 'Community',
    icon: Users,
    sidebar: true,
    protected: true,
  },
  {
    path: '/city-clash',
    element: CityClashPage,
    label: 'City Clash',
    icon: Users,
    sidebar: true,
    protected: true,
  },
  {
    path: '/company/:id',
    element: CompanyProfile,
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
