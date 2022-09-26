import { useDispatch, useSelector } from 'react-redux';
import './Profile.css'
import profile from './default-profile.png'
import { FaStar } from "react-icons/fa";
import { useState,useEffect } from 'react';
import ReviewIndex from "../ReviewIndex/ReviewIndex";
import axios from 'axios';
import profileBg from './profile-bg.png'
import profileBorder from './profile-border.png'
import { useParams } from 'react-router-dom';
import { fetchReviews } from '../../store/reviews';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const riotUsername = useSelector(state => state.session.user.riotUsername)
    const {userId} = useParams();

    
    const [rating, setRating] = useState(5)
    const reviews = useSelector(state => Object.values(state.reviews))
    useEffect(()=>{
        dispatch(fetchReviews())
    },[])
    
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

     let friendly = 0;
     let griefing = 0;
     let leader = 0;
     let skilled =0;
     let teamPlayer = 0;
     let toxic = 0;
     
     const countTags = () => {
        console.log(reviews)
        reviews.map(review=> {
            if (review.reviewer._id === userId) {
                if (review.friendly){
                    friendly = friendly + 1 ;
                } else if ( review.griefing){
                    griefing = griefing + 1;
                } else if (review.leader) {
                    leader = leader + 1;
                } else if (review.skilled) {
                    skilled = skilled + 1;
                } else if (review.teamPlayer){
                    teamPlayer = teamPlayer + 1 ;
                } else if (review.toxic){
                    toxic = toxic + 1;
                }
            }})
        return (
            <div className="list-of-tags">
                <div id="tags-desc-1">Friendly: {friendly}</div>
                <div id="tags-desc-2">Griefing: {griefing}</div>
                <div id="tags-desc-3">Leader: {leader}</div>
                <div id="tags-desc-4">Skilled: {skilled}</div>
                <div id="tags-desc-5">TeamPlayer: {teamPlayer}</div>
                <div id="tags-desc-6">Toxic: {toxic}</div>
            </div>
        )
     }
    
    useEffect(() => {

        if (!riotUsername || riotUsername === undefined) {
            setPlayerInfoComponent (
            <div className="icon-img">
                <div className="league-summoner-container">
                    <div id="league-username">
                        <div id="league-username-2">{user.username}</div>
                    </div>
                </div>
                
                <div id="in-game-icon">
                    <img id="in-game-img" src={profile}></img>
                </div>
            </div>
            )
        } else {
            const result = fetch(("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" 
            + riotUsername + "?api_key=" + RIOT_API_KEY), {method: 'GET'})
            .then(res => res.json())
            .then(data => {
                const playerId = data.id;
                if (playerId) {
                    setPlayerInfoComponent (
                    <>
                       <div className="league-summoner-container">
                            <div id="league-username"> League Username :
                                <div id="league-username-2"> {data.name}</div>
                            </div>
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
                    <div id="player-rank-component">
                        <h1 id="testing-testing">No Rankings Available</h1>
                    </div>
                )
            }
            })
            .catch(err => {
                console.error('Request Failed', err)
            })
        }
        
        }, [])
    
        return(
            <>
                <div className='game-main-container'>
                    <div className="profile-bg-container">
                        <img id="profile-bg" src={profileBg}/>
                        <div className="profile-image-border">
                            <img id="profile-border" src={profileBorder}/>
                            {playerInfoComponent}
                        </div>
                        
                    </div>
          
                 
                    <div className="bottom-profile-container">
                        <div className="rank-reviews-info">
                            <div className="review-tags-display">
                                <div id="review-tags-display-bg"></div>
                                {countTags()}
                            </div>

                            <div className="rank-info">
                                <div id="rank-review-bg"></div>
                                {playerRankComponent}
                            </div>
                        </div>
                        <div className="user-reviews-box">
                            <div id="user-reviews-box-bg"></div>
                            <ReviewIndex/>
                        </div>
                    </div>
                   
                    {/* <div className='user-profile-box'>
                        {playerInfoComponent}
                        <div className='img-box'>
                            
                        </div>
                        <div className="rank-info">
                            {playerRankComponent}
                        </div>
                    </div>

                    <div className='user-reviews-box'>
                        <ReviewIndex/>
                    </div> */}
                </div>
             </>
)
}

export default Profile;