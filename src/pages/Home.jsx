import { useEffect, useState } from "react"
import api from "../api"
import { Header } from "../components/Header";
import "../styles/home.scss"
import banner from "../assets/banner.jpg"

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
        <div className="main">
            <div>
                <Header />
            </div>
            <div className="banner">
                <img src={banner} />
                <button type="button">Shop Now</button>
            </div>

            <div className="products" xs={3} md={4} lg={6} >
            <h2>Products</h2>
            <ul xs={3} md={4} lg={6}>
                {
                    products.map((p) => (
                        <li 
                            key={p._id}>{p.name} - {p.price}
                        </li>
                    ))
                }
            </ul>
            </div>


        </div>
    )
    
}

export default Home;