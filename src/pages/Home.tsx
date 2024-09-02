import { useState } from "react"
import Vehicle from "../components/Vehicle"
import NavBar from "../components/NavBar"

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
            <div>
                <h1>Home</h1>

                <h2>Hello {username}</h2>

                <label>Enter username: </label>
                <input type='text' onChange={handleInputChange} />

                <h1>Count: {count}</h1>
                <button onClick={increaseCount}>Increase</button>

                <Vehicle title="BMW" description="M3GTR" />
                <Vehicle title="TOYOTA" description="COROLLA" />
            </div>
        </>
    )
}

export default Home