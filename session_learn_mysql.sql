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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='		';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commonkeys`
--

LOCK TABLES `commonkeys` WRITE;
/*!40000 ALTER TABLE `commonkeys` DISABLE KEYS */;
INSERT INTO `commonkeys` VALUES (_binary '-----BEGIN ENCRYPTED PRIVATE KEY-----\nMIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIdJCQz+NDVrkCAggA\nMAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBAjx5DkpLuufRufsaCovDn8BIIE\n0HJbl28t3l67+v239HAR+t3bhENWr0+M1uV9CWb00qmtMSqUwUtLXR3ckChbJyxd\nI3UBbx8fqLKsyLqlUCJnUSnFIesrN/Doae5BMbCuB8Ovw70J1OdWfSUlKA2DkREP\nvRtLbjtY2iHwAPsxtVAVlSW0yuKWJxeQHGvtVmSmNNsDRJoWV9afhFKb0VhYk80T\nCI8JyzMg/gSwIiFusFhJg0ONnasSKRnAKZ58zsnmDyckkMgzy7B9tppMm8TtaAD4\nEEkC43DnRKL06hfDnvORp9vSyUeA06pyt3N4VdwoyNyGq05hplQE56BW7g72h9bg\nNakOT94APvzx8Noiy506WCJsacy7u4DH4SCv/Fwcv6ei6VTGvqtZy4lciujrZtAd\n/NgPOxt7Bm75bYXl8YN9L2hnn6FYFuwysQhBg7ulqrQND9g3wQWaEKszzSZQNsJ1\n+TiSCl2sd8zOP4j54FH578RNwXL/Uu4YBlG0jDf5ii/R3r2Fm/xT3UkKrqbj+uOP\nCnaKdh1RX6E4YKgdqd8LQGP+cEOktbAWHlvODLAY0FL33lFFZmkTFtGRpgD3MOHa\nZkt3JT5wiBs5Z1OtjT+hiG26EJFKJwuIWqOBxwnbbXq87xDkDosYj5yEuOmyAspr\n2IBmN7D49lVI3cWYwis1UwSfstX4NCP5X4oFliXQJ14fMZfUSqmWIMAP463Vrd06\n1CfKsgBTfx+8oD/Ij2GW5B8EO9Jbpbcxx/CX5P1AzrbjIncCEnYLsR7Lpj2k5CsA\n1eBPb9p8DRD5Rlsz/zqMi4HkBXEg+IGuhSm3Q8x2FhRcCZV/SaQ/ygSQs0xzJQdz\nXR8k9Sx2mOS0/JRAbmEDZemXShHYCqVABpzPPeJjvvckiYtEsHyA04+DcSQZhc2x\nQSyUhVtbd+CHLe26UFc8COZCmO9aqCKlcazaRwL9WO7Z8VYpSx8VkizSA7TzkWdd\n3+9M0owHTIGQOpkOCQ96JaAJIUF/+UXCDOPPQQPGVtxZBO067Wgf0Ggs8svl0KjT\nk91bZeyIvQbmmONpOHhyhiET4InOQJBIHum/wMI2flEAz/1blz5VfF0IDhwedR33\nU495epdwGMg06L2PE9iJZBcBJioSj99gXkFdqvr9y4mIEMBPwEhLjViYifhekRUA\ntqoaqlbKWd8Cu/rcsnBXO9kHFOwazlJYZiWNJos47rUm/f+dzSYdNQC5WSOfwJ+W\nlYJqxVrog6iasIFUJauW274SptH3VrQKoNUQRJesBCjWKTxWXUgt5oaimzGmoEWc\n4orMDrj3sme8aZuM/yB46ngnwzPnI6MjFqUeL4/mWVrqEBTTw+tErDTyq4rDQl3A\ndO1AoSH9CP0g6vdHSewjnHi9ftR5b8O2ODGb8YDFhi4D6Hviyb2jHkFvhr8L4uEW\nDBThaqcmxL7jgYk2VMck7eSETlSCVGF+pxmKO9O+2jGraQ9ftcNrLITc6sIBye5Q\nCb/8Tu+PUsxbAav99PnBGnFr/y0VZwJ03RsIsSjV05CELCQbKlju+f3lWISpAy/b\naPAe2Gz4qrd5zQPbgB8BeVM5lwXEuavvE4o7O2av33WNJrTSCm/ByjM7asNbMZGX\nyuaDGrdDBDWRzZPDRp+SkveIwcCMqzkZ6Hc87G/11BF+\n-----END ENCRYPTED PRIVATE KEY-----\n',_binary '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA98rf2C5I/s1INTq8pL0B\nwSkUo/Az1WkU9J3pj51P8INhaAEA+i8QSLianLiccIWSnHV4Z4Mm3FzHOrtWyGKA\nhcL1zoaSG/cQmx1GxneHYQNa6qec3GtY333F21bOPPqv2Wno8xyApbPOasj0Ifyn\nLpW+l//Ds6jCQTQFGHSHniQdg72lpBH1Y4S6Bcr4Jl8YCuHV/WJmonGzVOUj/nis\nD9/Pd3oDH1Sc3Z7wkX/8IYoHKAznva6DEExzlSW+bVhuYlndjbUO9TahXToz+imK\nOdrpCSB5fVtzquQ757QPMnrgUrTkqgm2wqHeUss4F3z3xYpqixCKZWdtcBDnT8x0\n9wIDAQAB\n-----END PUBLIC KEY-----\n');
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
  KEY `key3_idx` (`qKey`) /*!80000 INVISIBLE */,
  KEY `key3_idx1` (`usrId`,`qId`),
  CONSTRAINT `key3` FOREIGN KEY (`qKey`) REFERENCES `variants` (`qKey`) ON DELETE CASCADE
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
  KEY `usrId` (`usrId`),
  CONSTRAINT `exemtime_ibfk_1` FOREIGN KEY (`usrId`) REFERENCES `users` (`usrId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exemtime`
--

LOCK TABLES `exemtime` WRITE;
/*!40000 ALTER TABLE `exemtime` DISABLE KEYS */;
INSERT INTO `exemtime` VALUES (4,'2022-07-07 10:41:19'),(3,'2022-07-07 11:17:53');
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
  KEY `key2_idx` (`qKey`),
  CONSTRAINT `key2` FOREIGN KEY (`qKey`) REFERENCES `variants` (`qKey`) ON DELETE CASCADE
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
  `score` int NOT NULL,
  PRIMARY KEY (`score`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score_trigger`
--

LOCK TABLES `score_trigger` WRITE;
/*!40000 ALTER TABLE `score_trigger` DISABLE KEYS */;
INSERT INTO `score_trigger` VALUES (3);
/*!40000 ALTER TABLE `score_trigger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `usrId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `hashedPassword` blob,
  `sessionStatus` int DEFAULT NULL,
  `fatt` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`usrId`),
  KEY `ind01` (`name`) USING BTREE /*!80000 INVISIBLE */
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'administrator',_binary '$2b$10$hxvyemrRmGNgqgC8slZkEOWHftOKgXiFgOWnZmXdfH2uArSQyUhKa',-1,0),(4,'user1',_binary '$2b$10$Oj5bYpOcISEZSD9q0aR.tudhjvKfkwbWmK8IR80kdV0HYcs7k6FlC',-1,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
  PRIMARY KEY (`qKey`),
  KEY `k1_idx` (`qId`),
  KEY `k2_idx` (`variant`),
  CONSTRAINT `k1` FOREIGN KEY (`qId`) REFERENCES `question` (`qId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

-- Dump completed on 2022-07-07 11:50:05
