import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'
import { API_URL } from "../config/config";
import { Input } from "../custom/components";
import DefaultLayout from "../Layouts/DefaultLayout";

export default function Login() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loading, setLoading] = useState(false)

    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setLoading(true)

        if (password !== confirm) {
            setErrMsg('passwords do not match!')
            setTimeout(() => setErrMsg(''), 5000)
            setLoading(false)
            return
        }
        try {
            let payload = {
                name, email, password
            }
            console.log(payload)
            let res = await axios.post(`${API_URL}/auth/signup`, payload)
            if (res.data.status === 'success') {
                setLoading(false)
                navigate('/')
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
        
        console.log(email, password)
        
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
                        Signup
                    </div>
                    <form >
                        <div className="form-group mb-3">
                            <Input type="text" value={name} onChange={e => setName(e.target.value)} placeholder='full name' required/>
                        </div>
                        <div className="form-group mb-3">
                            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='email' required/>
                        </div>
                        <div className="form-group mb-3">
                            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='password' required/>
                        </div>
                        <div className="form-group mb-3">
                            <Input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder='confirm password' required/>
                        </div>
                        <div className="form-group text-center mb-3">
                            <input type="submit" value={loading ? 'submitting...' : 'Signup'} className="btn btn-primary" />
                        </div>
                    </form>
                    <div className="text-center">
                        <a href="">
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
