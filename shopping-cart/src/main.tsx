import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./components/Navbar";
import JewelleryPage from "./pages/JewelleryPage/JewelleryPage";
import { CartPageContextProvider } from "./pages/CartPage/CartPageContextProvider";
import Cart from "./pages/CartPage/Cart";
import MenClothingPage from "./pages/MenClothingPage/MenClothing";
import WomenClothingPage from "./pages/WomenClothingPage/WomenClothing";
import ShoesPage from "./pages/ShoesPage/ShoesPage";
import PantsPage from "./pages/PantsPage/PantsPage";
import ElectronicsPage from "./pages/ElectronicsPage/ElectronicsPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartPageContextProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="products">
            <Route path="category">
              <Route path="jewellery" element={<JewelleryPage />} />
              <Route path="mensclothing" element={<MenClothingPage />} />
              <Route path="womensclothing" element={<WomenClothingPage />} />
              <Route path="shoes" element={<ShoesPage />} />
              <Route path="pants" element={<PantsPage />} />
              <Route path="electronics" element={<ElectronicsPage />} />
            </Route>
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartPageContextProvider>
  </StrictMode>
);
