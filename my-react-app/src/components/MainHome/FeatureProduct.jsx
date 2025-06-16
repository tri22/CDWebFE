import { Card } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { formatPrice, featureProducts } from '../../utils/Data.jsx';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FeatureProduct = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className='feature-product py-5'>
            <h2 className='title text-center'>{t('feature_product_title')}</h2>
            <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={4}
                spaceBetween={30}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                    320: { slidesPerView: 1, spaceBetween: 20 },
                    576: { slidesPerView: 2, spaceBetween: 20 },
                    768: { slidesPerView: 3, spaceBetween: 25 },
                    992: { slidesPerView: 4, spaceBetween: 30 },
                }}
            >
                {featureProducts.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Card className="product-card" onClick={() => navigate(`/details/${item.id}`)}>
                            <div className="card-img-wrapper">
                                <Card.Img variant="top" src={item.img} className="product-img" />
                                <div className="top-left-icons">
                                    <span className="icon-wrapper"><ShoppingCartIcon /></span>
                                    <span className="icon-wrapper"><FavoriteBorderIcon /></span>
                                </div>
                            </div>
                            <Card.Body>
                                <Card.Title className="card-title">{t(`product_name_${item.id}`)}</Card.Title>
                                <Card.Text className="product-price">
                                    {formatPrice(item.price, '$')}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default FeatureProduct;
