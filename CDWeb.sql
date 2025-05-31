SHOW DATABASES;

use CDWeb;

drop table category;
show tables;

select * from users;
-- INSERT INTO users (username, password, firstname, lastname, role)
-- VALUES ('user@example.com', 'password', 'Test', 'User', 'USER');

select * from Categories;
INSERT INTO categories (name) VALUES 
('Sofa'),
('Bench'),
('Bag'),
('Table'),
('Shelf'),
('Chair'),
('Cabinet'),
('Stool'),
('Desk'),
('Mirror'),
('Storage');

select * from products;
INSERT INTO products (`name`, `price`, `image`, `category_id`, `description`, `color`, `rating`)
VALUES
('Sofa Da Iris', 345, 'https://jangin.vn/wp-content/uploads/2021/12/iris-2024-22222.jpg', '1', 'Elegant leather sofa with a luxurious black finish.', 'Black', 4),
('Bench Park', 56, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRddVQq_YVJ-wecy4j9yopr2DKZJrKBehnSqQ&s', '2', 'Wooden bench perfect for outdoor garden spaces.', 'Brown', 4),
('Single Sofa Agnes', 140, 'https://www.made4home.com.vn/wp-content/uploads/2024/08/living-room-japandi-interior-design2-2.jpg', '1', 'Comfortable single-seat sofa with soft cushions.', 'Grey', 4),
('Cozy Bean Bag', 650000, 'https://m.media-amazon.com/images/I/81B08u5eKUL.jpg', '3', 'Soft and stylish bean bag for casual lounging.', 'Blue', 5),
('Minimalist Coffee Table', 89, 'https://m.media-amazon.com/images/I/81WnUhqBC1L._AC_SL1500_.jpg', '4', 'Simple wooden table with a modern touch.', 'Oak', 4),
('Nordic Lounge Chair', 210, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcpr-oCVu6rb7S49gHgksUThf5h_oalktedA&s', '6', 'Scandinavian design lounge chair with armrests.', 'White', 4),
('Bookshelf Tower', 78, 'https://m.media-amazon.com/images/I/71m485QDr6L.jpg', '5', 'Tall bookshelf suitable for small apartments.', 'Walnut', 3),
('Glass Dining Table', 195, 'https://m.media-amazon.com/images/I/91V1VeN+gtL.jpg', '4', 'Tempered glass table ideal for 4-person dining.', 'Transparent', 4),
('Modern TV Stand', 130, 'https://image.made-in-china.com/2f0j00uedczPBCALbp/Modern-TV-Stand-with-Projector-Sintered-Stone-Ash-Venner-MDF-Black-White.webp', '7', 'TV stand with drawers for extra storage.', 'Black', 3),
('Velvet Accent Chair', 99, 'https://modway.com/cdn/shop/files/EEI-4484-PNK_6.jpg?v=1733865251', '6', 'Cozy velvet chair perfect for reading corners.', 'Green', 4),
('Floating Wall Shelf', 32, 'https://m.media-amazon.com/images/I/61T1R41Wq8L.jpg', '5', 'Minimal wall shelf with invisible brackets.', 'White', 5),
('Round Ottoman', 45, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_MRCYhjE-RBtVkkZpciXgJtntBS_MkxaeIg&s', '8', 'Compact ottoman with fabric upholstery.', 'Grey', 4),
('Wooden Side Table', 56, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf-8i2uMzCoPFtV0fOq-JLv7y6N9y12vO1Aw&s', '4', 'Round side table made from solid oak.', 'Natural', 4),
('Classic Armchair', 178, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF0p5M0dud3g7chPeUyi_MddTBoJhfUWd1Mw&s', '6', 'High-back classic armchair with tufted design.', 'Cream', 4),
('Wall-mounted Mirror', 38, 'https://m.media-amazon.com/images/I/71NZ1NRFjsL._AC_UF894,1000_QL80_.jpg', '10', 'Frameless mirror for bathroom or hallway.', 'Silver', 5),
('Folding Study Desk', 97, 'https://m.media-amazon.com/images/I/71uuuFIlmRL._AC_UF894,1000_QL80_.jpg', '9', 'Foldable study desk with modern design.', 'Light Wood', 4),
('Rustic TV Cabinet', 147, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQimhIMygfQgMPjhvdZipZVLJAXnFiowWmfnA&s', '7', 'Rustic-style TV cabinet with barn doors.', 'Dark Brown', 4),
('Kids Toy Box', 51, 'https://m.media-amazon.com/images/I/91ET-+FIWdL._AC_UF894,1000_QL80_.jpg', '11', 'Bright and safe storage box for kids\' toys.', 'Multicolor', 5),
('Corner Bookshelf', 64, 'https://m.media-amazon.com/images/I/71to1HgO6pL._AC_UF894,1000_QL80_.jpg', '5', 'Space-saving bookshelf for room corners.', 'Pine', 4),
('Industrial Bar Stool', 70, 'https://i.ebayimg.com/images/g/ZroAAOSw2EtkJVFX/s-l1200.jpg', '8', 'Metal and wood bar stool with vintage look.', 'Rust', 4);

SHOW TABLES;
SELECT * FROM cart_items;
select * from Products;
