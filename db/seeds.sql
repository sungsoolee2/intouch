USE intouch_user_db;
-- INSERT INTO parents (name, email, radius, createdAt, updatedAt) VALUES ("Jimmy Kimmel","javareallysucks1234@gmail.com", 50, 111,1111);
-- INSERT INTO children (name, location, email, ParentId, createdAt, updatedAt) VALUES ("Bobby","42.300244, -87.958468","a@b.com", 1,111,1111);
-- INSERT INTO children (name, location, email, ParentId, createdAt, updatedAt) VALUES ("Kat","42.300244, -90.958468","k.liapoulos@gmail.com", 1,111,1111);
INSERT INTO children (name, location, email, ParentId, createdAt, updatedAt) VALUES ("Suzy","41.815607, -87.632693","ddd@gmail.com", 1,111,1111);
SELECT name,email,location,ParentId FROM children;