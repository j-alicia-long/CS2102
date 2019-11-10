DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Students CASCADE;
DROP TABLE IF EXISTS TAs CASCADE;
DROP TABLE IF EXISTS Professors CASCADE;
DROP TABLE IF EXISTS Supervises CASCADE;
DROP TABLE IF EXISTS Courses CASCADE;
DROP TABLE IF EXISTS SELECTS CASCADE;
DROP TABLE IF EXISTS GROUPS CASCADE;
DROP TABLE IF EXISTS LECTURES CASCADE;
DROP TABLE IF EXISTS TUTORIALS CASCADE;
DROP TABLE IF EXISTS LABS CASCADE;
DROP TABLE IF EXISTS HasGroup CASCADE;
DROP TABLE IF EXISTS AssignLect CASCADE;
DROP TABLE IF EXISTS AssignLab CASCADE;
DROP TABLE IF EXISTS AssignTut CASCADE;
DROP TABLE IF EXISTS ManagesGroup CASCADE;
DROP TABLE IF EXISTS Forums CASCADE;
DROP TABLE IF EXISTS Entries CASCADE;
DROP TABLE IF EXISTS HasAccess CASCADE;

CREATE TABLE Users (
  uid       varchar(50) PRIMARY KEY,
  pass      varchar(256) NOT NULL,
  name      varchar(256) NOT NULL,
  faculty   varchar(256)  NOT NULL,
  UNIQUE (uid, name)
  );

CREATE TABLE Students (
  uid       varchar(50) PRIMARY KEY REFERENCES Users (uid),
  year      integer
);

CREATE TABLE TAs (
  uid       varchar(50) PRIMARY KEY REFERENCES Users (uid)
);

CREATE TABLE Professors (
  uid       varchar(50) PRIMARY KEY REFERENCES Users (uid)
);

CREATE TABLE Supervises (
  sid 	 varchar(50),
  pid 	 varchar(50),
  since 	 date,
  PRIMARY KEY(sid, pid),
  FOREIGN KEY(sid) REFERENCES Students (uid),
  FOREIGN KEY(pid) REFERENCES Professors (uid)
);

CREATE TABLE Courses (
  cid       varchar(20),
  yearsem   varchar(20),
  name      varchar(256),
  uid       varchar(50) REFERENCES Professors (uid),
  PRIMARY KEY (cid, yearsem)
);

CREATE TABLE Selects (
  uid       varchar(50) REFERENCES Students (uid),
  cid       varchar(20),
  yearsem   varchar(20),
  FOREIGN KEY (cid, yearsem) REFERENCES Courses (cid, yearsem),
  PRIMARY KEY (uid, cid, yearsem)
);

CREATE TABLE Groups (
  gid       varchar(50) PRIMARY KEY,
  cid       varchar(20),
  yearsem   varchar(20),
  FOREIGN KEY (cid, yearsem) REFERENCES Courses (cid, yearsem)
      ON DELETE CASCADE
);
CREATE TABLE Lectures (
  gid       varchar(50) PRIMARY KEY REFERENCES Groups (gid),
  day       varchar(20),
  startTime time,
  endTime	 time,
  venue     varchar(256)
);

CREATE TABLE Tutorials (
  gid       varchar(50) PRIMARY KEY REFERENCES Groups (gid),
  day       varchar(20),
  startTime time,
  endTime	 time,
  venue     varchar(256)
);

CREATE TABLE Labs (
  gid       varchar(50) PRIMARY KEY REFERENCES Groups (gid),
  day       varchar(20),
  startTime time,
  endTime	 time,
  venue     varchar(256)
);

CREATE TABLE HasGroup (
  cid       varchar(20),
  yearsem   varchar(20),
  gid       varchar(50) REFERENCES Groups (gid),
  l_type    varchar(20),
  FOREIGN KEY (cid, yearsem) REFERENCES Courses (cid, yearsem)
      ON DELETE CASCADE,
  UNIQUE (cid, yearsem, gid),
  PRIMARY KEY (cid, yearsem, gid, l_type)
);

CREATE TABLE AssignLect (
  uid       varchar(50) REFERENCES Students (uid),
  cid       varchar(20),
  yearsem   varchar(20),
  gid       varchar(50),
  l_type    varchar(20),
  FOREIGN KEY (cid, yearsem, gid, l_type) REFERENCES HasGroup (cid, yearsem, gid, l_type)
      ON DELETE CASCADE,
  PRIMARY KEY (uid, cid, yearsem, l_type)
);

CREATE TABLE AssignLab (
  uid       varchar(50) REFERENCES Students (uid),
  cid       varchar(20),
  yearsem   varchar(20),
  gid       varchar(50),
  l_type    varchar(20),
  FOREIGN KEY (cid, yearsem, gid, l_type) REFERENCES HasGroup (cid, yearsem, gid, l_type)
      ON DELETE CASCADE,
  PRIMARY KEY (uid, cid, yearsem, l_type)
);

CREATE TABLE AssignTut (
  uid       varchar(50) REFERENCES Students (uid),
  cid       varchar(20),
  yearsem   varchar(20),
  gid       varchar(50),
  l_type    varchar(20),
  FOREIGN KEY (cid, yearsem, gid, l_type) REFERENCES HasGroup (cid, yearsem, gid, l_type)
      ON DELETE CASCADE,
  PRIMARY KEY (uid, cid, yearsem, l_type)
);

CREATE TABLE ManagesGroup (
  gid       varchar(50) REFERENCES Groups (gid),
  uid       varchar(50) REFERENCES Users (uid),
  PRIMARY KEY (uid, gid)
);

CREATE TABLE Forums (
  fid       varchar(50) PRIMARY KEY,
  uid       varchar(50),
  cid		    varchar(50) NOT NULL,
  yearsem   varchar(20),
  f_title   varchar(50),
  f_dscp    varchar(100),
  f_date    date NOT NULL,
  FOREIGN KEY (cid, yearsem) REFERENCES Courses (cid, yearsem)
      ON DELETE CASCADE
);

/*CREATE TABLE Threads (
  uid VARCHAR(50) REFERENCES Users (uid),
  t_title VARCHAR(50),
  t_post VARCHAR(2000),
  t_date DATE NOT NULL,
) */

CREATE TABLE Entries (
  eid      varchar(50),
  uid      varchar(50) REFERENCES Users (uid),
  cid      varchar(50) NOT NULL,
  e_post	 varchar(2000) NOT NULL,
  e_title  varchar(100) NOT NULL,
  e_date	 date			NOT NULL,
  e_time   time	    NOT NULL,
  fid      varchar(50),
  PRIMARY KEY (eid, fid),
  FOREIGN KEY (fid) REFERENCES Forums (fid) ON DELETE CASCADE
);

CREATE TABLE HasAccess (
  fid       varchar(50) REFERENCES Forums (fid),
  gid       varchar(50) REFERENCES Groups (gid),
  PRIMARY KEY (fid, gid)
);

CREATE OR REPLACE PROCEDURE add_student(
uid varchar(50),
pass varchar(256),
name varchar(256),
year integer
)AS $$
BEGIN
 INSERT INTO Users VALUES (uid, pass, name);
 INSERT INTO Students VALUES (uid, year);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE add_professor(
uid varchar(50),
pass varchar(256),
name varchar(256)
)AS $$
BEGIN
 INSERT INTO Users VALUES (uid, pass, name);
 INSERT INTO Professors VALUES (uid);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE update_faculty(
uid varchar(50),
faculty varchar(50)
)AS $$
BEGIN
 UPDATE Users
 SET Users.faculty = faculty
 WHERE Users.uid == uid;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE assign_TA_to_Group(
uid varchar(50),
gid varchar(50)
) AS $$
BEGIN
 INSERT INTO TAs VALUES (uid);
 INSERT INTO ManagesGroup VALUES (uid, gid);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE add_lecture(
gid varchar(50),
cid varchar(20),
yearsem varchar(20),
uid varchar(50),
Day varchar(20),
startTime time,
endTime time,
venue varchar(256)
)AS $$
BEGIN
 INSERT INTO Groups VALUES (gid, cid, yearsem, uid);
 INSERT INTO Lectures VALUES (gid, day, startTime, endTime, venue);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE add_tutorial(
gid varchar(50),
cid varchar(20),
yearsem varchar(20),
uid varchar(50),
Day varchar(20),
startTime time,
endTime time,
venue varchar(256)
)AS $$
BEGIN
 INSERT INTO Groups VALUES (gid, cid, yearsem, uid);
 INSERT INTO Lectures VALUES (gid, day, startTime, endTime, venue);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE add_lab(
gid varchar(50),
cid varchar(20),
yearsem varchar(20),
uid varchar(50),
Day varchar(20),
startTime time,
endTime time,
venue varchar(256)
)AS $$
BEGIN
 INSERT INTO Groups VALUES (gid, cid, yearsem, uid);
 INSERT INTO Lectures VALUES (gid, day, startTime, endTime, venue);
END;
$$ LANGUAGE plpgsql;


--TRIGGERS

CREATE OR REPLACE FUNCTION not_student()
RETURNS TRIGGER AS $$
DECLARE count NUMERIC;
BEGIN
 SELECT COUNT(*) INTO count FROM ManagesGroup WHERE NEW.uid = Students.uid;
 IF count > 0 THEN
 	RETURN NULL; -- prevent
 ELSE
 	RETURN NEW; -- allow
 END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION is_student()
RETURNS TRIGGER AS $$
DECLARE count NUMERIC;
BEGIN
 SELECT COUNT(*) INTO count FROM Selects WHERE NEW.uid != Students.uid;
 IF count > 0 THEN
 	RETURN NULL; -- prevent
 ELSE
 	RETURN NEW; -- allow
 END IF;
END;
$$ LANGUAGE plpgsql;

-- CREATE TRIGGER check_enrolled_user
-- BEFORE INSERT OR UPDATE ON Selects
-- FOR EACH ROW EXECUTE PROCEDURE is_student();

-- CREATE OR REPLACE FUNCTION is_professor()
-- RETURNS TRIGGER AS $$
-- DECLARE count NUMERIC;
-- BEGIN
--  SELECT COUNT(*) INTO count FROM Courses WHERE NEW.uid != Professors.uid;
--  IF count > 0 THEN
--  	RETURN NULL; -- prevent
--  ELSE
--  	RETURN NEW; -- allow
--  END IF;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER check_course_manager
-- BEFORE INSERT OR UPDATE ON Courses
-- FOR EACH ROW EXECUTE PROCEDURE is_professor();
