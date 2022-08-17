//just some fontawesome imports
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header () {
    return(
        <header>
            <div className="wrapper">
                <div className="title">
                    <h1>Sustainability Tracker</h1>
                    <h2>Track Your Waste Habits</h2>
                    <FontAwesomeIcon className="leaf" icon={faLeaf} />
                </div>
            </div>
        </header>
    )
}

export default Header;