import Hero from "../components/home/hero/Hero";
import Client from "../components/home/client/Client";

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <Client />
    </div>
  );
}