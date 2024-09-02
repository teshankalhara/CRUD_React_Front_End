import { useEffect, useState } from "react"
import NavBar from "../../components/NavBar"
import ProductType from "../../types/ProductType"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function CreateOrder() {
    const [products, setProducts] = useState<ProductType[]>([])

    async function loadProduct() {
        try {
            const response = await axios.get("http://localhost:9000/products")
            console.log(response)
            setProducts(response.data)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadProduct()
    }, [])

    const [orderedProduct, setOrderedProduct] = useState<ProductType[]>([])
    const [total, setTotal] = useState<number>(0)

    function addProductOrder(product: ProductType) {
        const updatedOrder = [...orderedProduct, product]
        setOrderedProduct(updatedOrder)
        console.log(orderedProduct)
    }

    //run this side effect whenever orderProducts state changes
    useEffect(() => {
        orderedProduct.map((product) => {
            const totalPrice = total + product.price
            setTotal(totalPrice)
        })
    }, [orderedProduct])

    const navigate = useNavigate()

    async function saveOrder() {
        let productIds: any = []
        orderedProduct.map((product) => {
            productIds.push(product.id)
        })

        try {
            await axios.post("http://localhost:9000/orders", { productIds: productIds })
            navigate("/order")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <NavBar />
            
            <div className="container mx-auto">
                <div className="flex">
                    <div className="w-[400px] border-r border-slate-100 p-2">
                        <div className="text-2xl font-semibold text-slate-800 bloc h-[40px] p-2 mb-3">Products</div>
                        <div>
                            {
                                products.map((product) => {
                                    return (
                                        <div key={product.id} onClick={() => { addProductOrder(product) }} className="border border-slate-200 rounded-lg p-2 mb-2 hover:bg-slate-200">
                                            <div className="text-lg font-semibold text-slate-800">{product.name}</div>
                                            <div className="text-sm text-slate-400">{product.category.name}</div>
                                            <div className="text-sm text-green-400 text-right">LKR {product.price}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="p-2">
                        <div className="text-2xl font-semibold text-slate-800 bloc h-[40px] p-2 mb-3">New order</div>
                        <table className="w-full border-separate border-spacing-0 border-none text-left">
                            <thead>
                                <tr className="bg-slate-400">
                                    <th className="w-[25px]">ID</th>
                                    <th className="w-[150px]">Name</th>
                                    <th className="w-[220px]">Description</th>
                                    <th className="w-[100px] text-right">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderedProduct.map((product, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="">{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.description}</td>
                                                <td className="text-right">{product.price}</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr>
                                    <td colSpan={3}>
                                        <strong>Total</strong>
                                    </td>
                                    <td className="border-t border-slate-500 text-right">
                                        <strong>{total}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-5">
                            <button onClick={saveOrder} type="button" className="py-3 px-4 bg-slate-700 text-white rounded-lg hover:bg-slate-900">
                                Save Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateOrder