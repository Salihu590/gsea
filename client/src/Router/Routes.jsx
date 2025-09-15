import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Report from "../pages/Report";
import Results from "../pages/Results"; 

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/report" element={<Report />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/results" element={<Results />} /> 
      </Route>
    </Routes>
  );
}
