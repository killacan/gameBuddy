import { useDispatch, useSelector } from 'react-redux';
import './Profile.css'
import profile from './profile.jpg'
import { FaStar } from "react-icons/fa";
import { useState } from 'react';
import ReviewIndex from "../ReviewIndex/ReviewIndex";
import axios from 'axios';
import { useEffect } from 'react';


const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const riotUsername = useSelector(state => state.session.user.riotUsername)
    
    
    const [rating, setRating] = useState(5)
    const reviews = useSelector(state => state.session.user)
    
    const RIOT_API_KEY = process.env.REACT_APP_RIOT_API_KEY
    
    const [playerInfoComponent, setPlayerInfoComponent] = useState();
    const [playerRankComponent, setPlayerRankComponent] = useState();
    const showStar = (rating)=>{
        if (rating===1){
             return (
                 <div>
                     <FaStar id="star-value" />
                     <FaStar id="non-star-value"/>
                     <FaStar id="non-star-value"/>
                     <FaStar id="non-star-value"/>
                     <FaStar id="non-star-value"/>
                 </div>
             )
         } 
        if (rating===2){
         return (
             <div>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="non-star-value"/>
                 <FaStar id="non-star-value"/>
                 <FaStar id="non-star-value"/>
              </div>
         )
         } 
         if (rating===3){
                  return (
             <div>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="non-star-value"/>
                 <FaStar id="non-star-value"/>
              </div>
         )
         } 
         if (rating===4){
                  return (
             <div>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="non-star-value"/>
              </div>
         )
         } 
         if (rating===5){
                  return (
             <div>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
                 <FaStar id="star-value"/>
              </div>
         )
         } 
     }
    
    useEffect(() => {

            const result = fetch(("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" 
            + riotUsername + "?api_key=" + RIOT_API_KEY), {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                const playerId = data.id;
                if (playerId) {
                    setPlayerInfoComponent (
                    <>
                       <div className="league-summoner-container">
                            <h1 id="league-username">League Username : {data.name}</h1>
                            <h2 id="summoner-lvl">Summoner Level : {data.summonerLevel}</h2>
                            <div id="avg-rating">Avg Rating:{showStar(3)}</div>
                        </div>
                    <div className="icon-img">
                        <div id="in-game-icon">
                            <img id="in-game-img" src={'http://ddragon.leagueoflegends.com/cdn/12.18.1/img/profileicon/' + data.profileIconId + ".png" }></img>
                        </div>
                    </div>
                    </>
                )            
            } else {
                setPlayerInfoComponent (
                    <div className="icon-img">
                        <div className="league-summoner-container">
                            <h1 id="league-username">{user.username}</h1>
                        </div>
                        <div id="in-game-icon">
                            <img id="in-game-img" src={profile}></img>
                        </div>
              
                    </div>
                )
            }

            return fetch("https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/"
            + playerId + "?api_key=" + RIOT_API_KEY)
        })
        .then(res => res.json())
        .then(data => {
            if (data && data.length === 3) {
                setPlayerRankComponent(
                    <div id="player-rank-component">
                    <h1 id="ranked-solo">{data[0].queueType.split("_").slice(0, 2).join(" ")}</h1>
                    <h1>{data[0].tier}</h1>
                    <h1>{data[0].rank}</h1>
                    <h1 id="ranked-tft">{data[1].queueType.split("_").slice(0, 2).join(" ")}</h1>
                    <h1>{data[1].tier}</h1>
                    <h1>{data[1].rank}</h1>
                    <h1 id="ranked-flex">{data[2].queueType.split("_").slice(0, 2).join(" ")}</h1>
                    <h1>{data[2].tier}</h1>
                    <h1>{data[2].rank}</h1>
                </div>
                )
            } else if (data && data.length === 2) {
                setPlayerRankComponent(
                    <div  id="player-rank-component">
                    <h1 id="unknown-1">{data[0].queueType.split("_").slice(0, 2).join(" ")}</h1>
                    <h1>{data[0].tier}</h1>
                    <h1>{data[0].rank}</h1>
                    <h1 id="unknown-2">{data[1].queueType.split("_").slice(0, 2).join(" ")}</h1>
                    <h1>{data[1].tier}</h1>
                    <h1>{data[1].rank}</h1>      
                </div>
                )
            } else if (data && data.length === 1) {
                setPlayerRankComponent(
                    <div  id="player-rank-component">
                    <h1 id="unknown-3">{data[0].queueType.split("_").slice(0, 2).join(" ")}</h1>
                    <h1>{data[0].tier}</h1>
                    <h1>{data[0].rank}</h1>
                </div>
                )} else {
                    setPlayerRankComponent(
                        <>
                        </>
                    )
                }
            })
            .catch(err => {
                console.error('Request Failed', err)
            })
            
        }, [])
        return(
            <>
            <div className='game-main-container'>

                <div className='user-profile-box'>
                {playerInfoComponent}
                    <div className='img-box'>
                        
                    </div>
                    <div className="rank-info">
                        {playerRankComponent}
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