import Vue from "vue";
import Router from "vue-router";
const Profile = () =>
  import ("@/components/User/Profile");
const Dashboard = () =>
  import ("@/components/Dashboard/Dashboard");
const Signup = () =>
  import ("@/components/User/Signup");
const Signin = () =>
  import ("@/components/User/Signin");
import AuthGuard from "./auth-guard";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      redirect: "/signin"
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      beforeEnter: AuthGuard
    },

    {
      path: "/signup",
      name: "Signup",
      component: Signup
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin
    }
  ],
  mode: "history"
});
