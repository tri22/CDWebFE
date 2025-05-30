import React ,{useEffect}from 'react';
import Header from '../components/Header';
import Slider from '../components/Slider';
import Footer from '../components/Footer';
import MainHome from '../components/MainHome/MainHome';
import { useAuth } from '../api/AuthContext';
const Home = () => {
    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn && user) {
            console.log("Thông tin user:", user);
        }
    }, [user, isLoggedIn]);
    return (
        <div>
            <Header user={user} />
            <Slider />
            <MainHome />
            <Footer />
        </div >
    );
};

export default Home;
