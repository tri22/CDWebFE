import React from 'react';
import { Container } from 'react-bootstrap';
import '../../assets/styles/MainHome.scss'
import FeatureProduct from './FeatureProduct.jsx';
import SubMain from './SubMain.jsx';

const MainHome = () => {
    return (
        <div id='mainHome'>
            <Container>
                <FeatureProduct />
                <SubMain />
            </Container>
        </div>
    );
};

export default MainHome;
