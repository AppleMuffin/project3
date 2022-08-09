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
                <div className="instructions">
                    <h3>Instructions</h3>
                    <p>Enter your waste data and chart your waste habits. Use this to reduce your waste generation!</p>
                </div>
            </div>
        </header>
    )
}

export default Header;