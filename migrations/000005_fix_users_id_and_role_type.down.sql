CREATE TYPE user_role AS ENUM ('USER', 'ADMIN');

ALTER TABLE users
    ALTER COLUMN role TYPE user_role USING role::user_role;

ALTER TABLE users ALTER COLUMN id TYPE INTEGER;
