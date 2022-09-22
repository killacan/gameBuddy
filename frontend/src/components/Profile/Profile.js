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

    useEffect(() => {
          
        const result = fetch(("https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" 
        + riotUsername + "?api_key=" + RIOT_API_KEY), {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            const playerId = data.id;
            if (playerId) {
                setPlayerInfoComponent (
                    <>
                    <img src={'http://ddragon.leagueoflegends.com/cdn/12.18.1/img/profileicon/' + data.profileIconId + ".png" }></img>
                    <h1>League Username:{data.name}</h1>
                    <h2>Summoner Level:{data.summonerLevel}</h2>
                    </>
                )            
            }
            return fetch("https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/"
            + playerId + "?api_key=" + RIOT_API_KEY)
        })
        .then(res => res.json())
        .then(data => {
            if (data.length === 3) {
                setPlayerRankComponent(
                    <>
                <h1>{data[0].queueType.split("_").slice(0, 2).join(" ")}</h1>
                <h1>{data[0].tier}</h1>
                <h1>{data[0].rank}</h1>
                <h1>{data[1].queueType.split("_").slice(0, 2).join(" ")}</h1>
                <h1>{data[1].tier}</h1>
                <h1>{data[1].rank}</h1>
                <h1>{data[2].queueType.split("_").slice(0, 2).join(" ")}</h1>
                <h1>{data[2].tier}</h1>
                <h1>{data[2].rank}</h1>
                </>
                )
            } else if (data.length === 2) {
                setPlayerRankComponent(
                    <>
                <h1>{data[0].queueType.split("_").slice(0, 2).join(" ")}</h1>
                <h1>{data[0].tier}</h1>
                <h1>{data[0].rank}</h1>
                <h1>{data[1].queueType.split("_").slice(0, 2).join(" ")}</h1>
                <h1>{data[1].tier}</h1>
                <h1>{data[1].rank}</h1>      
                </>
                )
            } else if (data.length === 1) {
                setPlayerRankComponent(
                    <>
                <h1>{data[0].queueType.split("_").slice(0, 2).join(" ")}</h1>
                <h1>{data[0].tier}</h1>
                <h1>{data[0].rank}</h1>
                </>
                )} 
            })
            .catch(err => {
                console.error('Request Failed', err)
            })
    }, [])
            return(
                <>
        <div className='game-main-container'>
            <div>
                {playerInfoComponent}
                {playerRankComponent}
            </div>
            <div className='user-profile-box'>
                <div className='image-box'>
                    <img id='profile-image' src={profile}/>
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