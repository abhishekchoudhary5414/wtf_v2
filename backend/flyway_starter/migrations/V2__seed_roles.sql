-- V2__seed_roles.sql
-- Seed default roles for WTF University

INSERT INTO roles (name, description) VALUES
    ('student', 'Student or individual patient wellness seeker'),
    ('coach', 'Certified WTF life coach or mental wellness professional'),
    ('institution', 'Colleges, universities, schools, or healthcare partner organizations'),
    ('admin', 'Platform administrator with system management access')
ON CONFLICT (name) DO NOTHING;

