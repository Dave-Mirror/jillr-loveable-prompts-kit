
import { MapExperience, Dashboard, LiveMap, Profile, NotFound, ChallengeDetails, ChallengeExplorer } from "@/pages";
import { Compass, Home, LayoutDashboard, Map, MapPin, Settings as SettingsIcon, User, Users } from "lucide-react";
import { Challenge } from "./components/challenge/types";

interface Route {
  path: string;
  element: React.ComponentType<any>;
  label?: string;
  icon?: React.ComponentType<any>;
  children?: Route[];
  sidebar?: boolean;
  protected?: boolean;
}

export const protectedRoutes = ['/dashboard', '/profile', '/settings', '/create-challenge', '/community', '/city-clash'];

const routes: Route[] = [
  {
    path: '/',
    element: MapExperience,
    label: 'Home',
    icon: Home,
    sidebar: true,
  },
  {
    path: '/login',
    element: NotFound,
  },
  {
    path: '/register',
    element: NotFound,
  },
  {
    path: '/onboarding',
    element: MapExperience,
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
    element: Profile,
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
    element: ChallengeExplorer,
    label: 'Challenge Explorer',
    icon: Compass,
    sidebar: true,
  },
  {
    path: '/community',
    element: NotFound,
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
