import './MainPage.css';
import { NavLink } from 'react-router-dom';
import SplashCarousel from '../SplashCarousel/SplashCarousel';
import WebSocketComp from '../WebSocketComp/WebSocketComp';
const MainPage = () => {


    return (
        <div className='splash-container'>
            <WebSocketComp />
            <div className="splash-buttons-container">
                <div className="splash-buttons">
                    <NavLink exact to="/login" id="sign-in"><span>Sign In</span></NavLink>
                </div>
                <div>
                    <NavLink exact to="/signup" id="sign-up"><span>Sign Up</span></NavLink>
                </div>
            </div>
            <div className="title-page-container">
                <SplashCarousel/>
            </div>
        </div>
    )
}

export default MainPage;