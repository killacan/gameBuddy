import './MainPage.css';
import { NavLink } from 'react-router-dom';
import SplashCarousel from '../SplashCarousel/SplashCarousel';

const MainPage = () => {

    return (
        <div className='splash-container'>
            <div className="splash-buttons-container">
                <div className="signin-div">
                    <NavLink exact to="/login" id="sign-in">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <p>
                            Sign In
                        </p>
                    </NavLink>
                </div>

                <div className="signup-div">
                    <NavLink exact to="/signup" id="sign-up">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <p>
                            Sign up
                        </p>
                    </NavLink>
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