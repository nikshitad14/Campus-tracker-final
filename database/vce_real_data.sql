-- ============================================================
-- Real VCE Bus Routes Data from vardhaman.org/transport
-- Run this in MySQL to replace sample data with real data
-- ============================================================

USE b78qlhrgwahlypkrkiep;

-- Clear old sample data
DELETE FROM DelayLogs;
DELETE FROM Subscriptions;
DELETE FROM Schedules;
DELETE FROM Stops;
DELETE FROM Buses;
DELETE FROM Routes;

-- Reset auto increment
ALTER TABLE Routes AUTO_INCREMENT = 1;
ALTER TABLE Buses AUTO_INCREMENT = 1;
ALTER TABLE Stops AUTO_INCREMENT = 1;
ALTER TABLE Schedules AUTO_INCREMENT = 1;

-- ============================================================
-- BUSES (Real Drivers from VCE website)
-- ============================================================
INSERT INTO Buses (bus_number, capacity, driver_name, driver_phone) VALUES
('VCE-01',  55, 'MAHADEV',              '7780419568'),
('VCE-02A', 55, 'SHYAM',               '9989758418'),
('VCE-02B', 55, 'S.MAHESH',            '9848426004'),
('VCE-03',  55, 'SRIKANTH',            '8978763207'),
('VCE-04',  55, 'VISHNU VARDHAN REDDY','8885550399'),
('VCE-05',  55, 'PARMESHWAR',          '9908309117'),
('VCE-06',  55, 'R.ANIL KUMAR',        '8142878966'),
('VCE-07',  55, 'USHANNA',             '9948894825'),
('VCE-08',  55, 'MAHESH',              '9908751794'),
('VCE-09',  55, 'SAIDULU',             '9177296110'),
('VCE-10A', 55, 'V.VENKAT REDDY',      '9505739123'),
('VCE-10B', 55, 'AYYANNA',             '9849308349'),
('VCE-11',  55, 'NAGENDER',            '7892881501'),
('VCE-12',  55, 'RAGHAVENDER',         '8019522299'),
('VCE-13',  55, 'RAMA RAO',            '8465831191'),
('VCE-14',  55, 'M.BHOPAL',            '8008791421'),
('VCE-15',  55, 'RAMESH',              '9948962567'),
('VCE-16',  55, 'GOPAL',               '9603789022'),
('VCE-17',  55, 'BALAJI',              '9705582646'),
('VCE-18',  55, 'NARSIMHA',            '9963004310'),
('VCE-19',  55, 'MALLAREDDY',          '9705531797'),
('VCE-20',  55, 'M.VENKATESH',         '7396967227'),
('VCE-20B', 55, 'S.VENKAT REDDY',      '9866694323'),
('VCE-21',  55, 'P.SHEKAR',            '9963221914'),
('VCE-22',  55, 'G.RAVI',              '8341508922'),
('VCE-23',  55, 'G.NIRANJAN',          '9951336061'),
('VCE-24',  55, 'RAM CHANDER',         '9666395568'),
('VCE-25',  55, 'P.VISHNU',            '9666590655'),
('VCE-26',  55, 'B.RAVI',              '9908015936'),
('VCE-27',  55, 'T.GOPAL',             '9705767922'),
('VCE-28',  55, 'G.YADAIAH',           '9866741014'),
('VCE-29',  55, 'SATHYANARAYANA',      '9848385519'),
('VCE-30',  55, 'M.JANGAIAH',          '6305796293'),
('VCE-31',  55, 'M.LAXMAIAH',          '9542898493'),
('VCE-32',  55, 'RAMASWAMY',           '9603458884'),
('VCE-33',  55, 'KESHAVULU',           '9666819881'),
('VCE-34',  55, 'MD JAFFAR',           '9390171903'),
('VCE-35',  55, 'D.RAJU',              '9704888996');

-- ============================================================
-- ROUTES
-- ============================================================
INSERT INTO Routes (route_name, route_code, start_location, end_location, total_distance_km) VALUES
('Kukatpally Route',          'R01',  'Nizampet X Roads',       'VCE Campus', 32.0),
('Alwal-Secunderabad A',      'R02A', 'Thirumalagiri',          'VCE Campus', 35.0),
('Alwal-Secunderabad B',      'R02B', 'Narayanguda',            'VCE Campus', 28.0),
('Alwal Via Begumpet',        'R03',  'Lothukunta',             'VCE Campus', 38.0),
('Mallapur Route',            'R04',  'Mallapur',               'VCE Campus', 30.0),
('ECIL Route',                'R05',  'ECIL',                   'VCE Campus', 28.0),
('IDPL Route',                'R06',  'IDPL',                   'VCE Campus', 30.0),
('Mothi Nagar Route',         'R07',  'BJP Office Kukatpally',  'VCE Campus', 25.0),
('Narsingi Route',            'R08',  'Deepthi Nagar',          'VCE Campus', 22.0),
('Lingampally Route',         'R09',  'Alwyn',                  'VCE Campus', 28.0),
('KPHB/JNTU Route A',         'R10A', 'Nizampet',               'VCE Campus', 20.0),
('JNTU Forum Mall Route B',   'R10B', 'Forum Mall',             'VCE Campus', 25.0),
('Nizampet Route',            'R11',  'Hyder Nagar',            'VCE Campus', 30.0),
('Ramanthapur Route',         'R12',  'Ramanthapur Church',     'VCE Campus', 32.0),
('Rayadurgam Route',          'R13',  'Rayadurgam Dhaba',       'VCE Campus', 20.0),
('Manikonda Route',           'R14',  'Gallexy',                'VCE Campus', 18.0),
('Shaikpet Route',            'R15',  'Nala Naga',              'VCE Campus', 15.0),
('Suncity Route',             'R16',  'Suncity Ganesh Temple',  'VCE Campus', 12.0),
('Boduppal Route',            'R17',  'Boduppal Depot',         'VCE Campus', 22.0),
('Hayath Nagar Route 18',     'R18',  'Sai Baba Temple',        'VCE Campus', 25.0),
('Hayath Nagar Route 19',     'R19',  'Hayath Nagar Depot',     'VCE Campus', 28.0),
('NGO Colony Route',          'R20',  'Ganesh Temple',          'VCE Campus', 30.0),
('Ganesh Temple Route',       'R20B', 'NGO Colony',             'VCE Campus', 32.0),
('LB Nagar Route',            'R21',  'LB Nagar D Mart',        'VCE Campus', 28.0),
('Dilshuknagar-Kothapet',     'R22',  'Astalakshmi Temple',     'VCE Campus', 30.0),
('Hasthinapuram Route',       'R23',  'Pai Electronics',        'VCE Campus', 22.0),
('Rethibowli Route',          'R24',  'Rethibowli',             'VCE Campus', 15.0),
('Kamineni Route',            'R25',  'Kamineni Hospital',      'VCE Campus', 20.0),
('Almasguda Route',           'R26',  'Jillelaguda',            'VCE Campus', 25.0),
('Nagole Route',              'R27',  'Nagole',                 'VCE Campus', 20.0),
('Balapur Route',             'R28',  'Balapur X Road',         'VCE Campus', 22.0),
('Bairamlguda Route',         'R29',  'Sagar Ring Road',        'VCE Campus', 25.0),
('Rajendernagar Route',       'R30',  'Rajender Nagar',         'VCE Campus', 20.0),
('Shadnagar Route 31',        'R31',  'Balaji Convention',      'VCE Campus', 45.0),
('Shadnagar Route 32',        'R32',  'Balaji Convention',      'VCE Campus', 50.0),
('Kothur Route',              'R33',  'Kothur',                 'VCE Campus', 48.0),
('Shamshabad Route',          'R34',  'Siddanti',               'VCE Campus', 15.0),
('Attapur Route',             'R35',  'Attapur Pillar No 147',  'VCE Campus', 10.0);

-- ============================================================
-- STOPS - Route 1 (Kukatpally)
-- ============================================================
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(1,'NIZAMPET X ROADS',1),(1,'SOUTH INDIA SHOPPING MALL',2),(1,'VIVEKANANDA NAGAR KAMAN',3),
(1,'KUKATPALLY METRO',4),(1,'BJP OFFICE KUKATPALLY',5),(1,'METRO SHOPPING',6),
(1,'ERRAGADA',7),(1,'ESI',8),(1,'SR NAGAR',9),(1,'AMEERPET',10),
(1,'GVK MALL',11),(1,'CARE HOSPITAL',12),(1,'VIRINCHI HOSPITAL',13),
(1,'NMDC',14),(1,'TRAFFIC POLICE STATION',15),(1,'HYDERGUDA PILLAR NO 23',16),
(1,'VCE CAMPUS',17);

-- Route 2A (Alwal-Secunderabad A)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(2,'THIRUMALAGIRI',1),(2,'KHARKAHANA',2),(2,'JBS',3),(2,'SANGEETH',4),
(2,'CHILKALAGUDA X ROADS',5),(2,'GHANDHI HOSPITAL',6),(2,'MUSHEERABAD',7),
(2,'CHIKADPALLY',8),(2,'NARAYANGUDA',9),(2,'HIMAYATH NAGAR',10),
(2,'LIBERTY',11),(2,'ABIDS GPO',12),(2,'KARACHI BAKERY',13),
(2,'AFZAL GUNJ',14),(2,'VCE CAMPUS',15);

-- Route 2B
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(3,'NARAYANGUDA',1),(3,'HIMAYATH NAGAR',2),(3,'LIBERTY',3),
(3,'NIZAM COLLEGE',4),(3,'ABIDS GPO',5),(3,'KARACHI BAKERY',6),
(3,'AFZALGUNJ',7),(3,'VCE CAMPUS',8);

-- Route 3 (Alwal Via Begumpet)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(4,'LOTHUKUNTA',1),(4,'LAL BAZAR',2),(4,'LAL BAZAR D MART',3),
(4,'OLD BOWENPALLY',4),(4,'PARADISE',5),(4,'PRAKASH NAGAR',6),
(4,'BEGUMPET',7),(4,'SOMAJIGUDA',8),(4,'KHAIRTHABAD',9),
(4,'LAKDIKAPUL',10),(4,'ATTAPUR PILLAR NO 102',11),(4,'VCE CAMPUS',12);

-- Route 4 (Mallapur)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(5,'MALLAPUR',1),(5,'NACHARAM',2),(5,'NACHARAM ESI',3),(5,'TARNAKA',4),
(5,'UNIVERSITY',5),(5,'ADIKMER',6),(5,'SHANKER MUTT',7),(5,'FEVER HOSPITAL',8),
(5,'KACHIGUDA RAILWAY STATION',9),(5,'CHADERGHAR',10),(5,'CBS',11),
(5,'CITY COLLEGE',12),(5,'VCE CAMPUS',13);

-- Route 5 (ECIL)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(6,'ECIL',1),(6,'RADHIKA',2),(6,'A S RAO NAGAR',3),(6,'SHARADHA THEATER',4),
(6,'VAYUPURI BASTHI',5),(6,'NEREDMET',6),(6,'NEREDMET OLD PS',7),
(6,'ANANDBHAG X ROAD',8),(6,'ANUTEX',9),(6,'MALJAJGIRI',10),
(6,'SAIRAM',11),(6,'MIRZALGUDA',12),(6,'LALPET',13),(6,'TARNAKAKA',14),
(6,'VCE CAMPUS',15);

-- Route 6 (IDPL)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(7,'IDPL',1),(7,'BALA NAGAR',2),(7,'BHARATH NAGAR',3),(7,'ERRAGADDA',4),
(7,'ESI',5),(7,'S R NAGAR',6),(7,'AMEERPET',7),(7,'ERRUMAZIL',8),
(7,'SAKSHI OFFICE',9),(7,'MASAB TANK',10),(7,'MEHADHIPATNAM',11),
(7,'VCE CAMPUS',12);

-- Route 7 (Mothi Nagar)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(8,'BJP OFFICE KUKATPALLY',1),(8,'JANA PRIYA APARTMENTS',2),(8,'PR NAGAR',3),
(8,'MOTHI NAGAR',4),(8,'KARMIKA NAGAR',5),(8,'RAHAMATH NAGAR',6),
(8,'YUSUGUDA',7),(8,'SRI NAGAR COLONY',8),(8,'NARARJUNA CIRCLE',9),
(8,'VCE CAMPUS',10);

-- Route 8 (Narsingi)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(9,'DEEPTHI NAGAR',1),(9,'R S BROTHERS',2),(9,'TEMPLE',3),(9,'ANU FURNITURE',4),
(9,'LINGAMPALLY',5),(9,'NALLGANDLA FLY OVER',6),(9,'GACHBOWLI BUS STOP',7),
(9,'GACHBOWLI ORR',8),(9,'KHAZA GUDA CIRCLE',9),(9,'MY HOME',10),
(9,'NARSINGI',11),(9,'VCE CAMPUS',12);

-- Route 9 (Lingampally)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(10,'ALWYN',1),(10,'R S BROTHERS',2),(10,'CHANDA NAGAR',3),(10,'LINGAMPALLY',4),
(10,'NALLGANDLA FLY OVER',5),(10,'PARK',6),(10,'H C U BUS STOP',7),
(10,'SBI SINGAL',8),(10,'IIT SIGNAL',9),(10,'GACHIBOWLI',10),
(10,'ORR TOLL PLAZA',11),(10,'VCE CAMPUS',12);

-- Route 10A (KPHB)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(11,'NIZAMPET',1),(11,'SOUTH INDIA SHOPPING MALL',2),(11,'KPHB',3),
(11,'JNTUH',4),(11,'MANJEERA MALL',5),(11,'VCE CAMPUS',6);

-- Route 10B (Forum Mall)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(12,'FORUM MALL',1),(12,'ANKUR MALL',2),(12,'YASHODA HOSPITAL',3),
(12,'HITECH CITY',4),(12,'KFC',5),(12,'TELCOM NAGAR',6),
(12,'GACHIBOWLI',7),(12,'ROYAL VILLA',8),(12,'VCE CAMPUS',9);

-- Route 11 (Nizampet)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(13,'HYDER NAGAR',1),(13,'NIZAMPET',2),(13,'MIYAPUR',3),(13,'MIYAPUR X ROAD',4),
(13,'ALWYN',5),(13,'HAFEESPET',6),(13,'KONDAPUR RTO OFFICE',7),
(13,'BAJAJ ELECTRONICS',8),(13,'BOTANICAL GARDENS',9),(13,'GACHIBOWLI',10),
(13,'ORR TOLL PLAZA',11),(13,'VCE CAMPUS',12);

-- Route 12 (Ramanthapur)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(14,'RAMANTHAPUR CHRUCH',1),(14,'PETROL BUNK',2),(14,'VISHAL MART',3),
(14,'MUKTHANJA HOTEL',4),(14,'GOLNAKA',5),(14,'PURANAPOOL',6),
(14,'BAHADURPURA FLYOVER',7),(14,'ZOOK PARK',8),(14,'TADBUND',9),
(14,'OPP NPA',10),(14,'VCE CAMPUS',11);

-- Route 13 (Rayadurgam)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(15,'RAYADURGAM DHABA',1),(15,'DARGA',2),(15,'OU COLONY',3),
(15,'PANCHAVATI COLONY ARCH',4),(15,'SAMPOORNA SUPER MARKET',5),
(15,'MARICHETTU',6),(15,'LANCO HILLS',7),(15,'KANCHI CAFE',8),
(15,'PUPPALAGUDA',9),(15,'NARSINGI',10),(15,'MANCHIREVULA',11),
(15,'VCE CAMPUS',12);

-- Route 14 (Manikonda)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(16,'GALLEXY',1),(16,'DILIP SUPER MARKET',2),(16,'MANIKONDA',3),
(16,'ANDHRA BANK',4),(16,'PUPPALAGUDA',5),(16,'NARSINGI',6),
(16,'TSPA JUNCTION',7),(16,'VCE CAMPUS',8);

-- Route 15 (Shaikpet)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(17,'NALA NAGA',1),(17,'LUNGER HOUSE',2),(17,'BAPUGAT BRIDGE',3),
(17,'TIPU KHAN FLYOVER',4),(17,'ARMY SCHOOL',5),(17,'BANDLAGUDA',6),
(17,'KAALIMANDIR',7),(17,'VCE CAMPUS',8);

-- Route 16 (Suncity)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(18,'SUNCITY GANESH TEMPLE',1),(18,'PEERANCHERURU KAMAN',2),
(18,'KALIMANDRI',3),(18,'TRIBLE CITY',4),(18,'VCE CAMPUS',5);

-- Route 17 (Boduppal)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(19,'BODUPPAL DEPOT',1),(19,'PEERZADIGUDA',2),(19,'UPPAL BUS STAND',3),
(19,'UPPAL X ROAD',4),(19,'NAGOLE METRO STATION',5),(19,'VCE CAMPUS',6);

-- Route 18 (Hayath Nagar)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(20,'SAI BABA TEMPLE',1),(20,'HAYATH NAGAR DEPOT',2),(20,'BHAGYALATHA',3),
(20,'HIGH COURT COLONY',4),(20,'SUSMA',5),(20,'PANAMA',6),
(20,'CHINTHALKUNTA',7),(20,'MANDAMALLAMMA',8),(20,'VCE CAMPUS',9);

-- Route 19 (Hayath Nagar 2)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(21,'HAYATH NAGAR DEPOT',1),(21,'BHAGYALATHA',2),(21,'HIGH COURT COLONY',3),
(21,'SUSMA',4),(21,'PANAMA',5),(21,'CHINTHALKUNTA',6),
(21,'GAYATHRI BAGAR',7),(21,'KHARMAN GHAT HANUMAN TEMPLE',8),
(21,'KATTEDEN SWAPNA THEATRE',9),(21,'RAMCHARAN OIL MIL',10),(21,'VCE CAMPUS',11);

-- Route 20 (NGO Colony)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(22,'GANESH TEMPLE',1),(22,'RED TANK',2),(22,'GOVT. HOSPITAL X ROAD',3),
(22,'NGO COLONY',4),(22,'VAIDEHINNAGAR X ROAD',5),(22,'B.N REDDY',6),
(22,'SAGAR COMPLEX',7),(22,'GURRAMGUDA',8),(22,'INJAPUR',9),
(22,'MASQUATI BUS STOP',10),(22,'YAMJAL',11),(22,'BRAMHANPALLI X ROAD',12),
(22,'MANNEGUDA',13),(22,'BOGULUR GATE',14),(22,'TUKKAGUDA',15),(22,'VCE CAMPUS',16);

-- Route 20B
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(23,'NGO COLONY',1),(23,'GANESH TEMPLE',2),(23,'RED TANK',3),
(23,'VANASTHALIPURAM PARK',4),(23,'VANASTHALIPURAM BUS STAND',5),
(23,'VIDYA NAGAR',6),(23,'DRDO',7),(23,'BABA NAGAR',8),
(23,'RALLAGUDA',9),(23,'VCE CAMPUS',10);

-- Route 21 (LB Nagar)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(24,'LB NAGAR D MART',1),(24,'WHITE HOUSE',2),(24,'SAI SANJEEVINI HOSPITAL',3),
(24,'PVT MARKET',4),(24,'SAIBABA TEMPLE',5),(24,'CHANDANA BROTHERS',6),
(24,'KONARK TOWERS',7),(24,'TV TOWER',8),(24,'PVR MALL',9),
(24,'MALAKEPT D MART',10),(24,'MALAKEPET NEW MARKET',11),(24,'JAIL',12),
(24,'DHOBHI GHAT',13),(24,'SRINIVAS HOSPITAL',14),(24,'YADAGIRI THEATRE',15),
(24,'VCE CAMPUS',16);

-- Route 22 (Dilshuknagar)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(25,'ASTALAKSHMI TEMPLE',1),(25,'KOTHAPET',2),(25,'DCB BANK',3),
(25,'KAMAL HOSPITAL',4),(25,'RAGHAVENDRA TIFFIN CENTER',5),
(25,'SHANKESHWAR BAZAR',6),(25,'SHANKESHWAR TEMPLE',7),
(25,'SAIDABAD COLONY',8),(25,'VINAY NAGAR',9),(25,'VCE CAMPUS',10);

-- Route 23 (Hasthinapuram)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(26,'PAI ELECTRONICS',1),(26,'AMMA HOSPITAL',2),(26,'HASTHINAPURAM',3),
(26,'SRI LAKSHMI NARSIMHA CLONY',4),(26,'SANTHOSHIMATHA TEMPLE',5),
(26,'OMKAR NAGAR',6),(26,'VCE CAMPUS',7);

-- Route 24 (Rethibowli)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(27,'RETHIBOWLI',1),(27,'LAXMI NAGAR PILLAR NO 67',2),
(27,'JYOTHI NAGAR PILLAR NO 83',3),(27,'PILLAR NO 108',4),
(27,'ATTAPUR PILLAR NO 126',5),(27,'PILLAR NO 136',6),
(27,'D MART',7),(27,'VCE CAMPUS',8);

-- Route 25 (Kamineni)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(28,'KAMININENI HOSPITAL',1),(28,'TKR KAMAN',2),(28,'LB NAGAR',3),
(28,'ALEKYA TOWERS',4),(28,'VCE CAMPUS',5);

-- Route 26 (Almasguda)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(29,'JILLELAGUDA',1),(29,'JULLELAGUDA KINNERA GRAND',2),(29,'MEERPET X ROAD',3),
(29,'MEERPET NARAYANA SCHOOL',4),(29,'MEERPET POLICE STATION',5),
(29,'PRASHANTHI HILLS',6),(29,'ALMASGUDA KAMAN',7),(29,'ALMASGUDA',8),
(29,'BADANPET BALA SIDDHARATHA SCHOOL',9),(29,'BADANPET X ROAD',10),
(29,'BADANPET KAKATHIYA SCHOOL',11),(29,'BALAPUR X ROAD',12),
(29,'DATHUNAGAR',13),(29,'VCE CAMPUS',14);

-- Route 27 (Nagole)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(30,'NAGOLE',1),(30,'ALAKAPUPRI SWAGATH HOTEL',2),(30,'RELIANCE PETROL PUMP',3),
(30,'ROCK TOWN',4),(30,'DURGA NAGAR',5),(30,'VCE CAMPUS',6);

-- Route 28 (Balapur)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(31,'BALAPUR X ROAD',1),(31,'MEDHANI DEPOT',2),(31,'BABA NAGAR',3),
(31,'PULLI BAGA',4),(31,'CHANRAYANA GUTTA',5),(31,'RTO OFFICE',6),
(31,'MAHESHWARI OILMILL',7),(31,'SWPNA THEATER',8),(31,'PETROL PUMP',9),
(31,'BUDIVEL',10),(31,'VCE CAMPUS',11);

-- Route 29 (Bairamlguda)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(32,'SAGAR RING ROAD',1),(32,'BAIRAMLUGUDA',2),(32,'DURA NAGAR',3),
(32,'KHARMAN GHAT',4),(32,'R T C COLONY',5),(32,'GREEN PARK COLONY',6),
(32,'SINGARENI COLONY',7),(32,'BABA NAGAR',8),(32,'BANGLAGUDA',9),
(32,'VCE CAMPUS',10);

-- Route 30 (Rajendernagar)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(33,'RAJENDER NAGAR',1),(33,'BUDVEL',2),(33,'OLD BUS STOP',3),
(33,'DIRY FARM',4),(33,'SHIVRAMPALLY',5),(33,'ARAMGAR',6),
(33,'RALLAGUDA',7),(33,'NARKHUDA',8),(33,'VCE CAMPUS',9);

-- Route 31 (Shadnagar 1)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(34,'BALAJI CONVENTION',1),(34,'SAIBABA TEMPLE',2),(34,'MAHARAJ DHABA',3),
(34,'MORE SUPER MARKET',4),(34,'PARIGI ROAD POCHAMMA TEMPLE',5),(34,'VCE CAMPUS',6);

-- Route 32 (Shadnagar 2)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(35,'BALAJI CONVENTION',1),(35,'SAIBABA TEMPLE',2),(35,'MAHARAJ DHABA',3),
(35,'MORE SUPER MARKET',4),(35,'BUGGA REDDY GARDENS',5),(35,'BLOCK OFFICE',6),
(35,'FAROOQ NAGAR HOSPITAL',7),(35,'NANDIGAMA',8),(35,'KOTHUR',9),
(35,'THIMMAPUR',10),(35,'CHEGUR ROAD',11),(35,'MADAMPALLY',12),
(35,'PALAMAKULA',13),(35,'PADDA SHAPUR',14),(35,'THONDUPALLY',15),
(35,'VCE CAMPUS',16);

-- Route 33 (Kothur)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(36,'KOTHUR',1),(36,'THIMMAPUR',2),(36,'CHEGUR ROAD',3),(36,'MADAMPALLY',4),
(36,'PALAMAKULA',5),(36,'PADDA SHAPUR',6),(36,'THONDUPALLY',7),
(36,'SHAMSHABAD',8),(36,'SHAMSHABAD MESAVA',9),(36,'REGISTATION OFFICE',10),
(36,'BRIDGE',11),(36,'INDRA REDDY COLONY',12),(36,'NARKHUDA',13),
(36,'VCE CAMPUS',14);

-- Route 34 (Shamshabad)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(37,'SIDDANTI',1),(37,'SRINIVAS HOSPITAL',2),(37,'VIJETHA',3),(37,'VCE CAMPUS',4);

-- Route 35 (Attapur)
INSERT INTO Stops (route_id, stop_name, stop_order) VALUES
(38,'ATTAPUR PILLAR NO 147',1),(38,'VCE CAMPUS',2);

-- ============================================================
-- SCHEDULES (All routes arrive at 8:40 or 8:45 or 8:50)
-- ============================================================
INSERT INTO Schedules (route_id, bus_id, departure_time, arrival_time, days_of_week) VALUES
(1,1,'07:13:00','08:40:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(2,2,'07:15:00','08:40:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(3,3,'07:45:00','08:40:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(4,4,'07:05:00','08:40:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(5,5,'07:10:00','08:40:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(6,6,'07:00:00','08:40:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(7,7,'07:10:00','08:40:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(8,8,'07:10:00','08:45:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(9,9,'07:20:00','08:50:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(10,10,'07:30:00','08:45:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(11,11,'07:30:00','08:45:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(12,12,'07:25:00','08:50:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(13,13,'07:30:00','08:40:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(14,14,'07:30:00','08:50:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(15,15,'07:50:00','08:45:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(16,16,'08:00:00','08:50:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(17,17,'07:30:00','08:45:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(18,18,'07:30:00','08:40:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(19,19,'07:32:00','08:45:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(20,20,'07:25:00','08:40:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(21,21,'07:25:00','08:50:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(22,22,'07:25:00','08:45:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(23,23,'07:30:00','08:40:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(24,24,'07:30:00','08:50:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(25,25,'07:37:00','08:40:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(26,26,'07:50:00','08:40:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(27,27,'07:45:00','08:40:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(28,28,'07:55:00','08:40:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(29,29,'07:46:00','08:45:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(30,30,'08:00:00','08:50:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(31,31,'07:25:00','08:45:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(32,32,'07:25:00','08:40:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(33,33,'08:10:00','08:50:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(34,34,'08:30:00','08:45:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(35,35,'08:00:00','08:45:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(36,36,'07:30:00','08:50:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(37,37,'08:30:00','08:45:00','Mon,Tue,Wed,Thu,Fri,Sat'),
(38,38,'08:00:00','08:45:00','Mon,Tue,Wed,Thu,Fri,Sat');

SELECT 'VCE Real Data Loaded!' AS Status;
SELECT COUNT(*) AS total_routes FROM Routes;
SELECT COUNT(*) AS total_buses FROM Buses;
SELECT COUNT(*) AS total_stops FROM Stops;
SELECT COUNT(*) AS total_schedules FROM Schedules;
