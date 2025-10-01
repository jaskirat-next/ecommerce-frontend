import { useEffect, useState } from "react"
import api from "../api";
import { Header } from "../components/Header";
import "../styles/cart.scss"

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

    const token = localStorage.getItem("token");

    const handleIncrease = async (productId) => {
      try { 
        const res = await api.put(`/cart/increase/${productId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setCartData(res.data.items || []);
      } catch (err) {
        console.log(err)
      }
    }


    const handleDecrease = async (productId) => {
      try {
        const res = await api.put(`/cart/decrease/${productId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCartData(res.data.items || []);
        } catch (err) {
        console.log(err)
      }
    }


    return (
        <>
        <div>
            <Header />
        </div>

        <div className="cart-container">
        <h3>Your Cart</h3>
        {cartData.length === 0 ? (
          <p className="empty-cart">No cart items</p>
        ) : (
          cartData.map((item) => (
            <div key={item._id} className="cart-item">
              <img 
                src={item.productId?.images?.[0] || "/placeholder.png"} 
                alt={item.productId?.name || "Product"} 
              />

              <div className="item-details">
                <p>
                  <strong>Product:</strong> {item.productId?.name}
                </p>
                <p>
                  <strong>Quantity:</strong> {item.quantity}
                </p>
                <p className="price">
                  <strong>Price:</strong> ₹{item.price}
                </p>

                <p className="subtotal">
                  <strong>Subtotal:</strong> ₹{item.price * item.quantity}
                </p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => handleDecrease(item.productId._id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={(() => handleIncrease(item.productId._id))}>+</button>



              </div>


            </div>
          ))
        )}
      </div>      
        </>
    )


}



