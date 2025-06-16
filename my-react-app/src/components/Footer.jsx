import React from 'react';
import { Container, Row, Col, InputGroup, Button, Form } from 'react-bootstrap';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import '../assets/styles/Footer.scss'
import { useTranslation } from 'react-i18next';
const Footer = () => {
    const { t } = useTranslation(); // <-- hook dùng để dịch

    return (
        <div id="footer">
            <Container>
                <h3 className='footer-title'>Soudemy</h3>

                <Row className="gy-4">
                    <Col xs={12} md={6} lg={3} className='first'>
                        <h3 className="footer-title">{t('about_us')}</h3>
                        <p className="footer-contact">
                            {t('about_description')}
                        </p>
                    </Col>

                    <Col xs={6} md={6} lg={3}>
                        <h3 className="footer-title">{t('categories')}</h3>
                        <ul className="footer-list">
                            <li>{t('category1')}</li>
                            <li>{t('category2')}</li>
                            <li>{t('category3')}</li>
                            <li>{t('category4')}</li>
                            <li>{t('category5')}</li>
                        </ul>
                    </Col>

                    <Col xs={6} md={6} lg={3}>
                        <h3 className="footer-title">{t('customer_care')}</h3>
                        <ul className="footer-list">
                            <li>{t('my_account')}</li>
                            <li>{t('discount')}</li>
                            <li>{t('returns')}</li>
                            <li>{t('orders_history')}</li>
                            <li>{t('orders_tracking')}</li>
                        </ul>
                    </Col>

                    <Col xs={12} md={6} lg={2}>
                        <h3 className="footer-title">{t('pages')}</h3>
                        <div className="footer-socials">
                            <FacebookIcon />
                            <InstagramIcon />
                            <TwitterIcon />
                            <PinterestIcon />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Footer;