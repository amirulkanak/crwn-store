import { createContext, useState } from "react";
// Products Data
import ProductData from "../shop-data.json";

// Actual value
export const ProductsContext = createContext({
  products: [],
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(ProductData);
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
