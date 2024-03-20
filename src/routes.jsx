import LogIn from "./Login/LogIn";
import Layout from "./Component/Layout";

import { Navigate, useLocation } from "react-router-dom";
// import Landingpage from "./LandingPage/Landingpage";
// import Card1 from "./Component/Crad1";
// import Card2 from "./Component/Card2";
// import Card3 from "./Component/Card3";
// import DesignedCard from "./Component/DesignedCard";
// import PrivacyCard from "./Component/PrivacyCard";
// import FindPlanCard from "./Component/FindPlanCard.jsx";
// import DontHaveAccount from "./login/Register.jsx";
// import LandingPage from "./Landing_Page/LandingPage.jsx";
// import Header from "./Component/Header";
import Page1 from "./pages/Page1.jsx";
import Page2 from "./pages/Page2.jsx";
import Register from "./Login/Register.jsx";
// import MyProfile from "./Dashboard/Setting/pages/MyProfile";
// import MyCalendar from "./Dashboard/Setting/pages/MyCalendar";
// import MyIntegrations from "./Dashboard/Setting/pages/MyIntegrations";
// import MyVoice from "./Dashboard/Setting/pages/MyVoice";
// import Details from "./Dashboard/Setting/pages/Details";
// import Members from "./Dashboard/Setting/pages/Members";
// import Plans from "./Dashboard/Setting/pages/Plans";
// import Billing from "./Dashboard/Setting/pages/Billing";
// import Api from "./ApiIntegration/Api";



const CheckRoute = () => {
//   const isAuthenticate = sessionStorage.getItem("LoginToken")
//   console.log("isAuthenticate==>", isAuthenticate);

  const location = useLocation()
  console.log("location", location.pathname);

  // console.log("condn==>",isAuthenticate, ["/donthaveaccount"].includes(location?.pathname));
  const AppRoutes = [
    //   {
    //   path: "/",
    //   element: <LandingPage />,
    // },
    // {
    //   path: "/",
    //   element: isAuthenticate && ["/"].includes(location?.pathname) ? <Navigate to="/dashboard" /> : <LandingPage />,
    // },
    {
      // path: "/login",
      path: "/",
      element: <LogIn/>
    //   element: isAuthenticate && ["/login"].includes(location?.pathname) ? <Navigate to="/dashboard" /> : <LogIn />,

    },
    {
      path: "/Register",
      element: <Register/>
    //   element: isAuthenticate && ["/donthaveaccount"].includes(location?.pathname) ? <Navigate to="/dashboard" /> : <DontHaveAccount />,
    },

    {
      path: "/",
      element: <Layout />,
    //   element: isAuthenticate ?
        // <Layout /> : <Navigate to="/" />,
      children: [
        {
            path: "/Page1",
            element: <Page1/>
        },
        {
            path: "/Pages2",
            element: <Page2/>
        },
     
        // {
        //   path: "/Header",
        //   exact: true,
        //   element: <Header />
        // },
       
      ]

    },
  ];

  return AppRoutes

}

export default CheckRoute;