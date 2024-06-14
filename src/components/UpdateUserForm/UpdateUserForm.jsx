import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUserData } from "../../features/user/userSlice";
import { updateUser } from "../../utils/user";

const UpdateUserForm = ({ setIsEditMode }) => {
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
  });
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName: formState.firstName,
      lastName: formState.lastName,
    };
    const user = await updateUser(token, formData);

    const { firstName, lastName } = user.body;
    if (!firstName || !lastName) return;

    dispatch(
      updateUserData({
        firstName,
        lastName,
      })
    );
    setIsEditMode(false);
  };

  return (
    <form className="edit-user-form">
      <div className="edit-user-form-inner-container">
        <div className="input-wrapper">
          <label htmlFor="firstName">First name</label>
          <input
            type="text"
            defaultValue={user.firstName}
            id="firstName"
            onChange={handleInputChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastName">Last name</label>
          <input
            type="text"
            id="lastName"
            defaultValue={user.lastName}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="edit-user-form-inner-container">
        <button className="sign-in-button" onClick={handleSubmit}>
          Save
        </button>
        <button className="sign-in-button" onClick={() => setIsEditMode(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateUserForm;
