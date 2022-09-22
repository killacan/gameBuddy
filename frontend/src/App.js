import { useEffect, useState } from "react";
import { Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import Profile from "./components/Profile/Profile";
import Rooms from "./components/Rooms/Rooms";
import RiotApi from "./components/RiotApi/RiotApi";

import MainPage from './components/MainPage/MainPage'
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Games from "./components/Games/Games";
import { getCurrentUser } from './store/session';
import WebSocketComp from "./components/WebSocketComp/WebSocketComp";

import GameRoom from "./components/GameRoom/GameRoom";


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);


  // window.jwtFetch = jwtFetch;

  return loaded && (
    <>
      <NavBar/>
      <Switch>
        <AuthRoute exact path={"/"} component={MainPage}/>
        <AuthRoute exact path={"/signup"} component={SignupForm}/>
        <AuthRoute exact path={"/login"} component={LoginForm}/>
        <ProtectedRoute exact path={"/games"} component={Games}/>
        <ProtectedRoute exact path={"/profile"} component={Profile} />
        <ProtectedRoute exact path={"/games/rooms"} component={Rooms}/>
        <ProtectedRoute exact path={"/games/rooms/:roomId"} component={GameRoom} />
        <ProtectedRoute exact path={"/riotapi"} component={RiotApi} />

        <Redirect to="/"/>
        
        {/* 
        <AuthRoute exact path={"/games/rooms"} component={LoginForm}/>
        <AuthRoute exact path={"/games/rooms/valorant"} component={SignUpForm}/>
        <AuthRoute exact path={"/games/rooms/leagueoflegends"} component={SignUpForm}/>
        <AuthRoute exact path={"/games/rooms/tft"} component={SignUpForm}/>
        <AuthRoute exact path={"/games/rooms/valorant/:roomId"} component={SignUpForm}/>
        <AuthRoute exact path={"/games/rooms/leagueoflegends/:roomId"} component={SignUpForm}/>
        <AuthRoute exact path={"/games/rooms/tft/:roomId"} component={SignUpForm}/> */}
      </Switch>
      {/* <Footer/> */}
    </>
  );
}

export default App;
