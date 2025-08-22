import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Router/Routes";

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}