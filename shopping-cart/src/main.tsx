import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./components/Navbar";
import JewelleryPage from "./pages/JewelleryPage/JewelleryPage";
import { CartPageContextProvider } from "./pages/CartPage/CartPageContextProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartPageContextProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="products">
            <Route path="category">
              <Route path="jewellery" element={<JewelleryPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </CartPageContextProvider>
  </StrictMode>
);
