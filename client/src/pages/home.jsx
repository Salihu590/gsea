import Hero from "../components/home/hero/Hero";
import Client from "../components/home/client/Client";
import HowItWorks from "../components/home/client/HowItWorks";

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <HowItWorks />
      <Client />
    </div>
  );
}