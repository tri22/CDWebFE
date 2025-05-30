import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/ProductCard.scss';
import { Button } from 'react-bootstrap';

const ProductCard = ({ id, img, name, price, rating }) => {
    const navigate = useNavigate();

    const viewDetailHandler = () => {
        navigate(`/product/${id}`);
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
                            e.stopPropagation(); // ❗ Ngăn chặn click lan lên div cha
                            console.log("add to cart");
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
