CREATE DATABASE  IF NOT EXISTS `api` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `api`;
-- MySQL dump 10.13  Distrib 5.7.9, for osx10.9 (x86_64)
--
-- Host: 182.254.155.206    Database: api
-- ------------------------------------------------------
-- Server version	5.5.44-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `email_token`
--

DROP TABLE IF EXISTS `email_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `email_token` (
  `id` char(12) NOT NULL,
  `email` varchar(45) NOT NULL,
  `isUsed` tinyint(1) NOT NULL DEFAULT '0',
  `createtime` datetime NOT NULL,
  `token` char(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `find_password`
--

DROP TABLE IF EXISTS `find_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `find_password` (
  `id` char(12) NOT NULL DEFAULT '',
  `email` varchar(45) DEFAULT NULL,
  `isUsed` tinyint(1) DEFAULT '0',
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `interface`
--

DROP TABLE IF EXISTS `interface`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interface` (
  `id` char(14) NOT NULL DEFAULT '',
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(3000) DEFAULT NULL,
  `folderId` char(14) DEFAULT NULL,
  `url` varchar(300) DEFAULT NULL,
  `requestMethod` varchar(50) DEFAULT NULL,
  `contentType` varchar(50) DEFAULT NULL,
  `requestHeaders` text,
  `requestArgs` text,
  `responseArgs` text,
  `example` text,
  `moduleId` varchar(50) DEFAULT NULL,
  `projectId` char(14) DEFAULT NULL,
  `lastUpdateTime` datetime DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `dataType` varchar(30) DEFAULT NULL,
  `protocol` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `interface_folder`
--

DROP TABLE IF EXISTS `interface_folder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `interface_folder` (
  `id` char(14) NOT NULL DEFAULT '',
  `name` varchar(50) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `moduleId` char(14) DEFAULT NULL,
  `projectId` char(14) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `module` (
  `id` char(14) NOT NULL DEFAULT '',
  `name` varchar(50) DEFAULT NULL,
  `host` varchar(100) DEFAULT NULL,
  `description` text,
  `lastUpdateTime` datetime DEFAULT NULL,
  `projectId` char(14) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `id` char(14) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL COMMENT 'test',
  `teamId` char(14) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `userId` char(14) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'VALID',
  `permission` varchar(20) DEFAULT 'PRIVATE',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_log`
--

DROP TABLE IF EXISTS `project_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_log` (
  `id` char(14) NOT NULL DEFAULT '',
  `userId` char(14) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `log` text,
  `moduleId` char(14) DEFAULT NULL,
  `projectId` char(14) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project_user`
--

DROP TABLE IF EXISTS `project_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_user` (
  `id` char(14) NOT NULL,
  `projectId` char(14) DEFAULT NULL,
  `userId` char(14) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `status` char(255) DEFAULT 'PENDING',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `id` char(14) NOT NULL DEFAULT '',
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `userId` char(14) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT 'VALID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `team_user`
--

DROP TABLE IF EXISTS `team_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team_user` (
  `id` char(14) NOT NULL,
  `teamId` char(14) DEFAULT NULL,
  `userId` char(14) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` char(12) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `password` char(32) DEFAULT NULL,
  `type` varchar(5) DEFAULT 'USER',
  `nickname` varchar(30) DEFAULT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `status` char(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username` (`email`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_third`
--

DROP TABLE IF EXISTS `user_third`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_third` (
  `id` varchar(60) NOT NULL,
  `userid` char(12) NOT NULL,
  `type` char(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-08-30 21:35:11
