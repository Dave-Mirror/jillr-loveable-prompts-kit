
import Client from 'shopify-buy';

// Initialize the client with your Shopify storefront access token and domain
const shopifyClient = Client.buildClient({
  domain: 'your-store-name.myshopify.com', // Replace with your store's domain
  storefrontAccessToken: 'your-storefront-access-token', // Replace with your storefront access token
});

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
