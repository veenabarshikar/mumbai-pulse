-- Run this whole file in MySQL Workbench (File > Open SQL Script, then click the lightning bolt).
CREATE DATABASE IF NOT EXISTS mumbai_pulse CHARACTER SET utf8mb4;
USE mumbai_pulse;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS events;
CREATE TABLE events(
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(30) NOT NULL,
  `date` DATE NOT NULL,
  `time` TIME NOT NULL,
  location VARCHAR(60) NOT NULL,
  venue VARCHAR(150) NOT NULL,
  price INT NOT NULL DEFAULT 0,
  totalSeats INT NOT NULL,
  booked INT NOT NULL DEFAULT 0,
  organizer VARCHAR(100),
  description TEXT,
  featured TINYINT(1) NOT NULL DEFAULT 0,
  INDEX(`date`), INDEX(category), INDEX(location)
);
CREATE TABLE bookings(
  ref VARCHAR(12) PRIMARY KEY,
  eventId VARCHAR(20) NULL,
  eventName VARCHAR(150) NOT NULL,
  `date` DATE, `time` TIME, venue VARCHAR(150),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  tickets INT NOT NULL,
  total INT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE SET NULL
);
INSERT INTO events(id,name,category,`date`,`time`,location,venue,price,totalSeats,booked,organizer,description,featured) VALUES
('e1','Sunset Jazz at Carter Road','Music',CURDATE()+INTERVAL 2 DAY,'19:00','Bandra','Carter Road Amphitheatre',799,200,142,'Blue Note Collective','Live quartet playing standards and originals as the sun sets over the sea.',1),
('e2','Kala Ghoda Sketch Walk','Art',CURDATE()+INTERVAL 4 DAY,'09:00','Kala Ghoda','Rampart Row',0,40,22,'Urban Sketchers Mumbai','Two hours drawing heritage facades with local artists. All levels welcome.',1),
('e3','Street Food Trail: Mohammed Ali Road','Food',CURDATE()+INTERVAL 3 DAY,'20:30','Colaba','Minara Masjid Gate',1200,20,17,'Bombay Bites','Guided tasting of kebabs, malpua and falooda with a food historian.',1),
('e4','Startup Founders Mixer','Networking',CURDATE()+INTERVAL 6 DAY,'18:30','Lower Parel','Kamala Mills',500,120,60,'Mumbai Founders Club','Lightning pitches followed by open networking with founders and investors.',1),
('e5','Pottery for Beginners','Workshops',CURDATE()+INTERVAL 5 DAY,'11:00','Andheri','Clay Studio, Versova',1500,12,9,'Mitti Studio','Learn wheel throwing and take home your first bowl.',0),
('e6','Powai Lake Sunrise Run','Sports',CURDATE()+INTERVAL 1 DAY,'05:45','Powai','Powai Lake Promenade',300,150,88,'Mumbai Runners','5K and 10K around the lake, with chai and poha at the finish.',0),
('e7','Juhu Beach Cleanup','Community',CURDATE()+INTERVAL 7 DAY,'07:30','Juhu','Juhu Beach, Gate 3',0,200,64,'Clean Coast Mumbai','Gloves and bags provided. Join neighbours to clear the shoreline.',0);
