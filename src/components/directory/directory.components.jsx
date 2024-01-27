import "./directory.styles.scss";
import CategoryItem from "../category-item/category-item.component";

// Shop items Directories
const Directory = ({ catagories }) => {
  return (
    <div className="directory-container">
      {catagories.map((category) => (
        // Items Card
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
