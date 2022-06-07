-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: session_learn
-- ------------------------------------------------------
-- Server version	8.0.28

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
INSERT INTO `commonkeys` VALUES (_binary '-----BEGIN ENCRYPTED PRIVATE KEY-----\nMIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQI5MX5KYXE0tcCAggA\nMAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBBW8JMApgBCfpQnlxzfZ8l8BIIE\n0CAmZ8QkjIbgbfhl0XYVLJh18GZQwGyL5daFo+zyHE9lsgw9xZp9Cw5q/GGs8JEh\nk3/s83DK1NXqk/JmidlOHX+iF7HTmdWqblXOu4Tc7tD2gtqFhHYqc8TLceAOfALk\np3DZ6pkzTxFfXgP54nSVdzCZzAwu3qXiYFE804z5UTqw7mZltnVDPzckTfSTEB1g\nz1CY+lDJsyo+UHSLUJbdtmtYoSnY0ffqJc+c+xTQ8dmWi1tP80ub8eBdTuauR5jG\nxDiIwvrxniMJGnseVeLcGvRwPBBVvCXxogHu+wJ/4VyQHN0vQsF7XyF6kO75NkFH\nLJpN39s0oovKjt2H7Z+QL/oA8gysv96GEEwgrZywAeT+aJwIFl4uXtnhhq+6rXve\nNogVjW33SHjiEPkY5SMKiVZDOb4sBW7ClA5MxEtWbDafvj490MD9dNnapW5/uEvr\nbQGTdBD1GfvL+mTBH7XmWeegHIZVtAWRHnxb7YtFQFtsIcaRLXPdVqwn3VSTwSLa\nZUekn5qhcjY0UJq6hETz5RxJYrTU78mkDNKVtLMm6nxTd0/VJ4d1JqXVAvGLpGwz\nWcogEuq265BvkTgjPwfaXXCbLMRCdMFOY1BxLFrntkSebDRoAeRmSvm9j9XioIRs\n84boSpgTjrgfb75ZHcjjjI2lwn5K2EHqi7eG/IzZWRcX0TFslzhTOW+Nh8O2yd14\nzHoUSz4sp+OBBypSOLqoEEvKO2cuiWCpqzGBfx2Evctl3FOcQtNHxlJd78fLeZVF\nLBcjShynn3Go+Am7lVtJaiHFhl9F3lL8sxPuNMHoUkgNJ8QSB/FuEhmRF8ChRVq4\nXBWw8R++rbWSsArsfofto+/OLJanoE1xrNpGXqdbArhyf6R1BLmFxxPFDlC2z7wE\nBqI01qS8jKq/j+NWBiJ7y6sJO8DR1EAvumEroCEIP5OS8XwraoS5Aa22zLjPiRbq\npiA6OQzCaRUtTLGMGFUNofLjkBRjNSvMWUAsRry2IvBWnO/HwFZ8/680yRJVv7RR\n68kkyMxqHQv67PWeNMEq+iLdb690y4yYX408otpVTn2Hrrj82KkI2L0DCIi7egQo\nyCvOLPf1EV7Za4h3ZjoQsOMvBFVPd0O15lqKCLlhrQYZwwWi31fG79tkXr/NYV0h\nPjIrXqDMEL9Pj8/HuJoda25CkzIJ2UwWrsViI1Tv1IJwQs9Uvad/an4HRmSBLqbR\n3DBEfOibjq64OpyXNAUS41PaY3P+EeHf/4b2X0eyOd0PGG5MoIVEBG7CxkYLG2/e\nFy8Ia5Dd77Z78HGOYQyhWFTFjxb9grHyFWl+iDQBJAPgceQyA199Ekm4n1bBEVvK\n72/+uw/TlRXHo6WdyZSKQygMhywwM/cclJCPrGTU6DejNjjFAAtt7MyPuD0Mcxtw\n8hJZg7HXJ2iuIxSobR2gndG3vXRuSWoOHeVsyWbxOjBZpSaY1bZzwFY6pI2wiyvz\nmXip5+Z1aPSPbhdShWy5n+6EHktvIaqqt5rS2zzXaqKDg9aaxmn6AJHeB0dBv8eM\nnC5bkG8BPjPAR11QA+2Zdd2kNgaEShfpTQ/PRdjIsq2Bt6vOpiHneIG1OCgJNLuT\nN7rP4uAAJdCEGoI4k79bkXIVqVwgF/hVZLx+kfCQlM0k\n-----END ENCRYPTED PRIVATE KEY-----\n',_binary '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqDkFzs11vpzgf+n6yyK4\nOmxkmV1S5mZRcK2XLfNhZg4LnTg72sY29Lzdj1RoQxcxpsbLIxAZJFdvntB7RWs4\n42Me6DtyN4VHZFHKF38n5r4moCJJXtn346zKPfSVjEGuVOZYsSZ/2h/Fx/N3Y5Rk\nuj5TD+jTvgchb0fFcfqT/7U7lu1TRU7Kv3MvNZO+nDkWEyFhTi80cUIz+j5n8DYj\n0P4ngbyVuPj6pULJGuxS73kL8cdMbXx9nyovM8IoWXjIWitVDwZGMgKlzjSfTVix\nviyhiHWqZGzo7uNDmfxgtz9OTXlqj2BiBzcCY/RCj3oys5Gn1paqHevwhsQk2RBo\nuQIDAQAB\n-----END PUBLIC KEY-----\n');
/*!40000 ALTER TABLE `commonkeys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exem`
--

DROP TABLE IF EXISTS `exem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exem` (
  `usrId` varchar(64) NOT NULL,
  `qKey` int NOT NULL,
  `qId` varchar(8) NOT NULL,
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
  `starttime` datetime DEFAULT NULL,
  `usrId` varchar(64) NOT NULL,
  KEY `usrId` (`usrId`),
  CONSTRAINT `exemtime_ibfk_1` FOREIGN KEY (`usrId`) REFERENCES `users` (`usrId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exemtime`
--

LOCK TABLES `exemtime` WRITE;
/*!40000 ALTER TABLE `exemtime` DISABLE KEYS */;
INSERT INTO `exemtime` VALUES ('2022-05-23 14:25:30','user1'),('2022-05-23 14:26:02','user2'),('2022-05-23 14:47:07','administrator');
/*!40000 ALTER TABLE `exemtime` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `qId` varchar(8) NOT NULL,
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
  `qId` varchar(8) NOT NULL,
  `qKey` int DEFAULT NULL,
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
  `score` int DEFAULT NULL
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
  `usrId` varchar(64) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `hashedPassword` blob,
  `sessionId` varchar(32) DEFAULT NULL,
  `fatt` int DEFAULT '0',
  PRIMARY KEY (`usrId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('administrator','administrator',_binary '$2b$10$f.V/MRQOMqxiYq9gB93maOLhsos1jcbcrs7clNTGT91OwaJ9xoksq','active',0),('user1','Ivanoff',_binary '$2b$10$ppzS/64XGCbmr1KkiK3rMuZ50hBR51iVUUq8eefQhj.LU1i/8xxlG',NULL,0),('user2','Petroff',_binary '$2b$10$.QjchyuPKQE7u8iSNMPhEOB6huzVeXVtN1C/F5e5dJwCmyckEh5z6',NULL,0),('user3','vasya',_binary '$2b$10$3LKM0twEolUa0ONcwJ8POuO6Y5SDhPosbPPGo92aaVlnI.nN9bcTm',NULL,0);
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
  `qId` varchar(8) DEFAULT NULL,
  `variant` char(1) NOT NULL,
  `descr` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`qKey`,`variant`),
  KEY `qId` (`qId`),
  CONSTRAINT `variants_ibfk_1` FOREIGN KEY (`qId`) REFERENCES `question` (`qId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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

-- Dump completed on 2022-06-07 13:32:57
