import logo from "../assets/logo.png";


function Header() {
    return (
        <header className="header">
            <div className="header__inner">
                <img src={logo} alt="Trade Me logo" className="header__logo" />

                {/* Search bar for the Home page design */}
                <div className="header__search">
                    <input type="text" placeholder="Search all of Trade Me" />
                
                </div>
            </div>
        </header>
    )
}