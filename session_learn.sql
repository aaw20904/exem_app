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
INSERT INTO `commonkeys` VALUES (_binary '-----BEGIN ENCRYPTED PRIVATE KEY-----\nMIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQIuEWILmDW1LECAggA\nMAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBAcbqA2RPjlsJ/6rtYdf5R+BIIE\n0NmyCtPFMCnDklDGVVWl72acREDguB58LFCbHvpCuZ8EtMViQzY248cddkgYgsRI\ntXi5J/muGKVoB0GBnKVn1Xdg1QX00VxK9At9EooAElkyZWdM29enKIsAeN9x5KZU\nZmk1r10M6ghugs3YruBuk6qurO2jzc06flahxKCEXHzjQDAKt5MIHpRF9UrhDL8+\naeSSAfJrWhfS8Dke82UGU5PuYvOPKihBYWTPMv7W54eXGzo9jkW0Z2mDuqZvKMnM\n/fgRZ2QaXQOGC5Wu7U6yJAkK0p1TOw+IZtUBG3sT4HQwTfRTMkLrAEZ602gZ5CRi\nDdzaNzGva87fvwXu7H29X0H5CkXnrS7d0GYjEwP6ycdhFKLjll16UB0HSLe/8jjp\nNWg1fhtM2UfkTxKD5pEqt7OVqHyDHS+mRfVnlSDPdkdtkIwyuFwCKPMSRK5AoP5U\n7AnyTA1daswK2vEp2zmccVXtZJUJraa/Czi6ZrxJBQmLIRBtb3Qn5O0Tz91plAlg\nvGY8OFryIKwkUL2KXfGLtUMcQSW1YmNrHQ2M6k83ElSZLao10fppybXeWjl8vGPs\nXg+nd3gWQiaMYnALB6QB99Fms2cUzWEok9e1KYn7Gg/ZRZOnW0nNmKEePuCdtfns\n3LBjxnmxDPqLzL1qZVEjUmomdDNHjfvMP0nU5eTpG1JwvX4MHFH+mmR4ahpEWss+\n4Y/ygZwL86OLYxqIEdMbFgRJRNMK+DyXf9L8MEQk1l/7PYfvWNM59CAWzLJyy2A4\nh2n7HnwQuCpsvub20qw2mMl/G+y6b/kgCImWY7kk3rR2EAm40slx32RSpIW4tVAo\nHxsiyIFyfRCkCTo44sS1ssdiGHjCJlvSFwHgabpQTrCj2RJa5qdmRSbTknmN7A9U\nfRg9XEv2MhGztPTsBQOt0ZYj4+Xy9EmM0f+PiEcAI8gpfdNLI2oSffFYk64ptyEw\nnVT6+XrpLoLeXMb+eoGtXb1n3WJhaP/sjuh4e30iCJ4kBl3CQ7EAIeAs2DO2Q86P\n3wjZekBeJH6oAO74S15RlZUXnnvxx5KcU/AB2YzneiqhkcTRSwD+whfSsuUAxWr4\nUf07k+XEnTxA6mc4lmJqTA2TwJh7lr6dcP6wCdSQ9WqshH2nPfjQfLIRiZJKdEY+\nBQi3DMlaKJnNxndxcIVKaFIkJHmaRL/4lkE8VeZd/KC8+ApShhtOUEB57o58ZbDs\nIr7/yZupc7NN3zQ17r8VxTf7C3vINUrOHHc3va+rbTm1l5ViJmro38caEGDtA+vi\n+ELL+qzb/nNvjmQLRHlotAOsQ4wSPv2yXXMk1G7s9LYuanXCXn6LFOdc+NYtjESz\n7Ti5itnfEvpJkMJUcQLd/bbIqZ2RqPp1RtmyXVgrn/qulAo0hWtw6oNZCWYpSMEM\nPoZKKsLMzV3dR1vn2HGojbzVAIFv+o9bdPgqJwx/V8IQDmgLlRj+r+1k6Jl/Phoa\nZZ3FwdXl026tv9Gt246N6S5dnp/FDcS5WGrXRBBgZWoXiMRFc9cUfItcttoU/NOJ\nyftE0tpmJnKijYBbhoXfjuHFAHkfOrUW4gFDVUbRNWtNacCQCtX1peWDHJ69HfVf\nrmQBxhMmDv9PRCW9EbRZY1SD2cJnkw3/YBQUMJxGc0ro\n-----END ENCRYPTED PRIVATE KEY-----\n',_binary '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuiC4316sp/hRdJ+qULma\nq87EvsRxXYMge0uLpgFQ8IXt3lpNM5laX6MBd3++nPvgpufbok4mCJL+uxA9L3A6\nX7QiI1sCi6jTdA8FlPuuVOMrETBg18epzN/+Jv6x9beBTSwTTdAV9/8sYI1qe20Q\nLRDO5iDcszSMTlYKAn8kP0poriFyGXCZcGOppb+G4my+Q7ZkIUnkcLPpfzo4J7ih\nxapd8BQvUjWoR+cfIpDMCRDp9/l8oM304Kebb6Ej/bUnrYOtN2y4yF/D2khHK0Ja\nzy79VDlVHRdGJcYlxmG6r81v3FCovMw9WA4d7S7Q8x/3Izf4DcBNRzXLjnO39XyY\n1wIDAQAB\n-----END PUBLIC KEY-----\n');
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
INSERT INTO `exem` VALUES (4,4,1);
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
INSERT INTO `exemtime` VALUES (3,'2022-07-05 12:49:00'),(4,'2022-07-05 13:49:15');
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
INSERT INTO `question` VALUES (1,'1+5='),(2,'3*3'),(3,'Who is putin?');
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
INSERT INTO `responses` VALUES (1,5),(2,8),(3,13);
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
  `usrId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `hashedPassword` blob,
  `sessionStatus` int DEFAULT NULL,
  `fatt` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`usrId`),
  KEY `ind01` (`name`) USING BTREE /*!80000 INVISIBLE */
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'administrator',_binary '$2b$10$hxvyemrRmGNgqgC8slZkEOWHftOKgXiFgOWnZmXdfH2uArSQyUhKa',1,0),(4,'user1',_binary '$2b$10$Oj5bYpOcISEZSD9q0aR.tudhjvKfkwbWmK8IR80kdV0HYcs7k6FlC',1,0);
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
  CONSTRAINT `k1` FOREIGN KEY (`qId`) REFERENCES `question` (`qId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variants`
--

LOCK TABLES `variants` WRITE;
/*!40000 ALTER TABLE `variants` DISABLE KEYS */;
INSERT INTO `variants` VALUES (4,1,1,'2'),(5,1,2,'6'),(6,1,3,'22'),(7,2,1,'8'),(8,2,2,'9'),(9,2,3,'21'),(13,3,1,'hujlo'),(14,3,2,'kind'),(15,3,3,'picefull');
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

-- Dump completed on 2022-07-05 14:01:58
