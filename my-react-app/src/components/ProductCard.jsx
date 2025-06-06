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

    const addToCartlHandler = async () => {
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
        <div className="product-card p-2 bg-light" onClick={viewDetailHandler}>
            <img src={img} alt={name} className="img-fluid mb-2" />
            <div className="text-center">
                <div className="stars mb-1">
                    {'★'.repeat(rating)}
                    {'☆'.repeat(5 - rating)}
                </div>
                <div className="fw-bold mb-1">{name}</div>
                <div className="price fw-bold">{price}</div>
                <div className="d-flex justify-content-around">
                    <Button
                        className=" mt-3 "
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCartlHandler();
                        }}
                        style={{ alignSelf: 'center' }}
                        variant="outline-dark"
                    >
                        ADD TO CART
                    </Button>

                    <Button
                        className=" mt-3 "
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log("buy now");
                        }}
                        style={{ alignSelf: 'center' }}
                        variant="outline-dark"
                    >
                        BUY NOW
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
