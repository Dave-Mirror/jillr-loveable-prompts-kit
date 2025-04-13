
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getProducts, updateShopifyClient } from '@/utils/shopify';

export const useShopifyConnection = () => {
  const { toast } = useToast();
  const [shopifyConnected, setShopifyConnected] = useState(false);
  const [shopifyApiKey, setShopifyApiKey] = useState('');
  const [shopifySecretKey, setShopifySecretKey] = useState('');
  const [shopifyStoreUrl, setShopifyStoreUrl] = useState('');
  const [shopifyStorefrontToken, setShopifyStorefrontToken] = useState('');
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Check if we have stored credentials
  useEffect(() => {
    const storedShopifyData = localStorage.getItem('shopifyCredentials');
    if (storedShopifyData) {
      const parsedData = JSON.parse(storedShopifyData);
      setShopifyStoreUrl(parsedData.storeUrl);
      setShopifyApiKey(parsedData.apiKey);
      setShopifySecretKey(parsedData.secretKey);
      setShopifyStorefrontToken(parsedData.storefrontToken);
      setShopifyConnected(true);
      
      // Fetch product count
      fetchProductCount();
    }
  }, []);

  const fetchProductCount = async () => {
    try {
      setLoading(true);
      const products = await getProducts();
      setProductCount(products.length);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to fetch products from Shopify.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const connectShopify = () => {
    if (!shopifyApiKey || !shopifySecretKey || !shopifyStoreUrl || !shopifyStorefrontToken) {
      toast({
        title: "Missing Information",
        description: "Please fill in all Shopify connection fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Update the Shopify client with new credentials
      updateShopifyClient(shopifyStoreUrl, shopifyStorefrontToken);
      
      // Store credentials in localStorage
      const shopifyCredentials = {
        apiKey: shopifyApiKey,
        secretKey: shopifySecretKey,
        storeUrl: shopifyStoreUrl,
        storefrontToken: shopifyStorefrontToken
      };
      
      localStorage.setItem('shopifyCredentials', JSON.stringify(shopifyCredentials));
      
      setShopifyConnected(true);
      toast({
        title: "Shopify Connected",
        description: "Your Shopify store has been successfully connected",
      });
      
      // Fetch product count
      fetchProductCount();
    } catch (error) {
      console.error('Error connecting to Shopify:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to Shopify. Please check your credentials.",
        variant: "destructive"
      });
    }
  };

  const disconnectShopify = () => {
    localStorage.removeItem('shopifyCredentials');
    setShopifyConnected(false);
    setProductCount(0);
    setShopifyApiKey('');
    setShopifySecretKey('');
    setShopifyStoreUrl('');
    setShopifyStorefrontToken('');
    toast({
      title: "Shopify Disconnected",
      description: "Your Shopify store has been disconnected",
    });
  };

  return {
    shopifyConnected,
    shopifyApiKey,
    shopifySecretKey,
    shopifyStoreUrl,
    shopifyStorefrontToken,
    productCount,
    loading,
    setShopifyApiKey,
    setShopifySecretKey,
    setShopifyStoreUrl,
    setShopifyStorefrontToken,
    connectShopify,
    disconnectShopify,
    fetchProductCount
  };
};
