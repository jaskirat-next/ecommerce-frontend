import { useEffect, useState } from "react";
import "../styles/checkout.scss"
import api from "../api";



export default function CheckOut () {

    const [address, setAddress] = useState({
        name: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        phone: ""
    })

    const [summary, setSummary] = useState({
        subtotal: 0,
        shipping: 0,
        total: 0
    })

    let token = localStorage.getItem("token")

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await api.get('/cart/checkoutSummary', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSummary(res.data.result[0])


            } catch (err) {
                console.error("not able to get daat", err)
            }

        }
        fetchSummary();
    }, [])



    const handleInputChange = (e) => {
        setAddress({...address, [e.target.name]: e.target.value})
    }

    console.log(summary)


    const handlePayment = async () => {
        try {
            if(!address.name || !address.street || !address.city || !address.state || !address.pincode || !address.phone) {
                alert("Please fill in all the address fields");
                return;    
            }

            const res = await api.post('/order/placeOrder', {address}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            alert("Order placed successfully! Order ID: " + res.data.order_id);
        } catch (err) {
            console.error(err);
            alert("Something went wrong while placing the order");    
        }
    }



    return (
        <>
            <div className="checkout_section">
                <div className="address_form">
                    <h3>Shipping Address</h3>
                    <form>
                        <input
                        type="text"
                        name="name"
                        placeholder="Enter full Name"
                        value={address.name}
                        onChange={handleInputChange}
                        />

                        <input
                        type="text"
                        name="street"
                        placeholder="Street No."
                        value={address.street}
                        onChange={handleInputChange}
                        />

                        <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={address.state}
                        onChange={handleInputChange}

                        />

                        <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={address.city}
                        onChange={handleInputChange}

                        />

                        <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={address.pincode}
                        onChange={handleInputChange}

                        />

                        <input
                        type="number"
                        name="phone"
                        placeholder="Phone"
                        value={address.phone}
                        onChange={handleInputChange}
                        />

                    </form>
                </div>

                <div className="order_summary">
                    <h3>Order Summary</h3>
                    <div className="subtotal">
                        <span>summary:</span>
                        <span>₹{summary.subtotal}</span>
                    </div>

                    <div className="shipping">
                        <span>Shipping: </span>
                        <span>₹{summary.shipping}</span>
                    </div>

                    <div   className="total">
                        <span>Total:</span>
                        <span>₹{summary.total}</span>

                    </div>

                    <button onClick={() => handlePayment()}>Pay Now</button>
                </div>

            </div> 
        </>
    );
}