import { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import OrderType from "../../types/OrderType"
import axios from "axios"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

function Order() {
    const { isAuthenticated, jwtToken } = useAuth()

    const [orders, setOrders] = useState<OrderType[]>([])

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadOrders() {
        try {
            const response = await axios.get("http://localhost:9000/orders", config)
            console.log(response)
            setOrders(response.data)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(function () {
        if (isAuthenticated) {
            loadOrders()
        }
    }, [isAuthenticated])

    return (
        <>
            <NavBar />

            <div className="container mx-auto">
                <h1 className="text-4xl font-semibold mb-5 text-slate-900">Orders</h1>

                <Link to="/order/create" className="text-blue-500 mb-3">Add Order</Link>

                <table className="table min-w-full border-separate border-spacing-0 border-none text-left mt-2">
                    <thead className="bg-slate-200">
                        <tr>
                            <th className="w-[50px]">Order Id</th>
                            <th className="w-[200px]">Order Date and Time</th>
                            <th className="w-[150px]">Total Amount</th>
                            <th className="w-[100px]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            return (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.orderDateTime.toLocaleString()}</td>
                                    <td>{order.totalPrice}</td>
                                    <td></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Order
