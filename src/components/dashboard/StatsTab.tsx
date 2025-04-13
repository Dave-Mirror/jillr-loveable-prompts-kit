
import React from 'react';
import { LinkIcon, ShoppingBag, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashboardStats, Product } from '@/types/dashboard';

interface StatsTabProps {
  stats: DashboardStats;
  products: Product[];
}

const StatsTab: React.FC<StatsTabProps> = ({ stats, products }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <LinkIcon className="text-jillr-neonPurple" size={18} />
              Link-Klicks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalLinkClicks.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Alle Affiliate-Links</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShoppingBag className="text-jillr-neonGreen" size={18} />
              Verkäufe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalSales.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Alle Produkte</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Coins className="text-jillr-neonPink" size={18} />
              Provision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${stats.totalCommission.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <p className="text-sm text-muted-foreground">Verdiente Provision</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-card rounded-lg border p-4">
        <h2 className="text-xl font-semibold mb-4">Affiliate-Link Performance</h2>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produkt</TableHead>
                <TableHead>Klicks</TableHead>
                <TableHead>Conversion</TableHead>
                <TableHead>Verkäufe</TableHead>
                <TableHead>Provision</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{Math.floor(Math.random() * 100) + 50}</TableCell>
                  <TableCell>{(Math.random() * 5 + 2).toFixed(1)}%</TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell>${(product.commission * product.sales).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default StatsTab;
