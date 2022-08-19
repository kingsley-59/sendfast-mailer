import { useContext, createContext } from "react";


type User = {
    id: String,
    name: String,
    email: String,
    accessToken: String,
}

interface IAuthContext {
    user?: String | null,
    token?: String | null,
    setUser: (user: User) => Boolean | ErrorConstructor
}

export const AuthContext = createContext<IAuthContext | any>({})

export function AuthProvider({children}: any) {
    function setUser(user: User) {
        const { id, name, email, accessToken } = user ?? {}
        if (!user || !email || !accessToken) {
            return new Error('incomplete credentials')
        }

        try {
            localStorage.setItem('sendfast-user', JSON.stringify({id, name, email, accessToken}))
            return true;
        } catch (error: any) {
            return new Error(error?.message)
        }
    }

    const user = localStorage.getItem('sendfast-user')
    const token = user && JSON.parse(user)?.accessToken

    const value: any = {
        user,
        token,
        setUser
    }

    return (
        <AuthContext.Provider value={ value }>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext)
}