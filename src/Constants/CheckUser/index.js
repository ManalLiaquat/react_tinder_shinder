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

const User = JSON.parse(localStorage.getItem("user"));


export { isUser, User };
