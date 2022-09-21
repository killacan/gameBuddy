import { useState } from "react";
import axios from 'axios';

const RiotApi = () => {

    const RIOT_API_KEY = "RGAPI-84f95961-a2b7-45cc-b2c3-cf9ff92bf9cb";
    const [playerSearch, setPlayerSearch] = useState();

    function searchForPlayer(event) {
        const API_CALL_STRING = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" 
        + playerSearch + "?api_key=" + RIOT_API_KEY;

    }

    return (
        <>
        <div className="api-page">

            <h1>Hello from Riot API</h1>

            <input 
            type='text' 
            onChange={e => setPlayerSearch(e.target.value)} 
            />
            <button onClick={e => searchForPlayer(event)}>Search</button>
        </div>
        </>
    )
}

export default RiotApi;