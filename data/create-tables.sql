
-- CREATE TABLE events (
--     id  INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
--     title VARCHAR(300),
--     description TEXT,
--     image VARCHAR(400),
--     isFeatured TINYINT,
--     location VARCHAR(400),
--     date DATE
-- );
-- CREATE TABLE comments (
--     id  INT PRIMARY KEY NOT NULL AUTO_INCREMENT ,
--     email VARCHAR(300),
--     text TEXT,
--     event_id INT
-- );

-- ALTER TABLE comments
--   ADD FOREIGN KEY (event_id)
--        REFERENCES events(id) ON DELETE CASCADE;

-- -- ALTER TABLE comments
-- -- DROP INDEX 'event_id';
-- --  ALTER TABLE comments ADD name VARCHAR(300) NOT NULL  AFTER id;
--  CREATE TABLE subscribers (
--     email   VARCHAR(300) PRIMARY KEY
-- );
-- drop table subsribers;