import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';
import { Redirect } from 'react-router-dom';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  const sessionUser = useSelector(state=>state.session.user)
  
  
  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);
  
  // if (sessionUser) return <Redirect to="/games" />;

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }
  

  return (
    <div className="login-container">
      <div id="login-background"></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 id="login-title">Login</h2>
        <div className="email-username-container">
          <input type="text"
            id="email-input"
            value={email}
            onChange={update('email')}
            required
            />
          <label id="input-login">Email or Username</label>
        </div>
        <div id="errors-em">
          <div id="errors-email">{errors?.email}</div>
        </div>
        <div className="email-username-container">
          <input 
            id="password-input"
            type="password"
            value={password}
            onChange={update('password')}
            required
            />
            <label id="input-login">Password</label>
        </div>
        <div id="errors-pass">
          <div id="errors-password">{errors?.password}</div>
        </div>
        <a>
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
      </form>
    </div>
  );
}

export default LoginForm;