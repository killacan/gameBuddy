import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { fetchAllUsers } from '../../store/users';

import { login, clearSessionErrors } from '../../store/session';
// import { Redirect } from 'react-router-dom';

function LoginForm () {
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
  
  const checkEmail = (email) => {
    for (let i = 0; i <=emails.length; i++){
      if (email === emails[i]){
        return true
      }
    }
    return false
  }

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      dispatch(login({ email, password })); 
    }catch (err){
      const resBody = err;
      if (resBody.statusCode === 400){
        showInvalid()
      }
    }
  }
  const showInvalid = () => {
    document.getElementById("errors-login-em").style.display = "block"
  }

  const demoUser = (e) => {
    e.preventDefault();
    dispatch(login({
      email: "admin@admin.com",
      password: "admin123"
    }))
  }

  return (
    <div className="login-container">
      <div id="login-background">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 id="login-title">Login</h2>
          <div className="email-username-container">
            <label id="input-login">Email or Username</label>
            <input type="text"
              id="email-input"
              value={email}
              onChange={update('email')}
              required
              />
              <div id="errors-login-em">
                <div id="errors-confirm-password">Invalid Login Credentials</div>
              </div>
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
        </form>
      </div>
    </div>
  );
}

export default LoginForm;