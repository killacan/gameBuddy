import { useState } from "react";
import axios from 'axios';

const RiotApi = () => {

    const RIOT_API_KEY = "RGAPI-84f95961-a2b7-45cc-b2c3-cf9ff92bf9cb";
    const [playerSearch, setPlayerSearch] = useState();
    const [playerData, setPlayerData] = useState({});

    function searchForPlayer(event) {
        const API_CALL_STRING = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" 
        + playerSearch + "?api_key=" + RIOT_API_KEY;

        axios.get(API_CALL_STRING).then(function(res) {
            setPlayerData(res.data);

        }).catch(function(err) {
            console.log(err)
        })

    }

    console.log(playerData)
    return (
        <>
        <div className="api-page">

            <h1>Hello from Riot API</h1>

            <input 
            type='text' 
            onChange={e => setPlayerSearch(e.target.value)} 
            />
            <button onClick={e => searchForPlayer(e)}>Search</button>
            {JSON.stringify(playerData) != '{}' ? 
                <>
                <h1>{playerData.name}</h1>
                <img src={'http://ddragon.leagueoflegends.com/cdn/12.18.1/img/profileicon/' + playerData.profileIconId + ".png" }></img>
                <h2>{playerData.summonerLevel}</h2>
                </>
            :
                <>
                <h1>Player not found!</h1>
                </>
            }
        </div>
        </>
    )
}

export default RiotApi;