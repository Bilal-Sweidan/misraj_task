import { createContext, useState, useEffect } from "react";
import axios from 'axios'
import { useCookies } from 'react-cookie'


const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [cookies, removeCookies] = useCookies()
    const [user, setUser] = useState(null)
    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        const verifyCookies = async () => {
            if (!cookies.token) {
                setLoading(false)
                return null
            }
            setLoading(true)
            const { data } = await axios.post('http://localhost:3000/', {}, {
                withCredentials: true
            })
            const { account } = data
            setUser(account)
            setLoading(false)
            console.log('check the user')
        }
        verifyCookies()
    }, [cookies])

    const [isPending, setPending] = useState(false)
    async function fetch_data(e) {
        const input = e.target
        const formData = new FormData(input)
        const jsonForm = Object.fromEntries(formData.entries())
        setPending(true)
        const { data } = await axios.post('http://localhost:3000/login', jsonForm, { withCredentials: true })
            .catch(err => {
                console.log(err);
            })
        if (data.success) {
            setUser(data.account)
            console.log(data)
        }
        setPending(false)
    }

    async function logout() {
        const { data } = await axios.get('http://localhost:3000/logout', { withCredentials: true })
        if (data.success) {
            setUser(null)
        }
    }
    return (
        <UserContext.Provider value={{ user, setUser, fetch_data, logout, isPending, isLoading }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContext
// export function useUser() {
//     return useContext(UserContext)
// }

