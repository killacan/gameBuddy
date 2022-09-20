import './Games.css'
import react, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import valorantBg from './valorant-game-image.png'
import leagueBg from './league-game-image.png'
import tftBg from './tft-game-image.png'

const Games = () => {

    const [valorant,setValorant] = useState(false);
    const [league,setLeague] = useState(false);
    const [tft,setTft] = useState(false); 

    const handleClick = (field) => {
        return e => {
            e.preventDefault();
            switch(field){
                case 'valorant':
                    setValorant(true);
                    <Redirect to={"/games/rooms"} />
                    break;
                case 'league':
                    setLeague(true);
                    <Redirect to={"/games/rooms"} />
                    break;
                case 'tft':
                    setTft(true);
                    <Redirect to={"/games/rooms"} />
                    break;
                default:
                    console.error('');
                    break;
            }

        }

    }
    return (
        <div className = "game-main-container">
            
            <div className="game-list">
                <div onClick={handleClick('valorant')} id="valorant">
                    <img id="valorant-image" src={valorantBg}/>
                </div>
                <div onClick={handleClick('league')} id="league">
                    <img id="league-image" src={leagueBg}/>
                </div>
                <div onClick={handleClick('tft')} id="tft">
                    <img id="tft-image" src={tftBg}/>
                </div>
            </div>
            <div className="game-desc-container">
                <h1 id="game-desc">SELECT A GAME TO GET CONNECTED</h1>
            </div>
        </div>
    )
}

export default Games;