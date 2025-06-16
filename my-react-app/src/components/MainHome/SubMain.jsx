import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { features } from '../../utils/Data';
import { useNavigate } from 'react-router-dom';
import { contentItems } from '../../utils/Data'
import { useTranslation } from 'react-i18next';

export default function SubMain() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleNavigateShop = () => {
        navigate('/shop');
    };

    return (
        <div className='sub-main'>
            <div className='sub-main-1'>
                {contentItems.map((item, idx) => (
                    <Row key={idx} className="align-items-center">
                        <Col md={6} xs={12} className={item.reverse ? 'order-md-2' : ''}>
                            <img src={item.image} alt={`image-${idx + 1}`} className="img-fluid" />
                        </Col>
                        <Col md={6} xs={12} className={`d-flex flex-column align-items-center ${item.reverse ? 'order-md-1' : ''}`}>
                            <h3 className="mb-2 sub-title">{t('content_title')}</h3>
                            <p className="my-4 text-center sub-description">{t('content_description')}</p>
                            <Button variant="primary" className="custom-btn" onClick={handleNavigateShop}>
                                <span>{t('shop_now')}</span>
                            </Button>
                        </Col>
                    </Row>
                ))}
            </div>
            <div className='sub-main-2'>
                <Row className="g-4">
                    {features.map((item, idx) => (
                        <Col key={idx} xs={12} sm={6} md={3}>
                            <Card className="h-100 shadow-custom text-start p-3 border-0">
                                <div className="icon-title-row d-flex align-items-center gap-2 mb-2">
                                    <div className="feature-icon">{item.icon}</div>
                                    <h5 className="feature-title m-0">{item.title}</h5>
                                </div>
                                <p className="text-muted">{item.description}</p>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
            <div className="sub-main-3 text-center">
                <Row className="justify-content-center">
                    <Col xs={12} md={6} lg={5} className="sub-main-item">
                        <Image src="/image/HomePage/img_5.png" alt="Post 1" fluid />
                        <p className="sub-main-date">{t('sub_main_date')}</p>
                        <h2 className="sub-main-title">{t('sub_main_title')}</h2>
                        <a className="sub-main-link" href="#">{t('read_more')}</a>
                    </Col>
                    <Col xs={12} md={6} lg={5} className="sub-main-item">
                        <Image src="/image/HomePage/img_6.png" alt="Post 2" fluid />
                        <p className="sub-main-date">{t('sub_main_date')}</p>
                        <h2 className="sub-main-title">{t('sub_main_title')}</h2>
                        <a className="sub-main-link" href="#">{t('read_more')}</a>
                    </Col>
                </Row>
            </div>
        </div>
    );
}