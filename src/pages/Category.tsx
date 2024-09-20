import axios from "axios"
import { useEffect, useState } from "react"
import CategoryType from "../types/CategoryType"
import NavBar from "../components/NavBar"
import { useAuth } from "../context/AuthContext"

function Category() {
    const { isAuthenticated, jwtToken } = useAuth()

    const [categories, setCategories] = useState<CategoryType[]>([])
    const [categoryName, setCategoryName] = useState<string>("")

    async function loadCategories() {
        const response = await axios.get("http://localhost:9000/categories", config)
        console.log(response)
        setCategories(response.data)
    }

    const config = {
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    }

    useEffect(function () {//page load to do something want
        if (isAuthenticated) {
            loadCategories() // function that will be triggered at the side effect
        }
    }, [isAuthenticated])//[] dependency array, if it is empty it will be triggered only one,
    // we can get change value example category name every time category name change it wll be update

    function handleCategoryName(event: any) {
        setCategoryName(event.target.value)
    }

    async function handleSubmit() {
        const data = {
            name: categoryName
        }
        const response = await axios.post("http://localhost:9000/categories", data, config)
        console.log(response)
        loadCategories()
        setCategoryName("")
    }

    return (
        <>
            <NavBar />
            <div className="container mx-auto">
                <h1 className="text-4xl font-semibold mb-5 text-slate-900">Categories</h1>

                {/* <button onClick={loadCategories}>Load Categories</button><br/> */}

                {categories && categories.map((category: CategoryType) => {
                    return (
                        <div className="text-slate-600 border border-slate-950 rounded-lg mb-3 p-2 shadow-lg inline-block me-3 hover:bg-slate-100" key={category.id}>
                            {category.id}. {category.name}
                        </div>
                    )
                })
                }

                <h2 className="text-xl text-slate-900 font-medium mb-3 mt-5">Create Category</h2>

                <div className="border border-slate-200 py-3 rounded-lg max-w-[350px] center px-2">
                    <form>
                        <label className="text-slate-600 font-sm block mb-2">Category Name:</label>
                        <input className="text-slate-600 font-sm block mb-2 w-full p-2 border border-slate-300 rounded-lg" type="text"
                            onChange={handleCategoryName} value={categoryName} required />
                        <button className="py-3 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-700 text-sm" type="button" onClick={handleSubmit}>Create Category</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Category