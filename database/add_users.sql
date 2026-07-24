-- ============================================================
-- Run this in MySQL to add login system
-- source C:/Users/user/OneDrive/Documents/Desktop/campus-bus-tracker/campus-bus-tracker/database/add_users.sql
-- ============================================================

USE b78qlhrgwahlypkrkiep;

CREATE TABLE IF NOT EXISTS Users (
  user_id    INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(256) NOT NULL,
  role       ENUM('student','driver','admin') NOT NULL DEFAULT 'student',
  token      VARCHAR(100) DEFAULT NULL,
  is_active  BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Passwords below are SHA256 hashed
-- admin123   → sha256 = 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9
-- driver123  → sha256 = ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f  
-- student123 → sha256 = ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f

INSERT INTO Users (name, email, password, role) VALUES
('Admin VCE',      'admin@vce.ac.in',    '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'admin'),
('Ramesh Kumar',   'ramesh@vce.ac.in',   'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'driver'),
('Suresh Reddy',   'suresh@vce.ac.in',   'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'driver'),
('Arjun Student',  'arjun@student.vce.ac.in', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'student')
ON DUPLICATE KEY UPDATE name = name;

SELECT 'Users table created!' AS Status;
SELECT name, email, role FROM Users;
