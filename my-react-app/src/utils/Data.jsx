import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';

export const formatPrice = (price) => {
    return `${price.toLocaleString('vi-VN')} VND`;
};

// Danh sách sản phẩm mẫu (có thể tạo thêm nhiều danh sách sản phẩm khác như Sản phẩm nổi bật, Sp chính, Sp sale)
export const featureProducts = [
    { id: 1, name: 'Product 1', img: 'public\\image\\Products\\chair.jpg', price: 199.99 },
    { id: 2, name: 'Product 2', img: 'public\\image\\Products\\chair.jpg', price: 299.5 },
    { id: 3, name: 'Product 3', img: 'public\\image\\Products\\chair.jpg', price: 1500 },
    { id: 4, name: 'Product 4', img: 'public\\image\\Products\\chair.jpg', price: 75 },
    { id: 5, name: 'Product 5', img: 'public\\image\\Products\\chair.jpg', price: 999.99 },
];

export const features = [
    {
        icon: <LocalShippingIcon fontSize="large" />,
        title: 'Fast Delivery',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam rem quibusdam quae dolore aliquid fugiat tempore non.',
    },
    {
        icon: <CurrencyExchangeIcon fontSize="large" />,
        title: 'Easy Returns',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam rem quibusdam quae dolore aliquid fugiat tempore non.',
    },
    {
        icon: <MilitaryTechIcon fontSize="large" />,
        title: 'Top Quality',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam rem quibusdam quae dolore aliquid fugiat tempore non.',
    },
    {
        icon: <PhoneEnabledIcon fontSize="large" />,
        title: '24/7 Support',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam rem quibusdam quae dolore aliquid fugiat tempore non.',
    },
];

export const contentItems = [
    {
        image: 'public\\image\\HomePage\\img_2.png',
        title: 'Stylish chairs',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis aliquid soluta maxime temporibus voluptatibus. Accusamus ad illo aperiam error laborum est quisquam, harum magni aspernatur tenetur blanditiis hic quam.',
        reverse: false
    },
    {
        image: 'public\\image\\HomePage\\img_3.png',
        title: 'Stylish chairs',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis aliquid soluta maxime temporibus voluptatibus. Accusamus ad illo aperiam error laborum est quisquam, harum magni aspernatur tenetur blanditiis hic quam.',
        reverse: true
    },
    {
        image: 'public\\image\\HomePage\\img_4.png',
        title: 'Stylish chairs',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate blanditiis aliquid soluta maxime temporibus voluptatibus. Accusamus ad illo aperiam error laborum est quisquam, harum magni aspernatur tenetur blanditiis hic quam.',
        reverse: false
    }
];