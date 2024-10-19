-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: producers_planet
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `producer_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `origin` varchar(45) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FK_products_categories` (`category_id`),
  KEY `idx_producer_id` (`producer_id`),
  CONSTRAINT `FK_products_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_products_producers` FOREIGN KEY (`producer_id`) REFERENCES `producers` (`producer_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (60,3,'Fresh Apples','Delicious and juicy apples from local orchards.',2.50,'kg',8,'image-1704632986013.jpg',4,'Lebanon'),(61,3,'Organic Oranges','Sweet and tangy organic oranges for a healthy snack.',3.00,'kg',8,'image-1704632820683.jpg',4.4,'Lebanon'),(62,3,'Carrot Bundle','Freshly harvested carrots, rich in vitamins.',1.99,'bundle',9,'image-1704632632809.jpeg',4.8,'Lebanon'),(63,3,'Potato Bag','Locally grown potatoes, perfect for various recipes.',4.99,'kg',1,'image-1704632913831.jpg',4.1,'Lebanon'),(64,3,'Eggs Dozen','Farm-fresh eggs from free-range chickens.',5.99,'dozen',1,'image-1704632672183.jpg',4.6,'Lebanon'),(65,3,'Honey Jar','Pure honey collected from our beehives.',8.99,'jar',7,'image-1704632717934.jpeg',4.6,'Lebanon'),(66,3,'Sunflower Seeds','Healthy sunflower seeds for snacking or cooking.',2.00,'kg',11,'image-1704633049325.jpg',4.35,'Lebanon'),(67,3,'Olive Oil Bottle','Extra virgin olive oil from local olive groves.',12.99,'bottle',12,'image-1704632756266.jpeg',4.55,'Lebanon'),(68,3,'Wheat Flour Pack','Premium quality wheat flour for baking.',3.49,'kg',13,'image-1704632955656.jpeg',3.35,'Lebanon'),(69,4,'Colorful Flowers Bouquet','A beautiful assortment of fresh flowers.',15.99,'bouquet',5,'image-1704633173964.jpeg',4.025,'Lebanon'),(70,4,'Potted Succulents Trio','Set of three unique succulent plants in decorative pots.',18.99,'set',5,'image-1704633507041.jpeg',4.2,'Lebanon'),(71,4,'Garden Soil Bag','High-quality garden soil for planting and gardening.',6.99,'bag',5,'image-1704633587614.jpeg',4.4,'Lebanon'),(72,4,'Rose Bush','Lovely rose bush for enhancing your garden.',12.49,'each',5,'image-1704633318730.jpeg',4.5,'Lebanon'),(73,4,'Lavender Bundle','Bundle of aromatic lavender for relaxation.',5.99,'bouquet',5,'image-1704633666439.jpg',4.4,'Lebanon'),(74,4,'Gardening Gloves','Durable and comfortable gloves for gardening.',8.00,'pair',5,'image-1704633712752.jpeg',4.5,'Lebanon'),(75,4,'Decorative Garden Stones','Assorted decorative stones for garden landscaping.',9.99,'pack',5,'image-1704633409381.jpeg',4.1,'Lebanon'),(76,4,'Watering Can','Classic watering can for easy and precise watering.',11.99,'each',5,'image-1704633462861.jpg',4.15,'Lebanon'),(77,4,'Basil Plant','Fresh basil plant for culinary use.',4.50,'each',5,'image-1704633212249.jpeg',4.75,'Lebanon'),(78,4,'Garden Trowel','Handy trowel for planting and soil maintenance.',7.50,'each',5,'image-1704633253591.jpeg',4.6,'Lebanon'),(89,8,'Fresh Eggs Dozen','Farm-fresh eggs from pasture-raised chickens.',5.99,'dozen',1,NULL,2.975,'Lebanon'),(90,8,'Lettuce Head','Crisp and fresh lettuce for salads and sandwiches.',1.79,'each',9,NULL,4.5,'Lebanon'),(91,8,'Honeycomb','Pure honeycomb filled with golden honey.',12.00,'each',7,NULL,3.9,'Lebanon'),(92,8,'Cabbage','Large cabbage for coleslaw or stir-fry dishes.',3.49,'each',9,NULL,3.3,'Lebanon'),(93,8,'Cherry Tomatoes Pint','Sweet and flavorful cherry tomatoes in a pint.',2.29,'pint',8,NULL,4.3,'Lebanon'),(94,8,'Garlic Bulb','Fresh garlic bulb for cooking and seasoning.',1.00,'each',9,NULL,3.2,'Lebanon'),(95,8,'Green Beans Bundle','Bundle of tender green beans for side dishes.',2.50,'bouquet',9,NULL,3.9,'Lebanon'),(96,8,'Pear Basket','Assorted pears in a convenient basket.',7.49,'basket',8,NULL,2.5,'Lebanon'),(97,8,'Broccoli Head','Nutrient-rich broccoli head for healthy meals.',2.99,'each',9,NULL,4.2,'Lebanon'),(98,8,'Blueberry Pint','Fresh blueberries in a pint for snacking or desserts.',4.50,'pint',8,NULL,4.4,'Lebanon'),(100,9,'Wooden Coasters Set','Elegant wooden coasters for a stylish touch.',18.00,'set',3,'image-1704632247375.jpeg',4.3,'Kuwait'),(102,9,'Leather Journal','Premium leather journal for writing and sketching.',28.99,'each',3,'image-1704632195234.jpg',4.45,'Kuwait'),(103,9,'Ceramic Tea Set','Beautiful ceramic tea set for tea enthusiasts.',22.50,'set',3,'image-1704632443281.jpeg',3.9,'Kuwait'),(104,9,'Handwoven Basket','Handwoven basket for storage or as a decor piece.',14.99,'each',3,'image-1704632311801.jpeg',3.4,'Kuwait'),(105,9,'Metal Candle Holders','Set of modern metal candle holders.',30.00,'set',3,'image-1704632404729.jpeg',3.8,'Kuwait'),(106,9,'Macrame Wall Hanging','Bohemian-style macrame wall hanging.',25.49,'each',3,'image-1704632163812.jpeg',4.5,'Kuwait'),(107,9,'Embroidered Pillow Covers','Artistically embroidered pillow covers.',12.00,'pair',3,'image-1704632117334.jpeg',4.5,'Kuwait'),(108,9,'Soy Wax Candles','Scented soy wax candles for a cozy atmosphere.',15.99,'set',3,'image-1704632363924.jpeg',3.6,'Kuwait'),(116,3,'fresh potato','the best potato in the world',0.90,'kg',1,'image-1704031133728.jpg',4.1,'Lebanon'),(117,3,'fresh tomato','the best tomato in the world',0.80,'kg',1,'image-1704633017834.jpeg',4.3,'Lebanon'),(139,10,'Organic Tomatoes','Plump and flavorful organic tomatoes.',3.00,'kg',8,'image-1704613485463.jpg',4.6,'Lebanon'),(140,10,'Cucumber Pack','Freshly harvested cucumbers, perfect for salads.',1.49,'pack',9,'image-1704613804760.jpg',4.5,'Lebanon'),(141,10,'Zucchini Bundle','Nutrient-rich zucchinis for various culinary uses.',3.00,'bouquet',9,'image-1704613707106.jpg',4.5,'Lebanon'),(142,10,'Spinach Bunch','Leafy and green spinach for a healthy diet.',2.50,'bunch',9,'image-1704614031692.jpg',4.1,'Lebanon'),(143,10,'Strawberry Basket','Sweet and juicy strawberries in a convenient basket.',6.99,'basket',8,'image-1704613909887.jpg',4.3,'Lebanon'),(144,10,'Cherry Jam Jar','Homemade cherry jam made from fresh cherries.',7.99,'jar',7,'image-1704613430320.jpg',4.7,'Lebanon'),(145,10,'Sweet Corn Dozen','Dozen of sweet and tender corn cobs.',4.50,'dozen',8,'image-1704613987982.jpg',4.3,'Lebanon'),(146,10,'Pumpkin','Large pumpkin for carving or cooking.',9.99,'each',8,'image-1704614072932.jpg',3.5,'Lebanon'),(147,10,'Radish Bundle','Bundle of crisp and colorful radishes.',1.00,'bouquet',5,'image-1704613147772.jpg',3.35,'Lebanon'),(148,10,'Apricot Jam Jar','Delicious apricot jam with natural sweetness.',8.49,'jar',7,'image-1704613856752.jpg',4.3,'Lebanon');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_producer_rating` AFTER UPDATE ON `products` FOR EACH ROW BEGIN
  DECLARE total_rating FLOAT;
  DECLARE total_products INT;
  DECLARE new_producer_rating FLOAT;

  -- Calculate total rating and total number of products with ratings for the producer
  SELECT SUM(rating), COUNT(*) INTO total_rating, total_products
  FROM products
  WHERE producer_id = NEW.producer_id AND rating IS NOT NULL;

  -- Check if there are products with ratings before calculating the new rating
  IF total_products > 0 THEN
    -- Calculate the new average rating for the producer
    SET new_producer_rating = total_rating / total_products;

    -- Update the producer_rating in the producers table
    UPDATE producers
    SET rating = new_producer_rating
    WHERE producer_id = NEW.producer_id;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-10 13:25:48
