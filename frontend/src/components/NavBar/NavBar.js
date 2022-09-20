// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import './NavBar.css'
// import { logout } from '../../store/session'
import { useLocation } from 'react-router-dom';
import {FaUserAstronaut} from "react-icons/fa";
import {RiMenuUnfoldFill} from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';

function NavBar () {

    const location = useLocation();
    const toggle = () => {
      if (location.pathname === "/" || location.pathname === "/signup" || location.pathname === "/login") {
        return "hidden"
      }else{
        return "navBar-container";
      }
    }

    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = (e) => {
      e.preventDefault();
      dispatch(logout());
      history.push("/");
    }

    const handleProfile = (e) => [
      e.preventDefault();
      history.push("/profile")
    ]
 

    return (
      <div className={toggle()}>
        <div className="left-side-nav">
            <RiMenuUnfoldFill id="menu-icon"/>
        </div>

        <div className="right-side-nav"> 

            <FaUserAstronaut id="user-icon" />
            <div className="drop-down-content">
                <div onClick={handleProfile} id="profile-drop">Profile</div>
                <div onClick={handleLogout} id="logout-drop">Log out</div>
            </div>

        </div>
      </div>
    )
  }
  
  export default NavBar;