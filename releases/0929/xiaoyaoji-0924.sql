# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 182.254.155.206 (MySQL 5.5.44-MariaDB)
# Database: api_dev
# Generation Time: 2016-09-24 13:41:38 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table email_token
# ------------------------------------------------------------

CREATE TABLE `email_token` (
  `id` char(12) NOT NULL,
  `email` varchar(45) NOT NULL,
  `isUsed` tinyint(1) NOT NULL DEFAULT '0',
  `createtime` datetime NOT NULL,
  `token` char(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table find_password
# ------------------------------------------------------------

CREATE TABLE `find_password` (
  `id` char(12) NOT NULL DEFAULT '',
  `email` varchar(45) DEFAULT NULL,
  `isUsed` tinyint(1) DEFAULT '0',
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table interface
# ------------------------------------------------------------

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



# Dump of table interface_folder
# ------------------------------------------------------------

CREATE TABLE `interface_folder` (
  `id` char(14) NOT NULL DEFAULT '',
  `name` varchar(50) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `moduleId` char(14) DEFAULT NULL,
  `projectId` char(14) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table module
# ------------------------------------------------------------

CREATE TABLE `module` (
  `id` char(14) NOT NULL DEFAULT '',
  `name` varchar(50) DEFAULT NULL,
  `host` varchar(255) DEFAULT NULL,
  `description` text,
  `lastUpdateTime` datetime DEFAULT NULL,
  `projectId` char(14) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `devHost` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table project
# ------------------------------------------------------------

CREATE TABLE `project` (
  `id` char(14) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL COMMENT 'test',
  `teamId` char(14) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `userId` char(14) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'VALID',
  `permission` varchar(20) DEFAULT 'PRIVATE',
  `environments` varchar(1000) DEFAULT NULL,
  `details` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table project_log
# ------------------------------------------------------------

CREATE TABLE `project_log` (
  `id` char(14) NOT NULL DEFAULT '',
  `userId` char(14) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `log` text,
  `projectId` char(14) DEFAULT NULL,
  `action` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table project_user
# ------------------------------------------------------------

CREATE TABLE `project_user` (
  `id` char(14) NOT NULL,
  `projectId` char(14) DEFAULT NULL,
  `userId` char(14) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `status` char(255) DEFAULT 'PENDING',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table team
# ------------------------------------------------------------

CREATE TABLE `team` (
  `id` char(14) NOT NULL DEFAULT '',
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `userId` char(14) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT 'VALID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table team_user
# ------------------------------------------------------------

CREATE TABLE `team_user` (
  `id` char(14) NOT NULL,
  `teamId` char(14) DEFAULT NULL,
  `userId` char(14) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



# Dump of table user
# ------------------------------------------------------------

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



# Dump of table user_third
# ------------------------------------------------------------

CREATE TABLE `user_third` (
  `id` varchar(60) NOT NULL,
  `userid` char(12) NOT NULL,
  `type` char(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
