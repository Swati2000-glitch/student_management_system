CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    admission_no VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100),
    course VARCHAR(100),
    year INT,
    dob DATE,
    email VARCHAR(100),
    mobile VARCHAR(15),
    gender VARCHAR(10),
    address TEXT,
    photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
