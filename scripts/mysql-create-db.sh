#!/bin/bash

# Create the database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS project_silver;"

# Switch to the new database
# mysql -u root -p project_silver

# # Create the user table
# mysql -u root -p project_silver -e "CREATE TABLE IF NOT EXISTS user (
#     username VARCHAR(255) NOT NULL,
#     password VARCHAR(255) NOT NULL,
#     date DATE NOT NULL
# );"

# # Insert dummy data into the user table
# mysql -u root -p project_silver -e "INSERT INTO user (username, password, date) VALUES
#     ('user1', 'password1', '2023-11-03'),
#     ('user2', 'password2', '2023-11-04'),
#     ('user3', 'password3', '2023-11-05'),
#     ('user4', 'password4', '2023-11-06'),
#     ('user5', 'password5', '2023-11-07');"

# # Create the dummy_data table
# mysql -u root -p project_silver -e "CREATE TABLE IF NOT EXISTS dummy_data (
#     id INT NOT NULL AUTO_INCREMENT,
#     data VARCHAR(255) NOT NULL,
#     PRIMARY KEY (id)
# );"

# # Insert dummy data into the dummy_data table
# mysql -u root -p project_silver -e "INSERT INTO dummy_data (data) VALUES
#     ('This is row 1 of dummy data.'),
#     ('This is row 2 of dummy data.'),
#     ('This is row 3 of dummy data.'),
#     ('This is row 4 of dummy data.'),
#     ('This is row 5 of dummy data.');"