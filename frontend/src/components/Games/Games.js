import './Games.css'
import react from 'react';
// import { Link, Redirect,NavLink } from 'react-router-dom';
import valorantBg from './valorant-game-image.png'
import leagueBg from './league-game-image.png'
import tftBg from './tft-game-image.png'
import {useHistory} from 'react-router-dom'
// import { useHistory } from 'react-router-dom';

const Games = () => {



    const history = useHistory();

    const handleClick = (field) => {
        return e => {
            switch(field){
                case "valorant":
                    history.push("/games/rooms?game=Valorant")
                    break;
                case "league":
                    history.push("/games/rooms?game=League+of+Legends")
                    break;
                case "tft":
                    history.push("/games/rooms?game=TeamFight+Tactics")
                    break;
                default:
                    console.log('error');
                    break; 
            }
        }
    }


    return (
        <>
      
            <div className = "game-main-container">
                <div className="game-list">         
                    <div onClick={handleClick("valorant")} id="valorant">
                        <img   id="valorant-image" src={valorantBg}/>
                    </div>
         
                    <div  onClick={handleClick("league")} id="league">
                        <img id="league-image" src={leagueBg}/>
                    </div>
               
                    <div  onClick={handleClick("tft")}   id="tft">
                        <img id="tft-image" src={tftBg}/>
                    </div>
                </div>
                <div className="game-desc-container">
                    <h1 id="game-desc">SELECT A GAME TO GET CONNECTED</h1>
                </div>
            </div>
        </>
    )
}

export default Games;