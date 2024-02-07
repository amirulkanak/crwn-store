// Products context
import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
// Styles
import "./shop.styles.scss";

// Product-card component
import ProductCard from "../../components/product-card/product-card.component";

const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
