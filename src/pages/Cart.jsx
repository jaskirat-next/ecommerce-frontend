import { useEffect, useState } from "react"
import api from "../api";
import { Header } from "../components/Header";

export function Cart () {

    const [cartData, setCartData] = useState([]);

    useEffect( () => {
        const fetchCart = async () => {
            const token = localStorage.getItem("token");
            if(!token) return;
    
            const res = await api.get('/cart/cart', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    
            console.log("Cart Data:", res.data);
            setCartData(res.data.items || [])
        }
    
        fetchCart();

    }, [])


    return (
       <div>
        <h3>Your Cart</h3>
        {
            cartData.length ===0 ? (
                <p>NO cart Item</p>
            ): (
                cartData.map((item) => (
                    <div key={item._id} style={{ border: "1px solid #ddd", margin: "10px", padding: "10px" }}>
                        <img src={item.productId.images[0]} />
                        <p><strong>Product:</strong> {item.productId?.name}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                        <p><strong>Price:</strong> ${item.price}</p>
                    </div>
                ))
            )
        }
       </div>
    )


}



