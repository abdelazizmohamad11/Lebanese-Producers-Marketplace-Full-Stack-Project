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
-- Table structure for table `product_reviews`
--

DROP TABLE IF EXISTS `product_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_reviews` (
  `product_reviews_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `product_review` float DEFAULT NULL,
  PRIMARY KEY (`product_reviews_id`),
  KEY `FK_product_product_reviews_idx` (`product_id`),
  KEY `idx_product_reviews_product` (`product_id`),
  CONSTRAINT `FK_product_product_reviews` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `product_reviews_chk_1` CHECK (((`product_review` >= 0) and (`product_review` <= 5)))
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_reviews`
--

LOCK TABLES `product_reviews` WRITE;
/*!40000 ALTER TABLE `product_reviews` DISABLE KEYS */;
INSERT INTO `product_reviews` VALUES (35,60,4),(36,61,4.4),(37,62,4.8),(38,63,4.1),(39,64,4.6),(40,65,4.6),(41,66,4.9),(42,67,5),(43,68,3.8),(44,69,5),(45,70,4.2),(46,71,4.6),(47,75,4.1),(48,76,4.2),(49,77,5),(50,73,4.4),(51,67,4.1),(52,71,4.2),(53,90,4.5),(54,89,4.7),(57,76,4.1),(58,77,4.5),(59,66,4.6),(60,66,4.3),(61,89,4.8),(62,66,3.6),(63,68,2.9),(64,69,4.6),(65,148,4.3),(66,142,4.1),(67,69,5),(68,116,4.1),(69,147,5),(70,146,3.5),(71,145,4.3),(72,144,4.7),(73,143,4.3),(74,95,3.9),(75,72,4.5),(76,96,4.6),(77,97,4.2),(78,102,4.4),(79,102,4.5),(80,98,4.4),(81,100,4.3),(83,78,4.6),(84,74,4.5),(85,94,3.2),(86,93,4.3),(87,92,4.8),(88,103,3.9),(89,106,4.5),(90,107,4.5),(91,108,3.6),(92,141,4.5),(93,140,4.5),(94,139,4.6),(95,105,3.8),(96,91,3.9),(97,117,4.3),(98,104,3.4),(99,116,4.1),(102,92,1.8),(103,89,1.7),(104,89,0.7),(105,96,1.3),(106,96,1.6),(107,147,1.7),(108,69,1.5);
/*!40000 ALTER TABLE `product_reviews` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_product_rating` AFTER INSERT ON `product_reviews` FOR EACH ROW BEGIN
  DECLARE total_rating FLOAT;
  DECLARE total_reviews INT;
  DECLARE new_rating FLOAT;

  -- Calculate total rating and total number of reviews for the product
  SELECT SUM(product_review), COUNT(*) INTO total_rating, total_reviews
  FROM product_reviews
  WHERE product_id = NEW.product_id;

  -- Calculate the new average rating for the product
  SET new_rating = total_rating / total_reviews;

  -- Update the product_rating in the products table
  UPDATE products
  SET rating = new_rating
  WHERE product_id = NEW.product_id;
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
