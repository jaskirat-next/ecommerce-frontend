import { useEffect, useState } from "react"
import api from "../api"

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/product/getAllProduct')
                setProducts(res.data)
            } catch (err) {
                console.error("Error fetching products:", err);
              }
        };

        fetchProducts();
    }, [])

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {
                    products.map((p) => (
                        <li key={p._id}>{p.name} - {p.price}</li>
                    ))
                }
            </ul>
        </div>
    )
    
}

export default Home;