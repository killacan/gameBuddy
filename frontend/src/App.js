import { useEffect, useState } from "react";
import { Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
// import NavBar from './components/NavBar/NavBar';

import MainPage from './components/MainPage/MainPage'
import LoginForm from './components/SessionForms/LoginForm';
import SignupForm from './components/SessionForms/SignupForm';

import { getCurrentUser } from './store/session';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      {/* <NavBar/> */}
      <Switch>
        <AuthRoute exact path={"/"}>
          <MainPage/>
        </AuthRoute>
        <AuthRoute exact path={"/login"}>
          <LoginForm/>
        </AuthRoute>
        <AuthRoute exact path={"/signup"}>
            <SignupForm/>
        </AuthRoute>
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
