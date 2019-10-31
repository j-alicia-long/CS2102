CREATE TABLE Users (
  uid       varchar(50) PRIMARY KEY,
  pass      varchar(256) NOT NULL,
  name      varchar(256) NOT NULL,
  faculty   varchar(50)  NOT NULL,
  UNIQUE (uid, name)
);

INSERT INTO Users VALUES('a', 'b', 'c', 'd');
