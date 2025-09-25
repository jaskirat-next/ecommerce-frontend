import { useEffect, useState } from "react"
import api from "../api"
import { Header } from "../components/Header";
import "../styles/home.scss"
import banner from "../assets/banner.jpg"
import { Container, Row, Col, Card, Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";



function Home() {
    const navigate = useNavigate(); 

    const [products, setProducts] = useState([]);
    const [loadingProductId, setLoadingProductId] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await api.get('/product/newCollection')
                setProducts(res.data)
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        fetchProducts();
    }, [])


    // cart handle

    const handleAddToCart = async (productId, quantity = 1) => {
        const token = localStorage.getItem("token");
        
        if(!token) {
            alert("Please Login First");
            navigate("/login");
            return;
        }

        try {

        setLoadingProductId(productId)
        
        const res = await api.post(
            '/cart/addToCart',
            {
                productId,
                quantity
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Product added to cart!");
        console.log("Cart Response:", res.data);  

        } catch (error) {
            console.error(error)
        }finally {
            setLoadingProductId(null)
        }
    }

    return (
        <div className="main">
            <div>
                <Header />
            </div>
            <div className="banner">
                <img src={banner} />
                <button type="button" onClick={() => navigate("/collection/all")}>
                    Shop Now
                </button>

            </div>

            <Container className="products_page">
                <h2 className="section-title">New Collection</h2>
                <Row>
                    {
                        products.map((product) => (
                            <Col key={product._id} lg={3} md={4} sm={6} xs={12} className="product_col">
                                <Card className="product_card">
                                    <div className="img_area">
                                        <Card.Img src={product.images[1]} alt={product.name} />
                                    </div>
                                    <Card.Body>
                                        <h3>{product.name}</h3>
                                        <h5 className="price">₹{product.price}</h5>
                                        <Button className="add-to-cart-btn w-100"
                                        onClick={() => handleAddToCart(product._id)}
                                        disabled={loadingProductId === product._id}
                                        >
                                        {loadingProductId === product._id? "Adding...": "Add to Cart"}
                                        </Button>
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

export default Home;