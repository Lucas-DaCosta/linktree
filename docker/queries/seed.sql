-- connect the seed : docker exec -i docker-db-1 psql -U lucasDC -d lucasDC -f queries/seed.sql

INSERT INTO users (username, speciality, description, avatar) VALUES
('Administrator', 'admin', 'I am the admin', ''),
('John Doe', 'dev front', 'Je code en font des applications web avec react et angular', ''),
('Jane Smith', 'dev back', 'Je code des API back-end pour des applications web', ''),
('Arthur Morgan', 'dev full stack', 'Je créé des applications web de A à Z', 'https://imgs.search.brave.com/UHkb6F5dO25oTgmYYVE-SQ2flCzb80-_-44qwW1VPfU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/aS1zd2Vhci1hcnRo/dXItbW9yZ2FuLWlz/LW9uZS1vZi10aGUt/ZmV3LWdhbWUtY2hh/cmFjdGVycy12MC1u/bzU2N2F6cnNkeGUx/LmpwZWc_d2lkdGg9/NjQwJmNyb3A9c21h/cnQmYXV0bz13ZWJw/JnM9YzczYmEzOTI1/NmI3ZDlkMmZiZTRl/YWFiZDY4MzkxMGIw/YjFjNGRhMw');

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
-- Administrator (id_user: 1)
('LinkedIn professionnel', 'linkedin', 'https://www.linkedin.com/in/administrator', 1),
('GitHub - Scripts Admin', 'github', 'https://github.com/administrator/admin-scripts', 1),

-- John Doe - Dev Front (id_user: 2)
('LinkedIn', 'linkedin', 'https://www.linkedin.com/in/johndoe-frontend', 2),
('GitHub - Projets React', 'github', 'https://github.com/johndoe/react-projects', 2),
('GitHub - Projets Angular', 'github', 'https://github.com/johndoe/angular-apps', 2),
('Tutoriels React', 'youtube', 'https://www.youtube.com/@johndoe-react', 2),
('Chaîne CSS & Design', 'youtube', 'https://www.youtube.com/@johndoe-css', 2),

-- Jane Smith - Dev Back (id_user: 3)
('LinkedIn Professionnel', 'linkedin', 'https://www.linkedin.com/in/janesmith-backend', 3),
('GitHub - APIs REST', 'github', 'https://github.com/janesmith/rest-apis', 3),
('GitHub - Microservices', 'github', 'https://github.com/janesmith/microservices', 3),
('Tutoriels Node.js', 'youtube', 'https://www.youtube.com/@janesmith-nodejs', 3),

-- Arthur Morgan - Dev Full Stack (id_user: 4)
('Mon LinkedIn', 'linkedin', 'https://www.linkedin.com/in/arthurmorgan-fullstack', 4),
('Ma chaîne YouTube', 'youtube', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 4),
('Mes projets GitHub', 'github', 'https://github.com/arthurmorgan/fullstack-projects', 4),
('GitHub - Front-end', 'github', 'https://github.com/arthurmorgan/frontend-demos', 4),
('GitHub - Back-end', 'github', 'https://github.com/arthurmorgan/backend-apis', 4),
('Tutoriels Full Stack', 'youtube', 'https://www.youtube.com/@arthurmorgan-dev', 4);