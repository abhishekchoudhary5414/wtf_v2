-- V3__create_admin_tables.sql
-- Administrative roles, details, and authentication credentials

CREATE TABLE IF NOT EXISTS admin_roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_details (
    id SERIAL PRIMARY KEY,
    role_id INT NOT NULL REFERENCES admin_roles(id) ON DELETE RESTRICT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    mobile_number VARCHAR(30),
    email_id VARCHAR(255) UNIQUE NOT NULL,
    profile_url VARCHAR(255),
    is_live BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_login (
    id SERIAL PRIMARY KEY,
    admin_id INT NOT NULL REFERENCES admin_details(id) ON DELETE CASCADE,
    email_id VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_locked BOOLEAN NOT NULL DEFAULT FALSE,
    failed_login_attempts INT NOT NULL DEFAULT 0,
    locked_until TIMESTAMP WITH TIME ZONE,
    last_login TIMESTAMP WITH TIME ZONE,
    is_first_time_password_changed BOOLEAN NOT NULL DEFAULT FALSE,
    password_changed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for fast query lookup
CREATE INDEX IF NOT EXISTS idx_admin_details_email ON admin_details(email_id);
CREATE INDEX IF NOT EXISTS idx_admin_login_email ON admin_login(email_id);
CREATE INDEX IF NOT EXISTS idx_admin_login_admin_id ON admin_login(admin_id);

-- Seed default Super Admin role
INSERT INTO admin_roles (role_name, description)
VALUES ('Super Admin', 'Full administrative authority over platform and healthcare entities')
ON CONFLICT (role_name) DO NOTHING;

