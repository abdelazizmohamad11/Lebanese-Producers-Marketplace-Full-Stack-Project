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
-- Table structure for table `producers`
--

DROP TABLE IF EXISTS `producers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producers` (
  `producer_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `bussiness_category` int NOT NULL,
  `location` varchar(255) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `rating` float DEFAULT NULL,
  PRIMARY KEY (`producer_id`),
  KEY `FK_producers_bussiness_category_idx` (`bussiness_category`),
  KEY `idx_producers_user` (`user_id`),
  CONSTRAINT `FK_producers_bussiness` FOREIGN KEY (`bussiness_category`) REFERENCES `bussiness_category` (`bussiness_category_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_producers_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producers`
--

LOCK TABLES `producers` WRITE;
/*!40000 ALTER TABLE `producers` DISABLE KEYS */;
INSERT INTO `producers` VALUES (3,21,1,'akkar','88888888','As a seasoned farmer committed to sustainable agricultural practices, I bring a wealth of experience in cultivating high-quality crops while respecting the environment. Through years of dedicated work, I have honed my skills in crop rotation, pest management, and soil enrichment to ensure the long-term fertility and productivity of my fields. My diverse expertise spans a variety of crops, from staple grains to vibrant fruits and vegetables. By embracing innovative technologies and staying attuned to the latest agricultural trends, I strive to contribute to a thriving farming community and provide consumers with nutritious, responsibly grown produce.\n\n',4.28636),(4,22,3,'akkar','71111111','With a green thumb and a deep love for nurturing plant life, I am a dedicated gardener who finds joy in transforming outdoor spaces into vibrant, thriving havens of beauty. From meticulously planning landscape designs to cultivating a diverse array of plants, my expertise extends to ornamental flowers, aromatic herbs, and lush greenery. Passionate about sustainable gardening, I implement eco-friendly practices such as composting, rainwater harvesting, and natural pest control. Whether creating serene backyard retreats or tending to community gardens, I believe in the transformative power of gardening to enhance both the environment and the well-being of those who enjoy these green spaces.',4.3625),(8,23,1,'Boulevard','76464062','I\'m a farmer',3.7175),(9,20,2,'ras maska','88888888','I\'m an Artisian',4.05),(10,24,1,'akkar','06121212','Welcome to the farmerest\'s Farm – where passion meets the soil. Nestled in the heart of Lebanon, we cultivate more than crops; we sow the seeds of a sustainable and vibrant community. With hands weathered by hard work, we embrace the rhythms of nature to bring you the freshest produce. Join us in the journey from seed to harvest, where every day is a celebration of the land\'s abundance.',4.215),(12,33,33,'tripoli','88888886','i\'m an artist',NULL);
/*!40000 ALTER TABLE `producers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-10 13:25:48
