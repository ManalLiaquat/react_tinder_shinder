import firebase from "../../Config/firebase";

const isUser = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user.displayName + " | " + user.email);
    } else {
      localStorage.setItem("user", null);
    }
  });
};

export default isUser;
