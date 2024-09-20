import { useState } from "react"
import Vehicle from "../components/Vehicle"
import NavBar from "../components/NavBar"
import { useAuth } from "../context/AuthContext"

function Home() {
    //hook-use state
    //var_type [var_name, function-use state change]=...<data_type>(initial_val)
    const [username, setUsername] = useState<string>("")
    const [count, setCount] = useState(0)

    function handleInputChange(event: any) {
        setUsername(event.target.value)
    }

    function increaseCount() {
        setCount(count + 1)
    }

    return (
        <>
            <NavBar />
            <div className="container mx-auto">
                <h2 className="text-xl font-semibold mb-2">Hello {username}</h2>

                <div className="container mx-auto">
                    <label>Enter username: </label>
                    <input className="text-slate-600 font-sm block mb-2 p-2 border border-slate-300 rounded-lg mb-4" type='text' onChange={handleInputChange} />
                </div>

                <div className="container mx-auto">
                    <h1 className="mb-1">Count: {count}</h1>
                    <button onClick={increaseCount} className="mb-5 py-3 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-700 text-sm">Increase</button>
                </div>
                
                {
                    /*
                    <Vehicle title="BMW" description="M3GTR" />
                    <Vehicle title="TOYOTA" description="COROLLA" />
                    */
                }
            </div>
        </>
    )
}

export default Home