import { useSelector } from 'react-redux';
import './Profile.css'
import profile from './profile.jpg'
import { FaStar } from "react-icons/fa";
import { useState } from 'react';
import ReviewIndex from "../ReviewIndex/Reviews";
import axios from 'axios';


const Profile = () => {
    const user = useSelector(state => state.session.user)
    const [rating, setRating] = useState(5)
    const reviews = useSelector(state => state.session.user)
    const {_id, username, email} = user

    const RIOT_API_KEY = process.env.REACT_APP_RIOT_API_KEY
    const [playerSearch, setPlayerSearch] = useState();
    const [playerName, setPlayerName] = useState({});
    const [playerData, setPlayerData] = useState({});

    function searchForPlayer(event) {
        const API_CALL_PLAYER = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" 
        + playerSearch + "?api_key=" + RIOT_API_KEY;

        axios.get(API_CALL_PLAYER).then(function(res) {
            setPlayerName(res.data);

        }).catch(function(err) {
            console.log(err)
        })

    }

    const playerId = playerName.id;

    function getRankForPlayer(event) {
        const API_CALL_RANK = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/"
        + playerId + "?api_key=" + RIOT_API_KEY;
        
        axios.get(API_CALL_RANK).then(function(res) {
            setPlayerData(res.data);
            
        }).catch(function(err) {
            console.log(err)
        })
    }

    let playerDataComponent;

    if (playerData.length === 3) {
        playerDataComponent = (
            <>
            <h1>{playerData[0].queueType.split("_").slice(0, 2).join(" ")}</h1>
            <h1>{playerData[0].tier}</h1>
            <h1>{playerData[0].rank}</h1>
            <h1>{playerData[1].queueType.split("_").slice(0, 2).join(" ")}</h1>
            <h1>{playerData[1].tier}</h1>
            <h1>{playerData[1].rank}</h1>
            <h1>{playerData[2].queueType.split("_").slice(0, 2).join(" ")}</h1>
            <h1>{playerData[2].tier}</h1>
            <h1>{playerData[2].rank}</h1>
            </>
        )
    } else if (playerData.length === 2) {
        playerDataComponent = (
            <>
            <h1>{playerData[0].queueType.split("_").slice(0, 2).join(" ")}</h1>
            <h1>{playerData[0].tier}</h1>
            <h1>{playerData[0].rank}</h1>
            <h1>{playerData[1].queueType.split("_").slice(0, 2).join(" ")}</h1>
            <h1>{playerData[1].tier}</h1>
            <h1>{playerData[1].rank}</h1>      
            </>
        )
    } else if (playerData.length === 1) {
        playerDataComponent = (
            <>
            <h1>{playerData[0].queueType.split("_").slice(0, 2).join(" ")}</h1>
            <h1>{playerData[0].tier}</h1>
            <h1>{playerData[0].rank}</h1>
            </>
        )
    } else {
        playerDataComponent = (
            <>
            <h1>Rank not Found!</h1>
            </>
        )
    }
    


    return(
        <>
        <div className='game-main-container'>
            <div className='user-profile-box'>
                <div className='image-box'>
                    <img id='profile-image' src={profile}/>
                </div>
                <div className='user-text-box'>
                    <div className='username-box'>
                        <h1 id='profile-username'>{username}</h1>
                    </div>
                    <div className='user-star-rating'>
                        <label >
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </label>
                    </div>
                </div>  
            </div>
            <div className='user-reviews-box'>
                <ReviewIndex/>
            </div>

        </div>
        </>
    )
}

export default Profile;