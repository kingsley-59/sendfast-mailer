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

    function saveContacts(contacts: any | Array<any>) {
        if (!contacts || contacts.length < 1) {
            throw new Error('Invalid contacts data')
        }

        try {
            localStorage.setItem('contacts', JSON.stringify(contacts))
            return true
        } catch (error: any) {
            return new Error(error?.message)
        }
    }

    const value: any = {
        setUser,
        saveContacts
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