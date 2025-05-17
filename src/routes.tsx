
import { ChallengeFeed, CityClash, Community, CreateChallenge, Dashboard, Explore, Home, LandingPage, Legal, LiveMap, Login, NotFound, Onboarding, Profile, Register, Settings, ChallengeDetail } from "@/pages";
import { Compass, Home as HomeIcon, LayoutDashboard, LucideIcon, MapPin, Settings as SettingsIcon, User, Users } from "lucide-react";
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
    path: '/challenge-feed',
    element: ChallengeFeed,
    label: 'Challenge Feed',
    sidebar: true,
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
    element: CityClash,
    label: 'City Clash',
    icon: Users,
    sidebar: true,
    protected: true,
  },
  {
    path: '/challenge/:challengeId',
    element: ChallengeDetail,
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
