import { useSelector } from 'react-redux';
import './Profile.css'
import profile from './profile.jpg'
import { FaStar } from "react-icons/fa";
import { useState } from 'react';
import ReviewIndex from "../ReviewIndex/Reviews"


const Profile = () => {
    const user = useSelector(state => state.session.user)
    const [rating, setRating] = useState(5)
    const reviews = useSelector(state => state.session.user)
    const {_id, username, email} = user
    // console.log(user)
    // console.log(user._id)
    return(
        <>
        <div className='game-main-container'>
            <div className='user-profile-box'>
                <div className='image-box'>
                    <img id='profile-image' src={profile}/>
                </div>
                <div className='user-text-box'>
                    <div className='username-box'>
                        <h1 id='profile-username'>{username}</h1>
                    </div>
                    <div className='user-star-rating'>
                        <label >
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </label>
                    </div>
                </div>  
            </div>
            <div className='user-reviews-box'>
                <ReviewIndex reviews={reviews}/>
            </div>

        </div>
        
        {/* <h1> Hello this is profile</h1>
        <p>{_id}</p>
        <p>{username}</p>
        <p>{email}</p> */}
        </>
    )
}

export default Profile;