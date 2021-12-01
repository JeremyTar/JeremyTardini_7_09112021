-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema groupomania
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `groupomania` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `groupomania` ;

-- -----------------------------------------------------
-- Table `groupomania`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`user` (
  `userId` VARCHAR(36) NOT NULL,
  `firstName` VARCHAR(20) NOT NULL,
  `lastName` VARCHAR(20) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `isAdmin` TINYINT NOT NULL DEFAULT '0',
  `role` VARCHAR(20) NOT NULL DEFAULT '',
  `bio` VARCHAR(255) NOT NULL DEFAULT '',
  `email` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `groupomania`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`post` (
  `postId` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(20) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  `attachement` VARCHAR(150) NOT NULL DEFAULT '',
  `like` INT NOT NULL DEFAULT '0',
  `dislike` INT NOT NULL DEFAULT '0',
  `categorie` VARCHAR(20) NOT NULL DEFAULT '',
  `userUserId` VARCHAR(36) NULL DEFAULT NULL,
  PRIMARY KEY (`postId`),
  INDEX `FK_383f47c98d6fc3e18786e00ed41` (`userUserId` ASC) VISIBLE,
  CONSTRAINT `FK_383f47c98d6fc3e18786e00ed41`
    FOREIGN KEY (`userUserId`)
    REFERENCES `groupomania`.`user` (`userId`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `groupomania`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `groupomania`.`comment` (
  `content` VARCHAR(255) NOT NULL,
  `commentId` INT NOT NULL AUTO_INCREMENT,
  `postPostId` INT NULL DEFAULT NULL,
  `userUserId` VARCHAR(36) NULL DEFAULT NULL,
  PRIMARY KEY (`commentId`),
  INDEX `FK_58c08bd38052e10706d3b4ae89a` (`postPostId` ASC) VISIBLE,
  INDEX `FK_1a0a9c69d17cfb196d090858bc8` (`userUserId` ASC) VISIBLE,
  CONSTRAINT `FK_1a0a9c69d17cfb196d090858bc8`
    FOREIGN KEY (`userUserId`)
    REFERENCES `groupomania`.`user` (`userId`),
  CONSTRAINT `FK_58c08bd38052e10706d3b4ae89a`
    FOREIGN KEY (`postPostId`)
    REFERENCES `groupomania`.`post` (`postId`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
