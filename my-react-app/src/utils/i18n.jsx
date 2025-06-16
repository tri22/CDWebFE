import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            // Header
            home: 'Home',
            blog: 'Blog',
            shop: 'Shop',
            contact: 'Contact',
            about: 'About Us',
            search: 'Search...',
            cart: 'Cart',
            login: 'Login',
            logout: 'Logout',
            profile: 'Profile',
            admin: 'Admin',
            order: 'Order',

            // Blog
            post_article: 'Post Article',
            cancel: 'Cancel',
            title: 'Title',
            image_link: 'Image Link',
            description: 'Description',
            content: 'Content',
            default_author: 'Poster',
            // Thêm khóa mới
            'category.ceiling': 'Ceiling',
            'category.floor': 'Floor',
            'category.led': 'Led',
            'category.modern': 'Modern',
            'category.retro': 'Retro',
            'category.wood': 'Wood',
            recent_posts: 'Recent Posts', // Bổ sung
            tags: 'Tags', // Bổ sung
            'tag.sofa': 'Sofa', // Bổ sung
            'tag.clean': 'Clean', // Bổ sung

            // Blog titles
            "blog.title_1": "New modern sofa is here",
            "blog.title_2": "Second article",
            "blog.title_3": "Third article",
            "blog.title_4": "Fourth article",
            // Blog descriptions
            "blog.description_1": "Donec vitae felis eget nunc aliquet lacinia. Vestibulum a est at dui luctus volutpat.",
            "blog.description_2": "Description for the second article...",
            "blog.description_3": "Description for the third article...",
            "blog.description_4": "Description for the fourth article...",
            // Blog contents
            "blog.content_1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            "blog.content_2": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            "blog.content_3": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            "blog.content_4": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            // Additional categories
            "category.newest": "Newest",
            "category.sofa_and_chair": "Sofa and Chair",
            "category.wooden": "Wooden",
            "category.design": "Design",
            "category.minimal": "Minimal",
            "category.interior": "Interior",
            "category.architecture": "Architecture",

            // Cart
            cart_title: 'Cart ({{count}} item)',
            photo: 'Photo',
            product: 'Product',
            price: 'Price',
            quantity: 'Quantity',
            subtotal: 'Subtotal',
            coupon_code: 'Coupon code',
            apply_coupon: 'Apply Coupon',
            update_cart: 'Update Cart',
            cart_totals: 'Cart totals',
            proceed_checkout: 'Proceed to Checkout',

            // Shop
            showing_results: 'Showing {{start}}–{{end}} of {{total}} results',
            sort_popularity: 'Sort by popularity',
            sort_price: 'Sort by price',
            category: 'Category',
            color: 'Color',
            price: 'Price',
            filter: 'Filter',

            // SubMain
            shop_now: 'Shop now',
            read_more: 'Read more',
            sub_main_title: 'Your office should have only natural materials',
            sub_main_date: '29 Sep, 2022 / by Rat',
            content_title: 'Stylish chairs',
            content_description: 'Description content',
            // FeatureProduct
            feature_product_title: 'Product of the week',
            product_name_1: 'Modern Chair',
            product_name_2: 'Ergonomic Chair',
            product_name_3: 'Luxury Sofa',
            product_name_4: 'Minimalist Table',
            product_name_5: 'Designer Lamp',

            // Footer
            about_us: 'About Us',
            about_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, vero! Animi pariatur iure quo mollitia fugiat odit, doloremque quae cupiditate maxime distinctio. Repellat, tempore? Illum debitis rem voluptatum quasi quisquam!',
            categories: 'Categories',
            category1: 'Category 1',
            category2: 'Category 2',
            category3: 'Category 3',
            category4: 'Category 4',
            category5: 'Category 5',
            customer_care: 'Customer Care',
            my_account: 'My Account',
            discount: 'Discount',
            returns: 'Returns',
            orders_history: 'Orders History',
            orders_tracking: 'Orders Tracking',
            pages: 'Pages',

            contact: {
                header: 'Contact',
                title: 'Get in Touch with Us',
                description: 'Lorem ipsum dol sit amet consectetur adipiscing elit...',
                office_hours: 'Office Hours: Mon - Fri, 8am - 5pm',
                email: 'Email: contact@company.com',
                phone: 'Phone: (414) 897-5892',
                location: 'Location: 50 Middle Point Rd, San Francisco, 80412',
                form_name: 'Name',
                form_email: 'Email',
                form_phone: 'Phone',
                form_subject: 'Subject',
                form_message: 'Type your message here...',
                form_submit: 'Send Message',
            },

            about_furnix: 'ABOUT FURNIX',
            about_description: 'Since 1650, FURNIX has crafted premium furniture that stands the test of time. Let\'s explore our journey.',
            // Timeline items
            'timeline.1910': 'Starting as a humble woodworking studio, FURNIX crafted timeless furniture pieces rooted in tradition and artisan skill.',
            'timeline.1990': 'A new era began as FURNIX embraced innovation—blending modern production technology with classic craftsmanship for exceptional collections.',
            'timeline.2010': 'FURNIX expanded globally, bringing sustainable elegance and artistic living into modern homes around the world.',
            // Features
            'feature.free_delivery': 'Free Delivery',
            'feature.free_delivery_description': 'Enjoy fast and free shipping on all furniture orders—no minimum required.',
            'feature.money_back': 'Money Back Guarantee',
            'feature.money_back_description': 'Not satisfied? We offer a full refund within 30 days—no questions asked.',
            'feature.quality_product': 'Quality Product',
            'feature.quality_product_description': 'Crafted with precision, our furniture blends luxury with long-lasting durability.',
            'feature.support': '24/7 Support',
            'feature.support_description': 'Our customer care team is always here for you—anytime, anywhere.',
            // Newsletter Signup
            newsletter_title: 'Sign up for emails',
            newsletter_description: 'FOR NEWS, COLLECTIONS & MORE',
            newsletter_placeholder: 'Enter your email address',
            newsletter_button: 'SIGN UP',
        },
    },
    vi: {
        translation: {
            // Header
            home: 'Trang chủ',
            blog: 'Blog',
            shop: 'Cửa hàng',
            contact: 'Liên hệ',
            about: 'Về chúng tôi',
            search: 'Tìm kiếm...',
            cart: 'Giỏ hàng',
            login: 'Đăng nhập',
            logout: 'Đăng xuất',
            profile: 'Hồ sơ',
            admin: 'Quản trị',
            order: 'Đơn hàng',

            // Blog
            post_article: 'Đăng bài viết',
            cancel: 'Hủy',
            title: 'Tiêu đề',
            image_link: 'Link ảnh',
            description: 'Mô tả',
            content: 'Nội dung',
            default_author: 'Người đăng',
            // Blog titles
            "blog.title_1": "Sofa hiện đại mới đã có mặt",
            "blog.title_2": "Bài viết thứ 2",
            "blog.title_3": "Bài viết thứ 3",
            "blog.title_4": "Bài viết thứ 4",
            // Blog descriptions
            "blog.description_1": "Phần mô tả tiếp theo cho bài viết 1...",
            "blog.description_2": "Phần mô tả tiếp theo cho bài viết 2...",
            "blog.description_3": "Mô tả bài viết thứ 3...",
            "blog.description_4": "Mô tả bài viết thứ 4...",
            // Blog contents
            "blog.content_1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            "blog.content_2": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            "blog.content_3": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            "blog.content_4": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            // Additional categories
            "category.newest": "Mới nhất",
            "category.sofa_and_chair": "Sofa và Ghế",
            "category.wooden": "Gỗ",
            "category.design": "Thiết kế",
            "category.minimal": "Tối giản",
            "category.interior": "Nội thất",
            "category.architecture": "Kiến trúc",

            // Thêm khóa mới
            'category.ceiling': 'Trần nhà',
            'category.floor': 'Sàn nhà',
            'category.led': 'Đèn LED',
            'category.modern': 'Hiện đại',
            'category.retro': 'Cổ điển',
            'category.wood': 'Gỗ',
            recent_posts: 'Bài viết gần đây', // Bổ sung
            tags: 'Thẻ', // Bổ sung
            'tag.sofa': 'Sofa', // Bổ sung
            'tag.clean': 'Sạch sẽ', // Bổ sung

            // Cart
            cart_title: 'Giỏ hàng ({{count}} sản phẩm)',
            photo: 'Ảnh',
            product: 'Sản phẩm',
            price: 'Giá',
            quantity: 'Số lượng',
            subtotal: 'Tổng phụ',
            coupon_code: 'Mã giảm giá',
            apply_coupon: 'Áp dụng mã',
            update_cart: 'Cập nhật giỏ hàng',
            cart_totals: 'Tổng giỏ hàng',
            proceed_checkout: 'Tiến hành thanh toán',

            // Shop
            showing_results: 'Hiển thị {{start}}–{{end}} trong số {{total}} kết quả',
            sort_popularity: 'Sắp xếp theo độ phổ biến',
            sort_price: 'Sắp xếp theo giá',
            category: 'Danh mục',
            color: 'Màu sắc',
            price: 'Giá',
            filter: 'Lọc',

            // SubMain
            shop_now: 'Mua ngay',
            read_more: 'Đọc thêm',
            sub_main_title: 'Văn phòng của bạn nên sử dụng các vật liệu tự nhiên',
            sub_main_date: '29/09/2022 / bởi Rat',
            content_title: 'Ghế thời trang',
            content_description: 'Mô tả nội dung',
            // FeatureProduct
            feature_product_title: 'Sản phẩm của tuần',
            product_name_1: 'Ghế hiện đại',
            product_name_2: 'Ghế công thái học',
            product_name_3: 'Sofa cao cấp',
            product_name_4: 'Bàn tối giản',
            product_name_5: 'Đèn thiết kế',

            // Footer
            about_us: 'Về chúng tôi',
            about_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, vero! Animi pariatur iure quo mollitia fugiat odit, doloremque quae cupiditate maxime distinctio. Repellat, tempore? Illum debitis rem voluptatum quasi quisquam!',
            categories: 'Danh mục',
            category1: 'Danh mục 1',
            category2: 'Danh mục 2',
            category3: 'Danh mục 3',
            category4: 'Danh mục 4',
            category5: 'Danh mục 5',
            customer_care: 'Chăm sóc khách hàng',
            my_account: 'Tài khoản của tôi',
            discount: 'Giảm giá',
            returns: 'Trả hàng',
            orders_history: 'Lịch sử đơn hàng',
            orders_tracking: 'Theo dõi đơn hàng',
            pages: 'Trang',
            contact: {
                header: 'Liên hệ',
                title: 'Liên hệ với chúng tôi',
                description: 'Mô tả nội dung liên hệ...',
                office_hours: 'Giờ làm việc: Thứ 2 - Thứ 6, 8h - 17h',
                email: 'Email: lienhe@congty.com',
                phone: 'Điện thoại: (414) 897-5893',
                location: 'Địa chỉ: 50 Middle Point Rd, San Francisco, 80412',
                form_name: 'Tên',
                form_email: 'Email',
                form_phone: 'Điện thoại',
                form_subject: 'Chủ đề',
                form_message: 'Nhập nội dung tin nhắn của bạn...',
                form_submit: 'Gửi yêu cầu',
            },
            about_furnix: 'VỀ FURNIX',
            about_description: 'Từ năm 1650, FURNIX đã chế tác những món đồ nội thất cao cấp trường tồn với thời gian. Hãy cùng khám phá hành trình của chúng tôi.',
            // Timeline items
            'timeline.1910': 'Bắt đầu như một xưởng mộc giản dị, FURNIX đã tạo ra những món đồ nội thất vượt thời gian, dựa trên truyền thống và kỹ năng thủ công.',
            'timeline.1990': 'Một kỷ nguyên mới bắt đầu khi FURNIX áp dụng đổi mới—kết hợp công nghệ sản xuất hiện đại với kỹ thuật thủ công truyền thống để tạo ra các bộ sưu tập đặc biệt.',
            'timeline.2010': 'FURNIX mở rộng toàn cầu, mang vẻ đẹp bền vững và nghệ thuật sống vào các ngôi nhà hiện đại trên toàn thế giới.',
            // Features
            'feature.free_delivery': 'Giao hàng miễn phí',
            'feature.free_delivery_description': 'Tận hưởng dịch vụ giao hàng nhanh chóng và miễn phí cho tất cả đơn hàng nội thất—không yêu cầu giá trị tối thiểu.',
            'feature.money_back': 'Bảo đảm hoàn tiền',
            'feature.money_back_description': 'Không hài lòng? Chúng tôi cung cấp chính sách hoàn tiền đầy đủ trong vòng 30 ngày—không cần lý do.',
            'feature.quality_product': 'Sản phẩm chất lượng',
            'feature.quality_product_description': 'Được chế tác tỉ mỉ, nội thất của chúng tôi kết hợp giữa sự sang trọng và độ bền lâu dài.',
            'feature.support': 'Hỗ trợ 24/7',
            'feature.support_description': 'Đội ngũ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn—bất kỳ lúc nào, bất kỳ nơi đâu.',
            // Newsletter Signup
            newsletter_title: 'Đăng ký nhận email',
            newsletter_description: 'ĐỂ NHẬN TIN TỨC, BỘ SƯU TẬP & NHIỀU HƠN NỮA',
            newsletter_placeholder: 'Nhập địa chỉ email của bạn',
            newsletter_button: 'ĐĂNG KÝ',
        },
    },
};

i18n
    .use(LanguageDetector) // Tự động phát hiện ngôn ngữ
    .use(initReactI18next) // Kết nối với React
    .init({
        resources,
        fallbackLng: 'en', // Ngôn ngữ mặc định nếu không phát hiện được
        interpolation: {
            escapeValue: false, // React đã xử lý XSS
        },
    });

export default resources;