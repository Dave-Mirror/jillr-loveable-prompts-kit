
// Define types for the dashboard components
export type Challenge = {
  id: string;
  title: string;
  status: string;
  type?: string;
  description?: string;
  coin_reward?: number;
  xp_reward?: number;
  start_date?: string;
  end_date?: string;
  hashtags?: string[];
  views?: number;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  sales: number;
  commission: number;
  trackingLink: string;
};

export type DashboardStats = {
  totalViews: number;
  totalXp: number;
  totalCoins: number;
  totalLinkClicks: number;
  totalSales: number;
  totalCommission: number;
};

export type Reward = {
  type: 'coins' | 'xp' | 'product' | 'voucher' | 'ticket';
  description: string;
  image?: string;
  level?: number;
  immediate: boolean;
  viral_bonus?: boolean;
};
