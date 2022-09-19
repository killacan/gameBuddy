import { useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { AuthRoute } from "./components/Routes/Routes";

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage'
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';

import { getCurrentUser } from './store/session';
import WebSocketComp from "./components/WebSocketComp/WebSocketComp";


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <WebSocketComp />
      <NavBar/>
      <Switch>
        <AuthRoute exact path={"/"} component={MainPage} />
        <AuthRoute exact path={"/login"} component={LoginForm}/>
        <AuthRoute exact path={"/signup"} component={SignupForm}/>
        {/* <AuthRoute exact path={"/profile/:userId"} component={LoginForm}/>
        <AuthRoute exact path={"/games"} component={SignUpForm}/>
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
