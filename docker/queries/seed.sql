-- connect the seed : docker exec -i docker-db-1 psql -U lucasDC -d lucasDC -f queries/seed.sql

INSERT INTO users (username, speciality, description) VALUES
('Administrator', 'admin', 'I am the admin'),
('John Doe', 'dev front', 'Je code en font des applications web avec react et angular'),
('Jane Smith', 'dev back', 'Je code des API back-end pour des applications web'),
('Arthur Morgan', 'dev full stack', 'Je créé des applications web de A à Z');

INSERT INTO auth (email, password, id_user) VALUES
('admin@example.com', '123Admin', 1),
('john@gmail.com', 'johnMarston', 2),
('jane@gmail.com', 'jane#98', 3),
('arthur@valentine.us', 'Tahiti99', 4);

INSERT INTO timeslots (start_date, end_date, username, user_email, id_user) VALUES
('2025-11-10 09:00:00', '2025-11-10 12:00:00', 'Trevor', 'trevor.phillips@gmail.com', 4),
('2025-11-11 14:00:00', '2025-11-11 17:00:00', 'Franklin', 'Franklin.clinton@gmail.com', 4),
('2025-12-01 10:00:00', '2025-12-01 15:00:00', 'Cornifer', 'Cornifer@maps.com', 4),
('2025-11-20 09:00:00', '2025-11-21 16:00:00', 'Steve', 'steve@mojang.com', 3);

INSERT INTO linktree (name, logo, url, id_user) VALUES
('Mon linkedIn', 'linkedIn', 'https://fr.wikipedia.org/wiki/LinkedIn', 4),
('Ma chaine youtube', 'youtube', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 4),
('Mes projets', 'github', 'https://fr.wikipedia.org/wiki/GitHub', 4);