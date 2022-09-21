import './Games.css'
import react from 'react';
import { Link, Redirect,NavLink } from 'react-router-dom';
import valorantBg from './valorant-game-image.png'
import leagueBg from './league-game-image.png'
import tftBg from './tft-game-image.png'

// import { useHistory } from 'react-router-dom';

const Games = () => {


    return (
        <div className = "game-main-container">
            
            <div className="game-list">
                <Link 
                    id="valorant"  
                    to="/games/rooms"
                    state={{from: "valorant"}}
                    >
                    {/* <div onClick={handleClick("valorant")} id="valorant"> */}
                        <img id="valorant-image" src={valorantBg}/>
                    {/* </div> */}
                </Link>
                <NavLink id="league" to="/games/rooms">
                    {/* <div  id="league"> */}
                        <img id="league-image" src={leagueBg}/>
                    {/* </div> */}
                </NavLink>
                <NavLink id="tft" to="/games/rooms"  >
                    {/* <div  id="tft"> */}
                        <img id="tft-image" src={tftBg}/>
                    {/* </div> */}
                </NavLink>
            </div>
            <div className="game-desc-container">
                <h1 id="game-desc">SELECT A GAME TO GET CONNECTED</h1>
            </div>

        </div>
    )
}

export default Games;