### Schema
CREATE TABLE USER
(
	USER_ID int NOT NULL AUTO_INCREMENT,
	USERNAME varchar(255) NOT NULL,
	PASSWORD varchar(255) NOT NULL,
	EMAIL varchar(255) NOT NULL,
	FIRST_NAME varchar(255) NOT NULL,
	LAST_NAME varchar(255) NOT NULL,
	ADDRESS varchar(255),
	CITY varchar(255),
	STATE varchar(255),
	ZIPCODE varchar(255),
	CREATED_DATE DATE,
	PRIMARY KEY (USER_ID)
);

CREATE TABLE COMMENT
(
	COMMENT_ID int NOT NULL AUTO_INCREMENT,
	USER_ID INT NOT NULL,
	LICENSE_NO INT NOT NULL,
	COMMENT varchar(4000) NOT NULL,
	CREATED_DATE TIMESTAMP NOT NULL,
	PRIMARY KEY (COMMENT_ID), FOREIGN KEY (USER_ID) REFERENCES USER(USER_ID)
);