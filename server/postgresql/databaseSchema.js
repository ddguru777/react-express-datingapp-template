const userSchema = `
CREATE TABLE users (
	  id SERIAL,
	  connected INTEGER NULL DEFAULT NULL,
	  age INTEGER NULL DEFAULT NULL,
	  score INTEGER DEFAULT 0,
	  reported INTEGER NULL DEFAULT NULL,
	  login VARCHAR(64) NOT NULL,
	  password VARCHAR(255) NOT NULL,
	  firstname VARCHAR(255) NOT NULL,
	  lastname VARCHAR(255) NOT NULL,
	  email VARCHAR(255) NOT NULL,
	  sex VARCHAR(6) DEFAULT NULL,
	  sexual_orientation VARCHAR(255) DEFAULT 'bisexual',
	  bio VARCHAR(560) NULL DEFAULT NULL,
	  longitude VARCHAR(255) NULL DEFAULT NULL,
	  latitude VARCHAR(255) NULL DEFAULT NULL,
	  last_connection TIMESTAMP NULL DEFAULT NULL,
	  PRIMARY KEY (id)
);
`;

module.exports = userSchema;