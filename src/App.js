import { Routes, Route } from "react-router-dom";
// Navigation component
import Navigation from "./routes/navigation/navigation.component";
// Home component
import Home from "./routes/home/home.component";
// Authentication component
import Authentication from "./routes/authentication/authentication.component";
// Shop component
import Shop from "./routes/shop/shop.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
