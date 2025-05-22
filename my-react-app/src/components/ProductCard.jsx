import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/ProductCard.scss'; // bạn tạo riêng nếu có style riêng
const ProductCard = ({ img, name, price, rating }) => {
  const navigate = useNavigate();
  const viewDetailHandler = () => {
    navigate('/productDetail', {
      state: {
        img,
        name,
        price,
        rating
      }
    });
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
            </div>
        </div>
    );
};

export default ProductCard;
