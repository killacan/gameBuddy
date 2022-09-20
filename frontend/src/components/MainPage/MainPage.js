import './MainPage.css';
import { NavLink } from 'react-router-dom';
import SplashCarousel from '../SplashCarousel/SplashCarousel';
import WebSocketComp from '../WebSocketComp/WebSocketComp';
const MainPage = () => {


    return (
        <div className='splash-container'>
            <WebSocketComp />
            <div className="splash-buttons-container">
                <div className="signin-div">
                    <a>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <NavLink exact to="/login" id="sign-in">
                            Sign In
                        </NavLink>
                    </a>
                </div>

                <div className="signup-div">
                    <a>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <NavLink exact to="/signup" id="sign-up">
                            Sign up
                        </NavLink>
                    </a>
                </div>
            </div>
            <div id="gamebuddy-splash-title">GAMEBUDDY</div>
            <div id="gamebuddy-slogan">play and connect</div>
            <div className="square-moving-animation">
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
            </div>
            <div className="title-page-container">
                <SplashCarousel/>
            </div>
        </div>
    )
}

export default MainPage;