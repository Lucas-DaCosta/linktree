-- connect the seed : docker exec -i docker-db-1 psql -U lucasDC -d lucasDC -f queries/seed.sql

INSERT INTO users (username, speciality, description, avatar) VALUES
('Arthur Morgan', 'dev full stack', 'Je créé des applications web de A à Z', 'https://imgs.search.brave.com/UHkb6F5dO25oTgmYYVE-SQ2flCzb80-_-44qwW1VPfU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/aS1zd2Vhci1hcnRo/dXItbW9yZ2FuLWlz/LW9uZS1vZi10aGUt/ZmV3LWdhbWUtY2hh/cmFjdGVycy12MC1u/bzU2N2F6cnNkeGUx/LmpwZWc_d2lkdGg9/NjQwJmNyb3A9c21h/cnQmYXV0bz13ZWJw/JnM9YzczYmEzOTI1/NmI3ZDlkMmZiZTRl/YWFiZDY4MzkxMGIw/YjFjNGRhMw');
('Dony  Boubzi', 'marketing digital', 'Je vous apprend à arnaquer les gens', 'https://yt3.googleusercontent.com/ytc/AIdro_kgViksrHa4dXWFP98GqdT4oGHZR4J4moqgTzyCcP3sOyQ=s900-c-k-c0x00ffffff-no-rj'),
('John Doe', 'dev front', 'Je code en font des applications web avec react et angular', ''),
('Jane Smith', 'dev back', 'Je code des API back-end pour des applications web', ''),


INSERT INTO auth (email, password, id_user) VALUES
('arthur@valentine.us', 'Tahiti99', 1);
('admin@example.com', '123Admin', 2),
('john@gmail.com', 'johnMarston', 3),
('jane@gmail.com', 'jane#98', 4),

INSERT INTO timeslots (start_date, end_date, username, user_email, id_user) VALUES
('2025-11-10 09:00:00', '2025-11-10 12:00:00', 'Trevor', 'trevor.phillips@gmail.com', 1),
('2025-11-11 14:00:00', '2025-11-11 17:00:00', 'Franklin', 'Franklin.clinton@gmail.com', 1),
('2025-12-01 10:00:00', '2025-12-01 15:00:00', 'Cornifer', 'Cornifer@maps.com', 1),
('2025-11-20 09:00:00', '2025-11-21 16:00:00', 'Steve', 'steve@mojang.com', 3);

INSERT INTO linktree (name, logo, url, id_user) VALUES
-- Dony
('LinkedIn professionnel', 'linkedin', 'https://www.linkedin.com/', 2),
('GitHub - Scripts Admin', 'github', 'https://github.com', 2),

-- John Doe 
('LinkedIn', 'linkedin', 'https://www.linkedin.com', 3),
('GitHub - Projets React', 'github', 'https://github.com', 3),
('GitHub - Projets Angular', 'github', 'https://github.com', 3),
('Tutoriels React', 'youtube', 'https://www.youtube.com', 3),
('Chaîne CSS & Design', 'youtube', 'https://www.youtube.com', 3),

-- Jane Smith 
('LinkedIn Professionnel', 'linkedin', 'https://www.linkedin.com', 4),
('GitHub - APIs REST', 'github', 'https://github.com', 4),
('GitHub - Microservices', 'github', 'https://github.com', 4),
('Tutoriels Node.js', 'youtube', 'https://www.youtube.com', 4),

-- Arthur Morgan
('Mon LinkedIn', 'linkedin', 'https://www.linkedin.com/in/arthur-morgan-85a7a728a/', 1),
('Ma chaîne YouTube', 'youtube', 'https://www.youtube.com/@RogerClarkactor', 1),
('Mes projets GitHub', 'github', 'https://github.com', 1),
('Tutoriels Full Stack', 'youtube', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 1);