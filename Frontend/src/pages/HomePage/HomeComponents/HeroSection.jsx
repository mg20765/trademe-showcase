import { Link } from "react-router-dom";
import "./heroSection.css";

// HeroSection contains the large search bar and category buttons.
function HeroSection() {
    return (
    <section className="hero-section">
        <div className="hero-section__search">
        <span>⌕</span>
        <input type="text" placeholder="Search all of Trade Me" />
        <button>Search</button>
        </div>

        <div className="hero-section__buttons">
        <Link to="/category" className="hero-section__button">
            <span>🛍️</span>
            Marketplace
        </Link>

        <button className="hero-section__button">
            <span>🏠</span>
            Property
        </button>

        <button className="hero-section__button">
            <span>🚙</span>
            Motors
        </button>

        <button className="hero-section__button">
            <span>💼</span>
            Jobs
        </button>

        <button className="hero-section__button">
            <span>🔧</span>
            Services
        </button>
        </div>
    </section>
    );
}

export default HeroSection;