import axios from "axios";
import React, { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { API_URL } from "../config/config";
import { AuthContext } from "../contexts/AuthContext";
import { Input } from "../custom/components";
import DefaultLayout from "../Layouts/DefaultLayout";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setLoading(true)
        setErrMsg('')

        try {
            let payload = {
                email, password
            }
            console.log('Payload: ', payload)
            let res = await axios.post(`${API_URL}/auth/login`, payload)
            if (res.data.status === 'success') {
                let { data } = res.data
                localStorage.setItem('user', data.user)
                localStorage.setItem('token', data.accessToken)
                console.log(data?.accessToken)
                setLoading(false)
                navigate('/dashboard')
            } else {
                setErrMsg(res.data.message)
                setLoading(false)
                return
            }
        } catch (error: any) {
            console.error(error?.message)
            setErrMsg(error?.message)
            setLoading(false)
        }
        
        return;
    }

    return (
        <DefaultLayout>
            <Body>
                <FormCard onSubmit={handleSubmit} className="p-5 shadow-sm m-auto my-5">
                    {
                        errMsg && (
                            <div className="container bg-danger bg-opacity-50 p-3 rounded-3">{errMsg}</div>
                        )
                    }
                    <div className="h3 fw-bold text-center my-3">
                        Login
                    </div>
                    <form >
                        <div className="form-group mb-3">
                            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='email' required/>
                        </div>
                        <div className="form-group mb-3">
                            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='password' required/>
                        </div>
                        <div className="form-group text-center mb-3">
                            <input type="submit" value={loading ? 'submitting...' : 'Login'} className="btn btn-primary" />
                        </div>
                    </form>
                    <div className="text-center">
                        <a href="/login">
                            <span className="text-dark">Forgot password? Click to reset</span>
                        </a>
                    </div>
                </FormCard>
            </Body>
        </DefaultLayout>
    )
}


const Body = styled.div`
    width: 100%;
    min-height: 60vh;
    height: auto;
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
`
const FormCard = styled.div`
    background-color: #fff;
    border-radius: 15px;
    width: 100%;
    max-width: 450px;
`