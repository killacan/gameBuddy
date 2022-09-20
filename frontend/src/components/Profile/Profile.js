import { useSelector } from 'react-redux';
import './Profile.css'


const Profile = () => {
    const user = useSelector(state => state.session.user)

    const {_id, username, email} = user
    // console.log(user)
    // console.log(user._id)
    return(
        <>
        
        <h1> Hello this is profile</h1>
        <p>{_id}</p>
        <p>{username}</p>
        <p>{email}</p>
        

        </>
    )
}

export default Profile;