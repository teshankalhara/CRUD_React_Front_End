import axios from "axios"
import NavBar from "../components/NavBar"
import { useEffect, useState } from "react"
import ProductType from "../types/ProductType"
import CategoryType from "../types/CategoryType"
import { useAuth } from "../context/AuthContext"

function Product() {
    const { isAuthenticated, jwtToken } = useAuth()

    const [products, setProduct] = useState<ProductType[]>([])
    const [productName, setProductName] = useState<string>("")
    const [productPrice, setProductPrice] = useState<number>(0.0)
    const [productDescription, setProductDescription] = useState<string>("")
    const [categoryId, setCategoryId] = useState<number>()

    const [categories, setCategories] = useState<CategoryType[]>([])

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    async function loadProducts() {
        const response = await axios.get("http://localhost:9000/products", config)
        setProduct(response.data)
    }

    async function loadCategories() {
        const response = await axios.get("http://localhost:9000/categories", config)
        console.log(response)
        setCategories(response.data)
    }

    useEffect(function () {
        if (isAuthenticated) {
            loadProducts()
            loadCategories()
        }
    }, [isAuthenticated])

    function handleProductName(event: any) {
        setProductName(event.target.value)
    }

    function handleProductPrice(event: any) {
        setProductPrice(event.target.value)
    }

    function handleProductDescription(event: any) {
        setProductDescription(event.target.value)
    }

    function handleProductCategoryId(event: any) {
        setCategoryId(event.target.value)
    }

    function clearSet() {
        setProductName("")
        setProductDescription("")
        setProductPrice(0.0)
        setCategoryId(0)
    }

    async function handleSubmit() {
        const data = {
            name: productName,
            price: productPrice,
            description: productDescription,
            categoryId: categoryId
        }
        try {
            const response = await axios.post("http://localhost:9000/products", data)
            console.log(response)
            loadProducts()
            clearSet()
        } catch (error: any) {
            console.log(error)
        }
    }

    const [productEditing, setProductEditing] = useState<ProductType | null>()

    function editProduct(product: ProductType) {
        setProductEditing(product)
        setProductName(product.name)
        setProductPrice(product.price)
        setProductDescription(product.description)
        setCategoryId(product.category?.id)

    }

    async function updateProduct() {
        const data = {
            name: productName,
            price: productPrice,
            description: productDescription,
            categoryId: categoryId
        }
        try {
            const response = await axios.put(`http://localhost:9000/products/${productEditing?.id}`, data)
            console.log(response)
            loadProducts()
            clearSet()
            setProductEditing(null)
        } catch (error: any) {
            console.log(error)
        }
    }

    async function deleteProduct(productId: number) {
        try {
            await axios.delete(`http://localhost:9000/products/${productId}`)
            loadProducts()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <NavBar />
            <div className="container mx-auto">
                <h1 className="text-4xl font-semibold mb-5 text-slate-900">Products</h1>

                <table className="table min-w-full border-separate border-spacing-0 border-none text-left">
                    <thead className="bg-slate-200">
                        <tr>
                            <th className="w-[50px]">Product Id</th>
                            <th className="w-[150px]">Product Name</th>
                            <th className="w-[150px]">Product Price</th>
                            <th className="w-[120px]">Product Category</th>
                            <th className="w-[50px]">Category ID</th>
                            <th className="w-[100px]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category.name}</td>
                                    <td>{product.category.id}</td>
                                    <td>
                                        <button onClick={() => editProduct(product)} className="bg-slate-200 text-slate-600 px-2 py-1 rounded-lg hover:bg-slate-400 mx-1">
                                            Edit
                                        </button>
                                        <button onClick={() => deleteProduct(product.id)} className="bg-red-200 text-red-600 px-2 py-1 rounded-lg hover:bg-slate-400 mx-1">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <h2 className="text-xl text-slate-900 font-medium mb-3 mt-5">Create Product</h2>
                <div className="border border-slate-200 py-3 rounded-lg max-w-[350px] center px-2 mb-2">
                    <form>
                        <div>
                            <label className="text-slate-600 font-sm block mb-2">Product Name:</label>
                            <input className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg" type="text"
                                onChange={handleProductName} value={productName} required />
                        </div>
                        <div>
                            <label className="text-slate-600 font-sm block mb-2">Product Description:</label>
                            <input className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg" type="text"
                                onChange={handleProductDescription} value={productDescription} required />
                        </div>
                        <div>
                            <label className="text-slate-600 font-sm block mb-2">Product Price:</label>
                            <input className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg" type="text"
                                onChange={handleProductPrice} value={productPrice} required />
                        </div>
                        <div>
                            <label className="text-slate-600 font-sm block mb-2">Category :</label>
                            <select className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg"
                                onChange={handleProductCategoryId} value={categoryId} required>
                                <option value="">Please Select category</option>
                                {categories.map((category) => {
                                    return (
                                        <option value={category.id} key={category.id}>{category.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {productEditing ? (
                            <>
                                <button className="py-3 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-700 text-sm" type="button" onClick={updateProduct}>
                                    Update Product
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="py-3 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-700 text-sm" type="button" onClick={handleSubmit}>
                                    Create Product
                                </button>
                            </>
                        )}

                    </form>
                </div>
            </div>
        </>
    )
}

export default Product