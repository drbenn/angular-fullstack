#!/bin/bash

# Some text logging
echo "Hello World!"
echo "This is a basic shell script"
echo "before executing with - ./test.sh - you must make the bash file executable by running command - chmod +x test.sh -"

# Change directory and Run existing container
cd server/node
docker run -p 5000:8080 dfabb01ebc5d