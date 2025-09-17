import { useEffect, useState } from "react"
import api from "../api";
import { Container, Row, Col, Card, Button} from "react-bootstrap";
import { Header } from "../components/Header";



export function AllCollection () {
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
                                <Button className="add-to-cart-btn w-100">Add to Cart</Button>
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