CREATE TABLE `Products` (
    `Id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
    `ProductId` varchar(13) NOT NULL,
    `brand_name` varchar(50) DEFAULT 'NO_Brand',
    `product_name` varchar(100) DEFAULT NULL,
    `mrp` decimal(10, 2) DEFAULT NULL,
    `final_price` decimal(10, 2) DEFAULT NULL,
    `Qty` INT NOT NULL DEFAULT 0 COMMENT 'add quntity here',
    `unit` VARCHAR(10) NOT NULL COMMENT 'mg, kg, ml, l, dergon, pair',
    `category` varchar(50) DEFAULT NULL,
    `description` TEXT,
    PRIMARY KEY (`Id`),
    UNIQUE KEY `ProductId` (`ProductId`),
    KEY `category` (`category`),
    CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`category`) REFERENCES `catagory` (`categoryName`)
);


INSERT INTO `Products` VALUES
(1, 'prod_1', 'Amul','Amul Gold Milk',60.00,55.00, 500, 'ml', 'Milk_Product','Full cream milk for daily use.'),
(2, 'prod_2', 'NO_Brand','Fresh Apple',150.00,120.00, 1, 'kg','Fruits','High-quality fresh apples from Kashmir.'),
(3, 'prod_3', 'NO_Brand','Organic Potato',40.00,35.00,100, 'g','Vegitables','Fresh organic potatoes directly from farms.'),
(4, 'prod_4', 'MotherDairy','Mother Dairy Butter',250.00,230.00, 100, 'g' ,'Milk_Product','Pure and creamy butter for daily use.'),
(5, 'prod_5', 'Amul','paneer',80.00,80.00, 100, 'g', 'Milk_Product','Pure and creamy butter for daily use.'),
(6, 'prod_6', 'NO_Brand','Banana',60.00,50.00, 12, 'pice', 'Fruits','Fresh and naturally ripened bananas.');

CREATE TABLE `catagory` (
  `id` smallint(6) NOT NULL COMMENT 'index',
  `categoryName` varchar(30) NOT NULL COMMENT 'Category Name',
  `images` varchar(50) DEFAULT NULL COMMENT 'Thumbnail Image for catogroy',
  `color` varchar(25) DEFAULT NULL COMMENT 'Row color for cotagory row',
  `altText` varchar(20) NOT NULL DEFAULT 'catagory Image' COMMENT 'alternet text for img tag'
)  COMMENT 'This Table is contains Product Category name, their thumb image, and color for row';


INSERT INTO `catagory` (`id`, `categoryName`, `images`, `color`, `altText`) VALUES
(1, 'Fruits', 'FruitThumbnail.png', 'rgb(255, 166, 0)', 'Fruit Catagory'),
(2, 'Vegitables', 'VegetablesThumbnail.png', 'rgb(34, 238, 34)', 'Vegetables Catagory'),
(3, 'Milk_Product', 'MilkProductThumbnail.png', 'rgb(255, 239, 196)', 'MilkProduct Catagory');


CREATE TABLE ProductImages (
	Id SMALLINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT "index",
	ProductId VARCHAR(13) NOT NULL UNIQUE ,
	ThumImage VARCHAR(50) NOT NULL DEFAULT "img/notFound.svg" COMMENT "Thumbnail Image",
	mainImage VARCHAR(50) NOT NULL COMMENT "main Image for ",
	OthImage VARCHAR(255) COMMENT "all other Images",
	FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
) COMMENT 'this store all image of products';

INSERT INTO ProductImages (ProductId, ThumImage, mainImage, OthImage) VALUES
('prod_1', 'anuml500ml.jpg', 'anuml500ml.jpg', 'amul500ml_back.jpg, amul500ml_Discription.jpg'),
('prod_2', 'apple.jpg', 'apple.jpg', 'apple.jpg, apple.jpg'),
('prod_3', 'pineapple.jpg', 'pineapple.jpg', 'pineapple.jpg, pineapple.jpg'),
('prod_4', 'strobary.jpg', 'strobary.jpg', 'strobary.jpg, strobary.jpg'),
('prod_5', 'orange.jpg', 'orange.jpg', 'orange.jpg, orange.jpg'),
('prod_6', 'banana.jpg', 'banana.jpg', 'banana.jpg, banana.jpg');

CREATE VIEW ProductWithImages AS
SELECT 
  p.ProductId,
  p.brand_name,
  p.product_name,
  p.mrp,
  p.final_price,
  p.Qty,
  p.unit,
  p.category,
  c.color AS categoryColor,
  pi.ThumImage,
  pi.mainImage,
  pi.OthImage
FROM Products p
INNER JOIN ProductImages pi ON p.ProductId = pi.ProductId
INNER JOIN catagory c ON p.category = c.categoryName;


