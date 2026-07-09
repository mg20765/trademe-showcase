import logo from "../../../assets/logo.png";
import "./footer.css";

// Footer recreates the Trade Me-style footer area.
function Footer() {
    return (
    <footer className="home-footer">
        <div className="home-footer__notice">
        <span>We are upgrading some of our systems</span>
        <a href="#">ⓘ Learn more</a>
        <a href="#">💬 Tell us what you think</a>
        </div>

        <div className="home-footer__content">
        <div className="home-footer__top">
            <img src={logo} alt="Trade Me logo" />

            <div className="home-footer__actions">
            <span>✎ Start a listing</span>
            <span>♡ Watchlist</span>
            <span>♡ Favourites</span>
            <span>👤 My Trade Me</span>
            <span>⇱ Log out</span>
            </div>
        </div>

        <div className="home-footer__columns">
            <div>
            <h4>Marketplace</h4>
            <p>Latest deals</p>
            <p>Stores</p>
            <p>Closing soon</p>
            <p>$1 reserve</p>
            </div>

            <div>
            <h4>Property</h4>
            <p>Property news</p>
            <p>Sold properties</p>
            <p>Find an agent</p>
            </div>

            <div>
            <h4>Motors</h4>
            <p>Cars for sale</p>
            <p>Motorbikes</p>
            <p>Buying advice</p>
            </div>

            <div>
            <h4>Jobs</h4>
            <p>Browse jobs</p>
            <p>Careers advice</p>
            <p>Advertise jobs</p>
            </div>

            <div>
            <h4>Services</h4>
            <p>Trades</p>
            <p>Domestic services</p>
            <p>Health & wellbeing</p>
            </div>

            <div>
            <h4>Community</h4>
            <p>Help</p>
            <p>Announcements</p>
            <p>Trust & safety</p>
            </div>
        </div>
        </div>
    </footer>
    );
}

export default Footer;