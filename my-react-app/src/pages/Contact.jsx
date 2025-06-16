import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/styles/Contact.scss';
import Slider from '../components/Slider';

export default function Contact() {
    const { t } = useTranslation();

    const ContactInfo = () => (
        <div className="contact-info text-center bg-white py-5 px-4 mt-5">
            <h2 className="my-3">{t('contact.title')}</h2>
            <p className="mb-4">{t('contact.description')}</p>
            <p><strong>{t('contact.office_hours')}</strong></p>
            <p><strong>{t('contact.email')}</strong></p>
            <p><strong>{t('contact.phone')}</strong></p>
            <p><strong>{t('contact.location')}</strong></p>
        </div>
    );

    const ContactForm = () => (
        <Form className="contact-form bg-white p-5 mx-5 mb-5">
            <Row>
                <Col md={6} className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder={t('contact.form_name')}
                        className="custom-input"
                    />
                </Col>
                <Col md={6} className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder={t('contact.form_email')}
                        className="custom-input"
                    />
                </Col>
                <Col md={6} className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder={t('contact.form_phone')}
                        className="custom-input"
                    />
                </Col>
                <Col md={6} className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder={t('contact.form_subject')}
                        className="custom-input"
                    />
                </Col>
                <Col md={12} className="mb-3">
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder={t('contact.form_message')}
                        className="custom-input"
                    />
                </Col>
                <Col md={12}>
                    <Button type="submit" className="w-100 send-btn">
                        {t('contact.form_submit')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );

    return (
        <div className="">
            <Header />
            <Slider />
            <div className="content">
                <ContactInfo />
                <div className="px-5 mx-5">
                    <ContactForm />
                </div>
            </div>
            <Footer />
        </div>
    );
}