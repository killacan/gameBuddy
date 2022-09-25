import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  
  
  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);
  

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
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