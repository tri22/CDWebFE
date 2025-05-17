import React from 'react';
import Header from '../components/Header';
import Slider from '../components/Slider';
import Footer from '../components/Footer';
import MainHome from '../components/MainHome/MainHome';

const Home = () => {
    return (
        <div>
            <Header />
            <Slider />
            <MainHome />
            <Footer />
        </div>
    );
};

export default Home;
