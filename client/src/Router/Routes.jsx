import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/home";
import About from "../pages/About";
import Contact from "../pages/Contact";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}