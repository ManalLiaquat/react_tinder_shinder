import firebase from "../../firebase";

const updateUser = (user) => {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: "UPDATE_USER",
          user: user.toJSON()
        })
      }
    });
  }
}

const removeUser = () => {
  return {
    type: "REMOVE_USER"
  }
}

export {
  updateUser,
  removeUser
}