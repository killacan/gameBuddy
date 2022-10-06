import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { fetchAllUsers } from '../../store/users';
import { useHistory } from "react-router-dom";

import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
  
  useEffect(()=>{
    dispatch(fetchAllUsers());
  },[])
  
  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const checkLogin = (email) => {
    let hitSomething = false
    for (let i = 0; i <= emails.length; i++){
      if (email === emails[i]){
        hitSomething = true
        dispatch(login({email, password}))
      }
    }
    if (!hitSomething){
      document.getElementById("errors-login-em").style.display = "flex"
      setTimeout(function(){
        document.getElementById("errors-login-em").style.display = "none"
      }, 3000)
    }
  }

  const checkPassword = (password) => {
    if (password.length > 0 && password.length < 6){
      return true
    }else{
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    checkLogin(email)
  }
  
  const demoUser = (e) => {
    e.preventDefault();
    dispatch(login({
      email: "admin@admin.com",
      password: "admin123"
    }))
  }

  const signUpPage = (e) => {
    e.preventDefault();
    history.push('/signup')
  }

  return (
    <div className='background-login'>
    <div className="login-container">
      <div id="login-background">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 id="login-title">Login</h2>
          <div className="email-username-container">
            <div id="errors-login-em">
              <div id="errors-confirm-password">Invalid Login Credentials</div>
            </div>
            <br></br>
            <label id="input-login">Email</label>
            <br></br>
            <input type="text"
              id="email-input"
              value={email}
              onChange={update('email')}
              required
              />
          </div>
          <div id="errors-em">
            <div id="errors-email">{errors?.email}</div>
          </div>
          <div className="email-username-container">
            <label id="input-login">Password</label>
            <input 
              id="password-input"
              type="password"
              value={password}
              onChange={update('password')}
              required
              />
              <div id="errors-signup-pass">
                {checkPassword(password) && <div id="errors-signup-password">Password is too short</div>}
              </div>
          </div>
          <div id="errors-pass">
            <div id="errors-password">{errors?.password}</div>
          </div>
          <a className='login-submit-container'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <input
              id="login-submit"
              type="submit"
              value="Log In"
              disabled={!email || !password}
            />
          </a>
          <a className='login-submit-container' onClick={demoUser}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <button onClick={demoUser} id="demo-user">Demo User</button>
          </a>
          <a className='login-submit-container' onClick={signUpPage}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <button onClick={signUpPage} id="demo-user">New to GameBuddy? <br></br> Sign Up!</button>
          </a>
        </form>
      </div>
    </div>
    </div>
  );
}

export default LoginForm;