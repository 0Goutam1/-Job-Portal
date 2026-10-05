import Login from './features/auth/ui/pages/Login'
import Register from './features/auth/ui/pages/Register'
import VerifyOTP from './features/auth/ui/pages/VerifyOTP'
import { createBrowserRouter } from 'react-router'
import { Layout, Dashboard } from './AppLayout'
import Home from './features/home/ui/Home'
import Jobs from './features/job/ui/Jobs'
import JobDetails from './features/job/ui/JobDetails'
import Profile from './features/user/ui/Profile'
import CompanyManagement from './features/recruiter/ui/company/CompanyManagement'
import MyJobs from './features/recruiter/ui/jobs/MyJobs'
import UserDashboard from './features/user/ui/UserDashboard'
export const router = createBrowserRouter([
 {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home/>,
      },{
        path:"jobs",
        element:<Jobs/>
      },{
        path:"jobs/:jobId",
        element:<JobDetails/>
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },{
        path: "verify-otp",
        element: <VerifyOTP />,
      },{
        path:"myjobs",
        element:<MyJobs/>
      },

      {
        path: "company",
        element: <CompanyManagement/>,
      },
      { path: "dashboard", element: <Dashboard /> },

      
      { path: "profile", element: <Profile /> },


        { path: "UserDashboard", element: <UserDashboard /> },

    ],
  },
]);

