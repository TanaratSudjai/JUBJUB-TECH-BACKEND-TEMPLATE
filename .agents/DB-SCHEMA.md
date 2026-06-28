```sql
CREATE TABLE users ( 
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL, 
    user_email VARCHAR(255) NOT NULL UNIQUE, 
    user_password VARCHAR(255) NOT NULL, 
    user_phone VARCHAR(20), 
    user_age INT, 
    user_avatar VARCHAR(255), 
    user_status TINYINT DEFAULT 1, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    created_by INT, 
    updated_at TIMESTAMP NULL DEFAULT NULL, 
    updated_by INT, 
    deleted_at TIMESTAMP NULL DEFAULT NULL, 
    deleted_by INT 
    );

```