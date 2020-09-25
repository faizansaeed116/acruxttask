-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: etiop
-- ------------------------------------------------------
-- Server version	8.0.21

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
  `ID` int NOT NULL AUTO_INCREMENT,
  `FNAME` varchar(45) DEFAULT NULL,
  `LNAME` varchar(45) DEFAULT NULL,
  `MNAME` varchar(45) DEFAULT NULL,
  `EMAIL` varchar(60) DEFAULT NULL,
  `PHONE` varchar(45) DEFAULT NULL,
  `ADDRESS` varchar(100) DEFAULT NULL,
  `CITY` varchar(45) DEFAULT NULL,
  `GENDER` varchar(45) DEFAULT NULL,
  `COMPANY` varchar(100) DEFAULT NULL,
  `ROLE` varchar(100) DEFAULT NULL,
  `TITLE` varchar(45) DEFAULT NULL,
  `ISDEL` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Muhammad','Swati','Omer','omerswati@gmail.com','03445566766','Atar Sheesha','Balakot','Male','Own','DEVELOPER','CEO',1),(2,'sdsadsad','dsadasd','dsadasdasd','sdad','231321312','dsad@gmail.com','dasdasd','Female','dasdasd','asdsdasd','dsadsad',1),(3,'Sohail','Anwar','SA','sohailanwar@gmail.com','03455465543','F10','Islamabad','Male','Acrux','Developer','',0),(4,'Munir','Tariq','','Munir Tariq','','F7','Islamabad','Male','ACRUX','Developer','DEVELOPER',1),(5,'Ozair','Anwar','','ozairanwar@gmail.com','03345454321','kohala','Haripur','Male','Lean Automation','Front End Development','Internee',0),(6,'Haris','Rashid',NULL,'harisrashid@gmail.com','03345465678','Loharbanda','Mansehra','Male','Student',NULL,NULL,0),(7,'Faisal','Qureshi','Ahmed','faisal.ahmed@acruxtek.com','03455433443','H13','Islamabad','Male','Acux Technologies','Developer','Employee',0),(8,'Faizan','FS','Saeed','faizansaeed116@gmail.com','23032030203','Loharbanda','Mansehra','Male','Acrux','','',0),(9,'Faizan','FS','Saeed','faizansaeed@gmail.com','032313213','dsa','hb','Male','jhb','','hbjh',1),(10,'Syed Azaz Hussain','Shah','','SyedAzazHussainShah@gmail.com','03213454343','Darwaish','Haripur','Male','Code Informatics','Internee','Web Developer',0),(11,'Zohaib','Tanoli','Arshad','zohaibtanoli@gmail.com','0423423423','KTS','Haripur','Male','Comsats','','MS Student',0);
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

-- Dump completed on 2020-09-25 13:40:04
