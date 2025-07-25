import { Navigate,Outlet,Route, Routes } from "react-router";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { Toaster } from "./components/ui/sonner";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./demo/dashboard-demo/DashboardLayout";

const App = () => {
  const isAuthenticated = ()=>{
    return !!localStorage.getItem('token')
  }

  const PrivateRoute = ()=>{
    return isAuthenticated() ? <Outlet /> : <Navigate to={'/login'}/>
  }

  const PublicRoute = ()=>{
    return !isAuthenticated() ? <Outlet /> : <Navigate to={'/dashboard'}/>
  }
  return (
    <div>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/" element={<Navigate to="/login"/>} />
        </Route>

        {/* Protected routes using private route */}
         <Route element={<PrivateRoute />}>
         <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App