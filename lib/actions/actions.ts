export const getCollections = async () => {
  try {
    // Use current timestamp to ensure uniqueness and bypass caching
    const nocache = new Date().getTime();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections?nocache=${nocache}`);
    const collections = await response.json();
    // Optional: Log to verify fresh data
    return collections;
  } catch (error) {
    console.error('Fetch Error:', error);
    return []; // Return an empty array or handle the error as needed
  }
};


export const getCollectionDetails = async (collectionId: string) => {
  try {
    // Use current timestamp to ensure uniqueness and bypass caching
    const nocache = new Date().getTime();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${collectionId}?nocache=${nocache}`);
    if (!response.ok) {
      throw new Error(`Error fetching collection details: ${response.statusText}`);
    }
    const collection = await response.json();
    return collection;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error; // Re-throw the error or handle it as needed
  }
};

export const getProducts = async () => {
  try {
    const nocache = new Date().getTime();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?nocache=${nocache}`);
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
};


export const getProductDetails = async (productId: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);

    if (!response.ok) {
      throw new Error(`Error fetching product details: ${response.statusText}`);
    }

    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    throw error;
  }
};


export const getSearchedProducts = async (query: string) => {
  const searchedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search/${query}`)
  return await searchedProducts.json()
}

export const getOrders = async (customerId: string) => {
  const orders = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/customers/${customerId}`)
  return await orders.json()
}

export const getRelatedProducts = async (productId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}/related`, {
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  return await response.json();
}