import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

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
      password
    };

    dispatch(signup(user)); 
  }

  return (

    <div className="signup-container">
      <div id="signup-background"></div>
      <form className="signup-form" onSubmit={usernameSubmit}>
        <h2 id="signup-title">Sign Up</h2>
        <div className="signup-info-container">
          <input type="text"
            value={email}
            onChange={update('email')}
            required
            /> 
          <label id="input-signup">Email</label>
        </div>
        <div id="errors-signup-em">
          <div id="errors-signup-email">{errors?.email}</div>
        </div>

        <div className="signup-info-container">
          <input type="text"
            value={username}
            onChange={update('username')}
            required
            />
          <label id="input-signup">Username</label>
        </div>
        <div id="errors-signup-user">
          <div id="errors-signup-username">{errors?.username}</div>
        </div>

        <div className="signup-info-container">
          <input type="password"
            value={password}
            onChange={update('password')}
            required
            />
          <label id="input-signup">Password</label>
        </div>
        <div id="errors-signup-pass">
          <div id="errors-signup-password">{errors?.password}</div>
        </div>


        <div className="signup-info-container">
          <input type="password"
            value={password2}
            onChange={update('password2')}
            required
            />
          <label id="input-signup">Confirm Password</label>
        </div>
        <div id="errors-confirm-pass">
          {password !== password2 && <div id="errors-confirm-password">Confirm Password field must match</div>}
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
  );
}

export default SignupForm;