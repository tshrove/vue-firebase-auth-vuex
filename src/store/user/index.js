import * as firebase from "firebase";
import "firebase/firestore";

export default {
  state: {
    user: null,
    settings: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setSettings(state, payload) {
      state.settings = payload;
    }
  },
  actions: {
    signUserUp({
      commit
    }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    signUserIn({
      commit
    }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit("setLoading", false);
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            };
            commit("setUser", newUser);
          }
        )
        .catch(
          error => {
            commit("setLoading", false);
            commit("setError", error);
            console.log(error);
          }
        );
    },
    signUserInGoogle({
      commit
    }) {
      commit("setLoading", true);
      commit("clearError");
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(
          user => {
            commit("setLoading", false);
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            };
            commit("setUser", newUser);
          }
        )
        .catch(
          error => {
            commit("setLoading", false);
            commit("setError", error);
            console.log(error);
          }
        );
    },
    signUserInFacebook({
      commit
    }) {
      commit("setLoading", true);
      commit("clearError");
      firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(
          user => {
            commit("setLoading", false);
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            };
            commit("setUser", newUser);
          }
        )
        .catch(
          error => {
            commit("setLoading", false);
            commit("setError", error);
            console.log(error);
          }
        );
    },
    signUserInGithub({
      commit
    }) {
      commit("setLoading", true);
      commit("clearError");
      firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
        .then(
          user => {
            commit("setLoading", false);
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            };
            commit("setUser", newUser);
          }
        )
        .catch(
          error => {
            commit("setLoading", false);
            commit("setError", error);
            console.log(error);
          }
        );
    },
    signUserInTwitter({
      commit
    }) {
      commit("setLoading", true);
      commit("clearError");
      firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then(
          user => {
            commit("setLoading", false);
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            };
            commit("setUser", newUser);
          }
        )
        .catch(
          error => {
            commit("setLoading", false);
            commit("setError", error);
            console.log(error);
          }
        );
    },
    autoSignIn({
      commit
    }, payload) {
      commit("setUser", {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL
      });
    },
    logout({
      commit
    }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
    saveSettings({
      commit
    }, payload) {
      commit("setLoading", true);
      commit("clearError");
      if (payload.url != null && payload.username != null && payload.password != null) {
        var db = firebase.firestore();
        db.collection("settings").doc(this.getters.user.id).set({
            url: payload.url,
            username: payload.username,
            password: payload.password
          })
          .then(function () {
            commit("setLoading", false);
            commit("clearError");
          })
          .catch(
            error => {
              commit("setLoading", false);
              commit("setError", error);
              console.log(error);
            }
          );
      }
    },
    loadSettings({
      commit
    }) {
      commit("setLoading", true);
      commit("clearError");
      // get the user's id
      var userId = this.getters.user.id;
      // get the firestore instance.
      var db = firebase.firestore();
      // get the settings form the firestore.
      var docRef = db.collection("settings").doc(userId);
      docRef.get().then(function (doc) {
        if (doc.exists) {
          var data = doc.data();
          console.log("Document data:", data);
          // save the data to the settings object.
          commit("setSettings", {
            url: data.url,
            username: data.username,
          });
        }
        commit("setLoading", false);
        commit("clearError");
      }).catch(
        error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        }
      );
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    settings(state) {
      return state.settings;
    }
  }
};
