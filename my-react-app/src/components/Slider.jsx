import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Slider.scss';

const Slider = () => {
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/');
    };

    return (
        <div id='slider' className='slider-wrapper'>
            <Carousel>
                {[1, 2, 3].map((num, index) => (
                    <Carousel.Item key={index}>
                        <img
                            className="d-block w-100 slider-img"
                            src={`public/image/Slider/Slider_${num}.jpg`}
                            alt={`Slide ${num}`}
                        />
                        <Carousel.Caption>
                            <h3>New Furniture Collection Trends in 2020</h3>
                            <Button
                                variant="primary"
                                className="custom-btn"
                                onClick={handleNavigateHome}
                            >
                                Shop now
                            </Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default Slider;
