import { useState } from "react";
import axios from 'axios';

const RiotApi = () => {

    const RIOT_API_KEY = "RGAPI-608e101d-f834-4f06-8fe9-439e455aac68";
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

    // RANKED_TFT_DOUBLE_UP

    function getRankForPlayer(event) {
        const API_CALL_RANK = "https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/"
        + playerId + "?api_key=" + RIOT_API_KEY;

        axios.get(API_CALL_RANK).then(function(res) {
            setPlayerData(res.data);
            
        }).catch(function(err) {
            console.log(err)
        })
    }
    const data = JSON.stringify(playerData);
    console.log(data)

    let gameMode = 'UNRANKED'
    data.forEach(game => {
        for (let key in game) {
            if (key === 'RANKED_TFT_DOUBLE_UP') {
                gameMode = game;
            }
        }
    })



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
            {/* {JSON.stringify(playerData) != '{}' ?
                <>
                <h1>{playerData[0].tier}</h1>
                <h1>{playerData[0].rank}</h1>

                {console.log(playerData)}
                </>
            :
                <>
                <h1>Rank not found!</h1>
                </>
            } */}
        </div>
        </>
    )
}

export default RiotApi;