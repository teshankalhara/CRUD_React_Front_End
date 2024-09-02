import { Link, useLocation } from "react-router-dom"

function NavBar() {
    const navigation = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Category", path: "/category" },
        { name: "Product", path: "/product" },
        { name: "Order", path: "/order"}
    ]
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
            </ul>
        </nav>
    )
}

export default NavBar;
