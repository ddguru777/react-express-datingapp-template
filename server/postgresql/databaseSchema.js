const userSchema = `
CREATE TABLE users (
	  id SERIAL,
	  session_token VARCHAR(64) NULL DEFAULT NULL,
	  password_reset_token VARCHAR(64) NULL DEFAULT NULL,
	  password_reset_expire_at VARCHAR(64) NULL DEFAULT NULL,
	  connected VARCHAR(64) NULL DEFAULT NULL,
	  birthdate TIMESTAMPTZ DEFAULT NULL,
	  score INTEGER DEFAULT 0,
	  reported INTEGER NULL DEFAULT NULL,
	  login VARCHAR(64) NOT NULL,
	  password VARCHAR(255) NOT NULL,
	  firstname VARCHAR(255) NOT NULL,
	  lastname VARCHAR(255) NOT NULL,
	  email VARCHAR(255) NOT NULL,
	  sex VARCHAR(6) DEFAULT NULL,
	  sexual_orientation VARCHAR(255) DEFAULT 'bisexual',
	  bio VARCHAR(280) NULL DEFAULT NULL,
	  longitude VARCHAR(255) NULL DEFAULT NULL,
	  latitude VARCHAR(255) NULL DEFAULT NULL,
	  last_connection TIMESTAMP NULL DEFAULT NULL,
	  photos varchar(1000) NOT NULL DEFAULT '[null,null,null,null,null]',
	  occupation VARCHAR(50) NULL DEFAULT NULL,
	  geolocation_allowed BOOLEAN DEFAULT FALSE,
	  onboarding BOOLEAN DEFAULT FALSE,
	  PRIMARY KEY (id)
);

CREATE TABLE tags (
	  id SERIAL,
	  tag VARCHAR(64) NOT NULL,
	  user_id INTEGER NULL DEFAULT NULL,
	  PRIMARY KEY (id)
);

CREATE TABLE likes (
	  id SERIAL,
	  sender INTEGER NULL DEFAULT NULL,
	  receiver INTEGER NULL DEFAULT NULL,
	  seen BOOLEAN DEFAULT FALSE,
	  clicked BOOLEAN DEFAULT FALSE,
	  created_at TIMESTAMPTZ DEFAULT NULL,
	  PRIMARY KEY (id)
);

CREATE TABLE visits (
	  id SERIAL,
	  sender INTEGER NULL DEFAULT NULL,
	  receiver INTEGER NULL DEFAULT NULL,
	  seen BOOLEAN DEFAULT FALSE,
	  clicked BOOLEAN DEFAULT FALSE,
	  created_at TIMESTAMPTZ DEFAULT NULL,
	  PRIMARY KEY (id)
);

CREATE TABLE messages (
	  id SERIAL,
	  sender INTEGER NULL DEFAULT NULL,
	  receiver INTEGER NULL DEFAULT NULL,
	  seen BOOLEAN DEFAULT FALSE,
	  clicked BOOLEAN DEFAULT FALSE,
	  created_at TIMESTAMPTZ DEFAULT NULL,
	  message VARCHAR(500) DEFAULT NULL,
	  PRIMARY KEY (id)
);

`;

module.exports = userSchema;
