import { useState } from "react"
import NavBar from "../../components/NavBar"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";

function Login() {
    const {login} = useAuth()

    const navigate=useNavigate()

    const [username,setUsername]=useState<string>("")
    const [password,setPassword]=useState<string>("")
    const [error,setError]=useState<string>("")

    async function submit(event:any){
        event.preventDefault()//disable default form submission

        if(username===""||password===""){//validate
            setError("Username and Password are required!!")
        }

        const data={
            username:username,
            password:password
        }

        try{
            const response =await axios.post("http://localhost:9000/auth/login",data)
            //console.log(response)
            login(response.data)
            navigate("/")
        }catch(error){
            setError("There was an error logging in")
        }
    }
    
    return (
        <>
            <NavBar />
            <div className="container mx-auto p-10">
                <div className="max-w-[600px] p-8 shadow-xl rounded-lg mx-auto">
                    <div className="text-center mb-5">
                        <h1 className="text-2xl font-semibold">Login</h1>
                    </div>

                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label className="block">Username</label>
                            <input type="text" onChange={function(event){
                                setUsername(event.target.value)
                                setError("")
                            }} className="block w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter your username" />
                        </div>

                        <div className="mb-4">
                            <label className="block">Password</label>
                            <input type="password" onChange={function(event){
                                setPassword(event.target.value)
                                setError("")
                            }} className="block w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter your password" />
                        </div>

                        {error&&<div className="text-sm text-red-500">{error}</div>}

                        <div className="mt-8">
                            <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full hover:bg-slate-700">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login