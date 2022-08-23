import axios from "axios";
import { FormEvent, useEffect, useState } from "react"
import ContactModal from "../../components/Modals/ContactModal";
import { API_URL } from "../../config/config";
import { useAuthContext } from "../../contexts/AuthContext";


export default function Dashbaord() {
    const [host, setHost] = useState('')
    const [port, setPort] = useState('587')
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')

    return (
        <div className="position-relative py-4 px-3">
            <div className="contacts-heading">
                <span className="h2">Dashboard</span>
            </div>

            <hr className="hr" />

            <div className="p-4 rounded-4 border mt-4">
                <div className="fs-5 fw-bold">Server Information</div>
                <div className="container-fluid py-3">
                    <form >
                        <div className="row">
                            <div className="col-12 col-md-6 p-0 p-md-2 mb-3">
                                <label htmlFor="hostname">Host:</label>
                                <input type="text" value={host} onChange={e => setHost(e.target.value)} id="hostname" className="form-control" placeholder="mail host e.g. mail.example.com" required />
                            </div>
                            <div className="col-12 col-md-6 p-0 p-md-2 mb-3">
                                <label htmlFor="port">Port:</label>
                                <input type="number" value={port} onChange={e => setPort(e.target.value)}  id="port" className="form-control" placeholder="e.g. 587" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 p-0 p-md-2 mb-3">
                                <label htmlFor="username">User:</label>
                                <input type="text" value={username} onChange={e => setUsername(e.target.value)}  id="username" className="form-control" placeholder="e.g. account@example.com" required />
                            </div>
                            <div className="col-12 col-md-6 p-0 p-md-2 mb-3">
                                <label htmlFor="pass">Password:</label>
                                <input type="password" value={pass} onChange={e => setPass(e.target.value)}  id="pass" className="form-control" placeholder="* * * * * * * * *" required />
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary px-3">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
