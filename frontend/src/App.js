import { useEffect, useState } from "react";
import { Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import Profile from "./components/Profile/Profile";
import RoomsIndex from "./components/Rooms/RoomsIndex";
import MainPage from './components/MainPage/MainPage'
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';
import Games from "./components/Games/Games";
import { getCurrentUser } from './store/session';
import WebSocketComp from "./components/WebSocketComp/WebSocketComp";
import UpdateForm from "./components/SessionForms/UpdateForm";
import { Route } from "react-router-dom";
import GameRoom from "./components/GameRoom/GameRoom";


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar/>
      <Switch>
        <AuthRoute exact path={"/"} component={MainPage}/>
        <AuthRoute exact path={"/signup"} component={SignupForm}/>
        <AuthRoute exact path={"/login"} component={LoginForm}/>
        <ProtectedRoute exact path={"/games"} component={Games}/>
        <ProtectedRoute exact path={"/profile/:userId"} component={Profile}/>
        <ProtectedRoute exact path={"/games/rooms"} component={RoomsIndex}/>
        <ProtectedRoute exact path={"/games/rooms/:roomId"} component={GameRoom} />
        <ProtectedRoute exact path={"/profile/:userId/update"} component={UpdateForm}/>
        <Redirect to="/"/>
        
      </Switch>
    </>
  );
}

export default App;
