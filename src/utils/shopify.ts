
import Client from 'shopify-buy';

// Initialize the client with Shopify storefront credentials from environment variables
// or fallback to values in localStorage if they exist
const getShopifyCredentials = () => {
  // Check if running in browser and localStorage is available
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const storedCredentials = localStorage.getItem('shopifyCredentials');
      if (storedCredentials) {
        const parsedCredentials = JSON.parse(storedCredentials);
        return {
          domain: parsedCredentials.storeUrl || 'your-store-name.myshopify.com',
          storefrontAccessToken: parsedCredentials.storefrontToken || 'your-storefront-access-token',
        };
      }
    } catch (error) {
      console.error('Error reading Shopify credentials from localStorage:', error);
    }
  }
  
  // Fallback to environment variables or default values
  return {
    domain: import.meta.env.VITE_SHOPIFY_DOMAIN || 'your-store-name.myshopify.com',
    storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || 'your-storefront-access-token',
  };
};

// Create a function to initialize the client
const createShopifyClient = () => {
  const { domain, storefrontAccessToken } = getShopifyCredentials();
  
  return Client.buildClient({
    domain,
    storefrontAccessToken,
  });
};

// Initialize the client
let shopifyClient = createShopifyClient();

// Function to reinitialize the client with new credentials
export const updateShopifyClient = (storeUrl: string, storefrontToken: string) => {
  shopifyClient = Client.buildClient({
    domain: storeUrl,
    storefrontAccessToken: storefrontToken,
  });
  
  return shopifyClient;
};

// Products
export const getProducts = async () => {
  try {
    const products = await shopifyClient.product.fetchAll();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProductById = async (id: string) => {
  try {
    const product = await shopifyClient.product.fetch(id);
    return product;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
};

// Collections
export const getCollections = async () => {
  try {
    const collections = await shopifyClient.collection.fetchAll();
    return collections;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
};

// Cart
export const createCart = async () => {
  try {
    const cart = await shopifyClient.checkout.create();
    return cart;
  } catch (error) {
    console.error('Error creating cart:', error);
    return null;
  }
};

export const addItemToCart = async (checkoutId: string, lineItemsToAdd: any[]) => {
  try {
    const cart = await shopifyClient.checkout.addLineItems(checkoutId, lineItemsToAdd);
    return cart;
  } catch (error) {
    console.error('Error adding item to cart:', error);
    return null;
  }
};

export default shopifyClient;
