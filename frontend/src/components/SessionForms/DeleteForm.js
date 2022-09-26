
import { removeUser } from "../../store/users";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";

const DeleteForm = ({setShowDeleteModal}) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)

    const handleDelete = async(e) => {
        e.preventDefault();
        dispatch(removeUser(user._id))
        dispatch(logout())
        history.push('/')
     
    }

    return (
        <div>
            <h1>Are you sure you want to delete your acc?</h1>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={()=>setShowDeleteModal(false)}>No</button>
        </div>
    )
}

export default DeleteForm;