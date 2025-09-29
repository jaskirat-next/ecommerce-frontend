import { useEffect, useState } from "react"
import api from "../api";
import { Container, Row, Col, Card, Button} from "react-bootstrap";
import { Header } from "../components/Header";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export function AllCollection () {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loadingProductId, setLoadingProductId] = useState(null)
    const [cartCount, setCartCount] = useState(0)

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
        fetchCartCount();
    }, [])

    const fetchCartCount = async () => {
        const token = localStorage.getItem("token");
        if(!token) {
            return;
        }

        try {
            const res = await api.get('/cart/count',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCartCount(res.data.count || 0)
        } catch (err) {
            console.error("Error fetching cart count:", err);
        }
    }

    const handleAddToCart = async (productId, quantity = 1) => {
        const token = localStorage.getItem("token");

        if(!token) {
            alert("PLease Login First");
            navigate('/login');
            return
        }

        try {

            setLoadingProductId(productId)

            const res = await api.post(
                "/cart/addToCart",
                {
                    productId,
                    quantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            alert("Product added to cart!");
            fetchCartCount();
            console.log("Cart Response:", res.data);  
        }catch (error) {
            console.error(error)
        } finally {
            setLoadingProductId(null)
        }
    }

    return (
        <div className="main">
         <div>
            <Header  cartCount={cartCount}/>
        </div>
        <Container  className="products_page">
        <h2 className="section-title">All Products</h2>
        <Row>
            {
                products.map((product) => (
                    <Col key={product._id} lg={3} md={4} sm={6} xs={12} className="product_col">
                        <Card className="product_card">
                            <div className="img_area">
                            <Card.Img src={product.images[0]} alt={product.name} /> 
                            </div>
                            <Card.Body>
                                <h3>{product.name}</h3>
                                <h5 className="price">₹{product.price}</h5>
                                <Button className="add-to-cart-btn w-100"
                                onClick={() => handleAddToCart(product._id)}
                                disabled={loadingProductId === product._id}

                                >{loadingProductId === product._id? "Adding..." : "Add to Cart"}</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
            }
        </Row>

        </Container>

        </div>
    )
}