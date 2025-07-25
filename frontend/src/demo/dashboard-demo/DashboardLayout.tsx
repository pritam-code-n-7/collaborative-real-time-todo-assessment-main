import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router"

const DashboardLayout = () => {
    const [loggedInUser, setLoggedInUser] = useState("")
    const navigate = useNavigate();

    // Handle fetch logged-in user from localstorage
    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('name') || "")
    },[])

    // Handle logout from dashboard
    const handleLogout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('_id')
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        navigate('login')
    }
  return (
    <div>
        <div className="p-2 flex flex-row items-center justify-between w-full">
        <p>Hi, {loggedInUser}</p>
        <Button onClick={handleLogout}>
            Logout
        </Button>
        </div>
        <Outlet />
    </div>
  )
}

export default DashboardLayout