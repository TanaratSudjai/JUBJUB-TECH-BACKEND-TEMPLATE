```sql
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL,
    role_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    updated_at TIMESTAMP NULL DEFAULT NULL,
    updated_by INT,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    deleted_by INT
);

CREATE TABLE users ( 
    user_id SERIAL PRIMARY KEY,
    role_id INT NULL,
    user_name VARCHAR(255) NOT NULL, 
    user_email VARCHAR(255) NOT NULL UNIQUE, 
    user_password VARCHAR(255) NOT NULL, 
    user_phone VARCHAR(20), 
    user_age INT, 
    user_avatar VARCHAR(255), 
    user_status SMALLINT DEFAULT 1, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    created_by INT, 
    updated_at TIMESTAMP NULL DEFAULT NULL, 
    updated_by INT, 
    deleted_at TIMESTAMP NULL DEFAULT NULL, 
    deleted_by INT,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);
```