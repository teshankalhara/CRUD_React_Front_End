import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function NavBar() {
    const { logout, isAuthenticated } = useAuth()

    const navigation = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Category", path: "/category" },
        { name: "Product", path: "/product" },
        { name: "Order", path: "/order" }
    ]

    if (!isAuthenticated) {
        navigation.push({ name: "Login", path: "/login" })
    }

    const location = useLocation()
    return (
        <nav>
            <ul style={{ listStyle: 'none' }}>
                {
                    navigation.map((link, index) => {
                        const isActive = location.pathname === link.path || (link.name === "Order" && location.pathname === "/order/create")

                        return (
                            <li key={index} className="inline-flex mx-3 my-4">
                                <Link
                                    to={link.path}
                                    style={{
                                        color: isActive ? 'red' : 'blue',
                                        textDecoration: 'none'
                                    }}>
                                    {link.name}
                                </Link>
                            </li>
                        )
                    })
                }
                {isAuthenticated &&
                    <button onClick={logout} className="mx-8 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-800 text-sm" type="button">Logout</button>
                }
            </ul>
        </nav>
    )
}

export default NavBar;
