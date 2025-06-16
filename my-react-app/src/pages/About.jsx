import React from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import TimelineItem from '../components/TimelineItem';
import { FaTruck, FaUndoAlt, FaMedal, FaHeadset } from 'react-icons/fa';
import '../assets/styles/About.scss'
import { useTranslation } from 'react-i18next';

const About = () => {
    const { t } = useTranslation();

    const data = [
        {
            year: '1910',
            text: t('timeline.1910'),
            image: `/image/product/product6.png`,
            reverse: false,
        },
        {
            year: '1990',
            text: t('timeline.1990'),
            image: `/image/product/product9.png`,
            reverse: true,
        },
        {
            year: '2010',
            text: t('timeline.2010'),
            image: `/image/product/product1.png`,
            reverse: false,
        },
    ];

    const features = [
        {
            icon: <FaTruck size={40} color="#FF6B6B" />,
            title: t('feature.free_delivery'),
            description: t('feature.free_delivery_description'),
        },
        {
            icon: <FaUndoAlt size={40} color="#4dabf7" />,
            title: t('feature.money_back'),
            description: t('feature.money_back_description'),
        },
        {
            icon: <FaMedal size={40} color="#f59f00" />,
            title: t('feature.quality_product'),
            description: t('feature.quality_product_description'),
        },
        {
            icon: <FaHeadset size={40} color="#5c7cfa" />,
            title: t('feature.support'),
            description: t('feature.support_description'),
        },
    ];

    return (
        <div className="bg-light text-dark about-container">
            <Header />
            <Container className="py-5 mt-5">
                <h2 className="text-center fw-bold mb-3">{t('about_furnix')}</h2>
                <p className="text-center text-muted mb-5">{t('about_description')}</p>
                <div>
                    {data.map((item, index) => (
                        <TimelineItem key={index} {...item} />
                    ))}
                </div>
                <div className="bg-light">
                    <Row className="text-center">
                        {features.map((item, index) => (
                            <Col key={index} md={3} sm={6} xs={12} className="mb-4">
                                <Card className="border-0 py-4 px-2 h-100">
                                    <Row className="d-flex align-items-center mb-2">
                                        <Col md={5}>
                                            <div className="mb-3">{item.icon}</div>
                                        </Col>
                                        <Col md={6}>
                                            <h5 className="fw-bold">{item.title}</h5>
                                        </Col>
                                    </Row>
                                    <p className="text-muted px-3">{item.description}</p>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
                {/* Newsletter Signup */}
                <div className="text-center py-5 bg-white shadow-sm">
                    <h5 className="fw-bold">{t('newsletter_title')}</h5>
                    <p className="text-muted">{t('newsletter_description')}</p>
                    <input
                        type="email"
                        className="form-control w-50 mx-auto mb-3"
                        placeholder={t('newsletter_placeholder')}
                    />
                    <Button variant="dark">{t('newsletter_button')}</Button>
                </div>
            </Container>
            <Footer />
        </div>
    );
};

export default About;