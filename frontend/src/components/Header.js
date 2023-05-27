import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header>
            {/* <h1>{props.title}</h1> */}
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item"><Link class="nav-link" to='/'>Map</Link></li>
                    <UserContext.Consumer>
                        {context => (
                            context.user ?
                                <>
                                    {/* <li><Link to='/addPhoneData'>AddPhoneData</Link></li> */}
                                    <li class="nav-item"><Link class="nav-link" to='/profile'>Profile</Link></li>
                                    <li class="nav-item"><Link class="nav-link" to='/logout'>Logout</Link></li>
                                </>
                            :
                                <>
                                    <li class="nav-item"><Link class="nav-link" to='/login'>Login</Link></li>
                                    <li class="nav-item"><Link class="nav-link" to='/register'>Register</Link></li>
                                </>

                        )}
                    </UserContext.Consumer>
                </ul>
            </nav>
        </header >
    );
}

export default Header;