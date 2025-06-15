import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/ProductCard.scss';
import { Button } from 'react-bootstrap';
import cartApi from '../api/cartApi';
import { toast } from 'react-toastify';

const ProductCard = ({ id, img, name, price, rating }) => {
    const navigate = useNavigate();

    const viewDetailHandler = () => {
        navigate(`/product/${id}`);
    };

    const addToCartHandler = async () => {
        const productData = {
            productId: id,
            quantity: 1,
        }
        try {
            const response = await cartApi.addToCart(productData)
            const message = response.data.message;
            toast.success(message); // hiển thị thông báo từ backend
        }
        catch {
            alert("Error while adding this product!");
        }
    };

    return (
        <div className="product-card p-3 bg-light d-flex flex-column h-100">
            <div className="img-container" onClick={viewDetailHandler}>
                <img src={img} alt={name} className="img-fluid " />
            </div>
            <div className="product-info text-center mt-3 flex-grow-1 d-flex flex-column justify-content-between">
                <div className="stars mb-1">
                    {'★'.repeat(rating)}
                    {'☆'.repeat(5 - rating)}
                </div>
                <div className="fw-bold mb-1">{name}</div>
                <div className="price fw-bold">{price}</div>

                <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 mt-3">
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCartHandler();
                        }}
                        variant="dark"
                        className="flex-fill"
                    >
                        ADD TO CART
                    </Button>

                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log("buy now");
                        }}
                        variant="dark"
                        className="flex-fill"
                    >
                        BUY NOW
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
