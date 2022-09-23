import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';
import { fetchAllUsers } from '../../store/users';
// import { set } from 'mongoose';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [riotUsername, setRiotUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  const users = useSelector(state => Object.values(state.users))

  let usernames = [];
  users.map(user => {
    usernames.push(user.username)
  })

  let emails = [];
  users.map(user => {
    emails.push(user.email)
  })

  let riotUsernames = [];
  users.map(user => {
    riotUsernames.push(user.riotUsername)
  })

  const checkEmail = (email) => {
    for (let i = 0; i <=emails.length; i++){
      if (email === emails[i]){
        return true
      }
    }
    return false
  }

  const checkUsername = (username) => {
    for (let i = 0; i <= usernames.length; i++){
      if (username === usernames[i]){
        return true
      }
    }
    return false
  }

  const checkRiotUsername = (riotUsername) => {
    for (let i = 0; i <= riotUsernames.length; i++ ){
      if (riotUsername === riotUsernames[i]){
        return true
      }
    }
    return false
  }

  useEffect(()=>{
    dispatch(fetchAllUsers());
  },[])

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'riotUsername':
        setState = setRiotUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const usernameSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      riotUsername,
      password
    };

    dispatch(signup(user)); 
  }

  return (

    <div className="signup-container">
      <div id="signup-background">
        <form className="signup-form" onSubmit={usernameSubmit}>
          <h2 id="signup-title">Sign Up</h2>

          <div className="signup-info-container">
          <label id="input-signup">Email</label>
            <input type="text"
              value={email}
              onChange={update('email')}
              required
              /> 
          <div id="errors-signup-em">
            {checkEmail(email) && <div id="errors-confirm-password">Email has already been taken</div>}
          </div>
          </div>

          <div className="signup-info-container">
            <label id="input-signup">Username</label>
            <input type="text"
              value={username}
              onChange={update('username')}
              required
              />
          <div id="errors-signup-user">
            {checkUsername(username) && <div id="errors-confirm-password">Username has already been taken</div>}
          </div>
          </div>

          <div className="signup-info-container">
          <label id="input-signup">Riot Username</label>
            <input type="text"
              value={riotUsername}
              onChange={update('riotUsername')}
              />
          <div id="errors-signup-user">
            {checkRiotUsername(riotUsername) && <div id="errors-confirm-password">Riot Username has already been taken</div>}
          </div>
          </div>
      
          <div className="signup-info-container">
            <label id="input-signup">Password</label>
            <input type="password"
              value={password}
              onChange={update('password')}
              required
              />
          <div id="errors-signup-pass">
            {password.length < 6 && <div id="errors-signup-password">Password is too short</div>}
          </div>
          </div>

          <div className="signup-info-container">
            <label id="input-signup">Confirm Password</label>
            <input type="password"
              value={password2}
              onChange={update('password2')}
              required
              />
          <div id="errors-confirm-pass">
            {password !== password2 && <div id="errors-confirm-password">Confirm Password field must match</div>}
          </div>
          </div>
          <a>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <input
              id="signup-submit"
              type="submit"
              value="Sign Up"
              disabled={!email || !username || !password || password !== password2}
            />
          </a>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;