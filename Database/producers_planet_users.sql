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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(45) NOT NULL DEFAULT 'consumer',
  `fullname` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `unique_email` (`email`),
  KEY `idx_users_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (20,'king of art','abd.mhd@hotmail.com','$2a$10$/qLnH8mRMwsTcJK.1awl7uVprbFAhX/rnuZVB3Hg1xn4FVuEG8G72','producer','dafinchi dafinchi','image-1704563345034.jpg'),(21,'khoudrawat producer','abd.mh2@hotmail.com','$2a$10$05i22.ppPCRt.xWXQ7D/Mu8MT0Bk6L72HSfokP2l5ae41r8JM7INC','producer','mohamad madi','image-1704010599833.jpg'),(22,'the gardener','abd.hd12@hotmail.com','$2a$10$rj9vrmjfgrva/Z6U373omul3opZ82MmK9PAvjigEIiNxu3MmWziIC','producer','santos santos','image-1703439993165.jpg'),(23,'abed m','abd.34234@hotmail.com','$2a$10$mBbEJxohKIYS5kyKJz5e8.IA1dq0lBcVFICpypJeJNoap2gqIOEZO','producer','Abdelaziz ','image-1703440041450.jpeg'),(24,'The Farmerest','abd.mhd111@hotmail.com','$2a$10$aGShQkw4kBc/VcXmNqteLeHHe1ADPxyEudvPTzbu4MuaaIrgN1Yra','producer','micheal haj','image-1704631576443.jpeg'),(26,'market','producer.producer@hotmail.com','$2a$10$oyFxzT9lk1PbNN5hxE2n/OHj52OlpUi5T7IPkwVdYsPVdjIQ4o13y','consumer','Abdel aziz mouhamad',NULL),(29,'UserUser','user.user@hotmail.com','$2a$10$fKtrkXHpzovj44H/H30MyuSuym6BwaHR0gnVeKkIIQJO67CT1meE2','consumer',NULL,NULL),(30,'gg','abd.mhd11221@hotmail.com','$2a$10$B0YeSNKUpU20hkdA0/yXn.IZt5WP5yJKXViwDmv.dEskXZ9s87OKm','consumer',NULL,NULL),(31,'mahmoud','mahmoud.khouja@hotmail.com','$2a$10$5ijXWhxAcz0cMm498YLaNOVSxtNQJ3cqDrhCuRsrHpAGNHWVF3yrK','consumer',NULL,NULL),(32,'ha','an.an@hotmail.com','$2a$10$c44d4Mag44CeDkZYCrfg0.5CZ7u4WzYqTdoIM4lQwQqufJsiP1zpS','consumer',NULL,NULL),(33,'abed','test.test@hotmail.com','$2a$10$0jJpcz4kDrCiwgHkk9OuB.oExSHIg3AlORphqV29TpMfthqh6M7tK','producer','wassim','image-1704703435764.jpeg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
