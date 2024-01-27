import "./category-item.styles.scss";

// Items Card
const CategoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  return (
    <div className="category-container">
      <img className="background-image" src={imageUrl} alt={title} />
      <div className="category-body-container">
        <h2 className="category-title">{title}</h2>
        <p className="shop-btn">Shop Now</p>
      </div>
    </div>
  );
};

export default CategoryItem;
