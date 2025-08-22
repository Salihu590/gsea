import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/">Global Symptom Ecology Atlas</Link>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link className="hover:text-blue-500" to="/">Home</Link>
            </li>
            <li>
              <Link className="hover:text-blue-500" to="/about">About</Link>
            </li>
            <li>
              <Link className="hover:text-blue-500" to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}