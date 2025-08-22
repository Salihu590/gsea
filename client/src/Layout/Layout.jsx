import Navigation from "../components/navigation/Navigation";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}