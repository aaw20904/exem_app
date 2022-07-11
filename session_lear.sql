-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: session_learn
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `commonkeys`
--

DROP TABLE IF EXISTS `commonkeys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commonkeys` (
  `priKey` blob,
  `pubKey` blob
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commonkeys`
--

LOCK TABLES `commonkeys` WRITE;
/*!40000 ALTER TABLE `commonkeys` DISABLE KEYS */;
/*!40000 ALTER TABLE `commonkeys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exem`
--

DROP TABLE IF EXISTS `exem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exem` (
  `usrId` int NOT NULL,
  `qKey` int NOT NULL,
  `qId` int NOT NULL,
  PRIMARY KEY (`usrId`,`qId`),
  KEY `qKey` (`qKey`),
  CONSTRAINT `exem_ibfk_1` FOREIGN KEY (`qKey`) REFERENCES `variants` (`qKey`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exem`
--

LOCK TABLES `exem` WRITE;
/*!40000 ALTER TABLE `exem` DISABLE KEYS */;
/*!40000 ALTER TABLE `exem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exemtime`
--

DROP TABLE IF EXISTS `exemtime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exemtime` (
  `usrId` int NOT NULL,
  `starttime` datetime DEFAULT NULL,
  KEY `exemtime_ibfk_1` (`usrId`),
  CONSTRAINT `exemtime_ibfk_1` FOREIGN KEY (`usrId`) REFERENCES `users` (`usrId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exemtime`
--

LOCK TABLES `exemtime` WRITE;
/*!40000 ALTER TABLE `exemtime` DISABLE KEYS */;
/*!40000 ALTER TABLE `exemtime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `qId` int NOT NULL,
  `introduction` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`qId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responses`
--

DROP TABLE IF EXISTS `responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responses` (
  `qId` int NOT NULL,
  `qKey` int NOT NULL,
  PRIMARY KEY (`qId`),
  KEY `qKey` (`qKey`),
  CONSTRAINT `responses_ibfk_1` FOREIGN KEY (`qKey`) REFERENCES `variants` (`qKey`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responses`
--

LOCK TABLES `responses` WRITE;
/*!40000 ALTER TABLE `responses` DISABLE KEYS */;
/*!40000 ALTER TABLE `responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `score_trigger`
--

DROP TABLE IF EXISTS `score_trigger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score_trigger` (
  `score` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score_trigger`
--

LOCK TABLES `score_trigger` WRITE;
/*!40000 ALTER TABLE `score_trigger` DISABLE KEYS */;
INSERT INTO `score_trigger` VALUES (2);
/*!40000 ALTER TABLE `score_trigger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `usrId` int NOT NULL,
  `hashedPassword` blob,
  `status` int DEFAULT '-1',
  `fatt` int DEFAULT '0',
  PRIMARY KEY (`usrId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_names`
--

DROP TABLE IF EXISTS `users_names`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_names` (
  `name` varchar(20) NOT NULL,
  `usrId` int NOT NULL,
  PRIMARY KEY (`name`),
  KEY `users_names_ibfk_1` (`usrId`),
  CONSTRAINT `users_names_ibfk_1` FOREIGN KEY (`usrId`) REFERENCES `users` (`usrId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_names`
--

LOCK TABLES `users_names` WRITE;
/*!40000 ALTER TABLE `users_names` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_names` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variants`
--

DROP TABLE IF EXISTS `variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variants` (
  `qKey` int NOT NULL AUTO_INCREMENT,
  `qId` int NOT NULL,
  `variant` int NOT NULL,
  `descr` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`qKey`,`qId`),
  KEY `qId` (`qId`),
  CONSTRAINT `variants_ibfk_1` FOREIGN KEY (`qId`) REFERENCES `question` (`qId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variants`
--

LOCK TABLES `variants` WRITE;
/*!40000 ALTER TABLE `variants` DISABLE KEYS */;
/*!40000 ALTER TABLE `variants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-11 20:13:53
