

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `filename` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `localVideos`
--

DROP TABLE IF EXISTS `localVideos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localVideos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `filename` varchar(255) NOT NULL,
  `videoDuration` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `projectLocalVideos`
--

DROP TABLE IF EXISTS `projectLocalVideos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projectLocalVideos` (
  `projectId` int NOT NULL,
  `localVideoId` int NOT NULL,
  `startAtPosition` int DEFAULT NULL,
  `playbackRate` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `projectLocalVideos_ibfk_1` (`localVideoId`),
  KEY `projectStories_ibfk_1` (`projectId`),
  CONSTRAINT `projectLocalVideos_ibfk_1` FOREIGN KEY (`localVideoId`) REFERENCES `localVideos` (`id`),
  CONSTRAINT `projectStories_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `projectSlideshows`
--

DROP TABLE IF EXISTS `projectSlideshows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projectSlideshows` (
  `projectId` int NOT NULL,
  `slideshowId` int NOT NULL,
  `random` tinyint NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `projectSlideshows_ibfk_1` (`projectId`),
  KEY `projectSlideshows_ibfk_2` (`slideshowId`),
  CONSTRAINT `projectSlideshows_ibfk_1` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`),
  CONSTRAINT `projectSlideshows_ibfk_2` FOREIGN KEY (`slideshowId`) REFERENCES `slideshows` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `projectStories`
--

DROP TABLE IF EXISTS `projectStories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projectStories` (
  `projectId` int NOT NULL,
  `storyId` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `projectStories_ibfk_2` (`storyId`),
  CONSTRAINT `projectStories_ibfk_2` FOREIGN KEY (`storyId`) REFERENCES `stories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `slideshowImages`
--

DROP TABLE IF EXISTS `slideshowImages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slideshowImages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slideshowId` int NOT NULL,
  `imageId` int NOT NULL,
  `positionInSlideshow` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `SlideshowId` (`slideshowId`),
  KEY `ImageId` (`imageId`),
  CONSTRAINT `slideshowImages_ibfk_1` FOREIGN KEY (`imageId`) REFERENCES `images` (`id`),
  CONSTRAINT `slideshowImages_ibfk_2` FOREIGN KEY (`slideshowId`) REFERENCES `slideshows` (`id`),
  CONSTRAINT `slideshowImages_ibfk_3` FOREIGN KEY (`slideshowId`) REFERENCES `slideshows` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `slideshows`
--

DROP TABLE IF EXISTS `slideshows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slideshows` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stories`
--

DROP TABLE IF EXISTS `stories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `storyType` varchar(100) NOT NULL,
  `name` varchar(150) NOT NULL,
  `alternateMediaType` tinyint NOT NULL,
  `random` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `storyLocalVideos`
--

DROP TABLE IF EXISTS `storyLocalVideos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storyLocalVideos` (
  `storyId` int NOT NULL,
  `localVideoId` int NOT NULL,
  `duration` int DEFAULT NULL,
  `startAtPosition` int DEFAULT NULL,
  `playbackSpeed` int DEFAULT NULL,
  `playEntireVideo` tinyint NOT NULL,
  `mediaIndex` int NOT NULL,
  `bookmarkVideo` tinyint NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `storyId` (`storyId`),
  KEY `localVideoId` (`localVideoId`),
  CONSTRAINT `storyLocalVideos_ibfk_1` FOREIGN KEY (`storyId`) REFERENCES `stories` (`id`),
  CONSTRAINT `storyLocalVideos_ibfk_2` FOREIGN KEY (`localVideoId`) REFERENCES `localVideos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `storySlideshows`
--

DROP TABLE IF EXISTS `storySlideshows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `storySlideshows` (
  `storyId` int NOT NULL,
  `slideshowId` int NOT NULL,
  `random` tinyint NOT NULL,
  `playEntireSlideshow` tinyint NOT NULL,
  `duration` int DEFAULT NULL,
  `slideDuration` int DEFAULT NULL,
  `mediaIndex` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `slideshowId` (`slideshowId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-28 22:05:17
