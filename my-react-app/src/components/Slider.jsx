import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Slider.scss';

const Slider = () => {
    const navigate = useNavigate();

    const handleNavigateShop = () => {
        navigate('/shop');
    };
    return (
        <div id='slider' className='slider-wrapper'>
            <Carousel>
                {[1, 2, 3].map((num, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100 slider-img"
                            src={`public/image/Slider/Slider_${num}.png`}
                            alt={`Slide ${num}`}
                        />
                        <Carousel.Caption>
                            <div>
                                <h3></h3>
                                <p></p>
                            </div>
                            <Button
                                variant="primary"
                                className="custom-btn"
                                onClick={handleNavigateShop}
                            >
                                <span>Shop now</span>
                            </Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;
