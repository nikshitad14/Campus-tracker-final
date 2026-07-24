-- ============================================================
-- Campus Bus Tracker - Database Schema
-- Vardhaman College of Engineering | CSE Summer Project 2024-25
-- ============================================================

USE b78qlhrgwahlypkrkiep;

-- 1. Buses
CREATE TABLE Buses (
  bus_id INT AUTO_INCREMENT PRIMARY KEY,
  bus_number VARCHAR(20) NOT NULL UNIQUE,
  capacity INT NOT NULL DEFAULT 50,
  driver_name VARCHAR(100),
  driver_phone VARCHAR(15),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Routes
CREATE TABLE Routes (
  route_id INT AUTO_INCREMENT PRIMARY KEY,
  route_name VARCHAR(100) NOT NULL,
  route_code VARCHAR(20) NOT NULL UNIQUE,
  start_location VARCHAR(150) NOT NULL,
  end_location VARCHAR(150) NOT NULL,
  total_distance_km DECIMAL(5,2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Stops
CREATE TABLE Stops (
  stop_id INT AUTO_INCREMENT PRIMARY KEY,
  route_id INT NOT NULL,
  stop_name VARCHAR(150) NOT NULL,
  stop_order INT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  FOREIGN KEY (route_id) REFERENCES Routes(route_id) ON DELETE CASCADE
);

-- 4. Schedules
CREATE TABLE Schedules (
  schedule_id INT AUTO_INCREMENT PRIMARY KEY,
  route_id INT NOT NULL,
  bus_id INT NOT NULL,
  departure_time TIME NOT NULL,
  arrival_time TIME NOT NULL,
  days_of_week SET('Mon','Tue','Wed','Thu','Fri','Sat','Sun') NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (route_id) REFERENCES Routes(route_id) ON DELETE CASCADE,
  FOREIGN KEY (bus_id) REFERENCES Buses(bus_id) ON DELETE CASCADE
);

-- 5. Subscriptions
CREATE TABLE Subscriptions (
  subscription_id INT AUTO_INCREMENT PRIMARY KEY,
  student_name VARCHAR(100) NOT NULL,
  student_email VARCHAR(150) NOT NULL,
  student_phone VARCHAR(15),
  route_id INT NOT NULL,
  notification_type ENUM('email', 'sms', 'both') DEFAULT 'email',
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (route_id) REFERENCES Routes(route_id) ON DELETE CASCADE,
  UNIQUE KEY unique_subscription (student_email, route_id)
);

-- 6. DelayLogs
CREATE TABLE DelayLogs (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  schedule_id INT NOT NULL,
  delay_minutes INT NOT NULL DEFAULT 0,
  reason VARCHAR(255),
  reported_by ENUM('driver', 'admin') DEFAULT 'admin',
  log_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (schedule_id) REFERENCES Schedules(schedule_id) ON DELETE CASCADE
);

-- ============================================================
-- Sample Data
-- ============================================================

INSERT INTO Buses (bus_number, capacity, driver_name, driver_phone) VALUES
('VCE-001', 55, 'Ramesh Kumar', '9876543210'),
('VCE-002', 55, 'Suresh Reddy', '9876543211'),
('VCE-003', 45, 'Mahesh Rao',   '9876543212'),
('VCE-004', 45, 'Dinesh Babu',  '9876543213');

INSERT INTO Routes (route_name, route_code, start_location, end_location, total_distance_km) VALUES
('Secunderabad - College',   'R01', 'Secunderabad Station',    'VCE Campus', 28.5),
('KPHB - College',           'R02', 'KPHB Colony',            'VCE Campus', 22.0),
('Dilsukhnagar - College',   'R03', 'Dilsukhnagar Bus Stand', 'VCE Campus', 34.0),
('LB Nagar - College',       'R04', 'LB Nagar Metro',         'VCE Campus', 30.5);

INSERT INTO Stops (route_id, stop_name, stop_order, latitude, longitude) VALUES
(1, 'Secunderabad Station',  1, 17.4401, 78.4989),
(1, 'Paradise Circle',       2, 17.4347, 78.4742),
(1, 'Begumpet',              3, 17.4438, 78.4660),
(1, 'Ameerpet',              4, 17.4375, 78.4483),
(1, 'SR Nagar',              5, 17.4460, 78.4220),
(1, 'VCE Campus',            6, 17.5300, 78.2980),
(2, 'KPHB Colony Phase 1',   1, 17.4935, 78.3825),
(2, 'JNTU Metro',            2, 17.4936, 78.3946),
(2, 'Kukatpally',            3, 17.4850, 78.4000),
(2, 'Balanagar',             4, 17.4699, 78.4075),
(2, 'VCE Campus',            5, 17.5300, 78.2980);

INSERT INTO Schedules (route_id, bus_id, departure_time, arrival_time, days_of_week) VALUES
(1, 1, '07:00:00', '08:15:00', 'Mon,Tue,Wed,Thu,Fri,Sat'),
(1, 1, '07:30:00', '08:45:00', 'Mon,Tue,Wed,Thu,Fri,Sat'),
(2, 2, '07:15:00', '08:10:00', 'Mon,Tue,Wed,Thu,Fri,Sat'),
(3, 3, '06:45:00', '08:20:00', 'Mon,Tue,Wed,Thu,Fri,Sat'),
(4, 4, '07:00:00', '08:30:00', 'Mon,Tue,Wed,Thu,Fri,Sat');

INSERT INTO DelayLogs (schedule_id, delay_minutes, reason, reported_by, log_date) VALUES
(1, 10, 'Heavy traffic near Ameerpet', 'driver', CURDATE() - INTERVAL 1 DAY),
(1, 5,  'Minor breakdown',             'driver', CURDATE() - INTERVAL 2 DAY),
(2, 0,  NULL,                          'admin',  CURDATE() - INTERVAL 1 DAY),
(3, 15, 'Road work on NH-44',          'driver', CURDATE() - INTERVAL 1 DAY),
(1, 8,  'Traffic signal issue',        'driver', CURDATE() - INTERVAL 3 DAY);
