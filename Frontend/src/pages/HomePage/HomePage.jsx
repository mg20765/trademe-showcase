import Header from "./HomeComponents/Header";
import HeroSection from "./HomeComponents/HeroSection";
import ListingSection from "./HomeComponents/ListingSection";
import Footer from "./HomeComponents/Footer";
import "./HomePage.css";

// Main Home page.
// This file combines all Home page components together.
function HomePage() {
    return (
    <div className="home-page">
        <Header />
        <HeroSection />

        <ListingSection title="Cool auctions" viewAllText="View all (15)" />
        <ListingSection title="$1 reserve" viewAllText="View all" />

        <Footer />
    </div>
    );
}

export default HomePage;