import './SessionForm.css'
import { useSelector,useDispatch } from 'react-redux'
import { editUser,fetchAllUsers } from '../../store/users'
import { useState,useEffect } from 'react'
import { clearSessionErrors, getCurrentUser, login } from '../../store/session';
const UpdateForm  = ({setShowUpdateUserModal,user}) => {

    
    
    // const user = useSelector (state=>state.session.user)
    const [updateEmail,setUpdateEmail] = useState(user.email)
    const [updateUsername,setUpdateUsername] = useState(user.username)
    const [updateRiotUsername, setUpdateRiotUsername] = useState(user.riotUsername)
    const [updatePassword, setUpdatePassword] = useState('')
    const [updateConfirmPassword, setUpdateConfirmPassword] = useState('');
    
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        let userInfo = {
          ...user,
          email: updateEmail,
          username: updateUsername,
          riotUsername: updateRiotUsername,
          password: updatePassword
        };
        let editUserInfo = await dispatch(editUser(userInfo));
        setShowUpdateUserModal(false)
        window.location.reload()
    }


  const users = useSelector(state => Object.values(state.users))

  let usernames = [];
  users.map(user => {
    usernames.push(user.updateUsername)
  })

  let emails = [];
  users.map(user => {
    emails.push(user.updateEmail)
  })

  let riotUsernames = [];
  users.map(user => {
    riotUsernames.push(user.updateRiotUsername)
  })

  const checkEmail = (updateEmail) => {
    for (let i = 0; i <=emails.length; i++){
      if (updateEmail === emails[i]){
        return true
      }
    }
    return false
  }

  const checkUsername = (updateUsername) => {
    for (let i = 0; i <= usernames.length; i++){
      if (updateUsername === usernames[i]){
        return true
      }
    }
    return false
  }

  const checkRiotUsername = (updateRiotUsername) => {
    for (let i = 0; i <= riotUsernames.length; i++ ){
      if (updateRiotUsername === riotUsernames[i] && updateRiotUsername.length > 0){
        return true
      }
    }
    return false
  }

  const checkPassword = (updatePassword) => {
    if (updatePassword.length > 0 && updatePassword.length < 6){
      return true
    }else{
      return false
    }
  }

  useEffect(()=>{
    dispatch(fetchAllUsers());
    dispatch(getCurrentUser())
  },[])

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

 return (
        <div className="updateUserForm-bg">
            <form className="updateUserForm" onSubmit={handleSubmit}>
                <h1>Update User Details</h1>
                <div className="update-info-container">
                    <label id="input-update">Email</label>
                        <input type="text"
                        value={updateEmail}
                        onChange={(e)=>setUpdateEmail(e.target.value)}
                        required
                        /> 
                    <div id="errors-signup-em">
                        {checkEmail(updateEmail) && <div id="errors-confirm-password">Email has already been taken</div>}
                    </div>
                </div>

                <div className="update-info-container">
                    <label id="input-update">Username</label>
                    <input type="text"
                    value={updateUsername}
                    onChange={(e)=>setUpdateUsername(e.target.value)}
                    required
                    />
                    <div id="errors-signup-user">
                        {checkUsername(updateUsername) && <div id="errors-confirm-password">Username has already been taken</div>}
                    </div>
                </div>

                <div className="update-info-container">
                    <label id="input-update">Riot Username</label>
                        <input type="text"
                        value={updateRiotUsername}
                        onChange={(e)=>setUpdateRiotUsername(e.target.value)}
                        />
                    <div id="errors-signup-user">
                        {checkRiotUsername(updateRiotUsername) && <div id="errors-confirm-password">Riot Username has already been taken</div>}
                    </div>
                </div>
            
                <div className="update-info-container">
                    <label id="input-update">Password</label>
                        <input type="password"
                        value={updatePassword}
                        onChange={(e)=>setUpdatePassword(e.target.value)}
                        required
                        />
                    <div id="errors-signup-pass">
                        {checkPassword(updatePassword) && <div id="errors-signup-password">Password is too short</div>}
                    </div>
                </div>

                <div className="update-info-container">
                    <label id="input-update">Confirm Password</label>
                        <input type="password"
                        value={updateConfirmPassword}
                        onChange={(e)=>setUpdateConfirmPassword(e.target.value)}
                        required
                        />
                    <div id="errors-confirm-pass">
                        {updatePassword !== updateConfirmPassword && <div id="errors-confirm-password">Confirm Password field must match</div>}
                    </div>
                </div>
                <a>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <input
                    id="update-submit"
                    type="submit"
                    value="Update"
                    disabled={!updateEmail || !updateUsername || !updatePassword || updatePassword !== updateConfirmPassword}
                    />
                </a>
            </form>
        </div>
    )
}

export default UpdateForm;