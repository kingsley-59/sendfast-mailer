import { NavLink, Route, Routes } from "react-router-dom"
import Contacts from "../pages/Dasboard/Contacts"
import Dashboard from "../pages/Dasboard/Dashboard"
import Messages from "../pages/Dasboard/Messages"


function SideBar() {
    return (
        <div className="d-flex flex-column h-100">
            <div className="logo-container h2 py-3 px-2 m-0">
                <span className="site-name">SendFast Mailer</span>
            </div>
            <hr className="p-0 m-2" />
            <div className="bg-light fw-bolder text-secondary text-center rounded-3 p-2 my-3">
                New Message <i className="bi bi-plus fw-bolder"></i>
            </div>
            <div className="d-flex flex-column gap-3 p-2 ">
                <NavLink to="/dashboard">
                    <div role={'button'} className="row">
                        <i className="bi bi-house-fill col-auto"></i>
                        <span className="col-auto">Dashboard</span>
                    </div>
                </NavLink>
                <NavLink to="/dashboard/contacts">
                    <div role={'button'} className="row">
                        <i className="bi bi-person-lines-fill col-auto"></i>
                        <span className="col-auto">Contacts</span>
                    </div>
                </NavLink>
                <NavLink to="/dashboard/messages">
                    <div role={'button'} className="row">
                        <i className="bi bi-send-check-fill col-auto"></i>
                        <span className="col-auto">Messages</span>
                    </div>
                </NavLink>
                <NavLink to="/dashboard/settings">
                <div role={'button'} className="row">
                    <i className="bi bi-gear-fill col-auto"></i>
                    <span className="col-auto">Settings</span>
                </div>
                </NavLink>
            </div>
            {/* <div className="bg-light text-secondary p-2 my-auto rounded-3 shadow">
                
            </div> */}
        </div>
    )
}

export default function DashboardLayout({children} : any) {


    return (
        <div className="container-fluid">
            <div className="row vh-100 p-0">
                <div className="d-none d-sm-block col-sm-3 col-md-2 bg-secondary text-light h-100">
                    <SideBar />
                </div>
                <div className="col-12 col-sm-9 col-md-10 bg-light min-vh-100">
                    {/* { children } */}
                    <Routes>
                        <Route path="" element={<Dashboard />} />
                        <Route path="contacts" element={<Contacts />} />
                        <Route path="messages" element={<Messages />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
