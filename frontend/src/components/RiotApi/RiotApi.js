import { useState } from "react";
import axios from 'axios';

const RiotApi = () => {

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

    return (
        <>
        <div className="api-page">

            <h1>Hello from Riot API</h1>

            <input 
            type='text' 
            onChange={e => setPlayerSearch(e.target.value)} 
            />
            <button onClick={e => searchForPlayer(e)}>Search</button>
            {JSON.stringify(playerName) != '{}' ? 
                <>
                <h1>{playerName.name}</h1>
                <img src={'http://ddragon.leagueoflegends.com/cdn/12.18.1/img/profileicon/' + playerName.profileIconId + ".png" }></img>
                <h2>{playerName.summonerLevel}</h2>
                </>
            :
                <>
                <h1>Player not found!</h1>
                </>
            }
            <button onClick={e => getRankForPlayer(e)}>Get Rank</button>
            {playerDataComponent}
        </div>
        </>
    )
}

export default RiotApi;