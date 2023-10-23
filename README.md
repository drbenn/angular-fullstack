# Docker commands
https://www.youtube.com/watch?v=gAkwW2tuIqE
- *docker ps* - lists all running containers
- *docker build -t nodeapp:1.0 .* - builds the docker container, -t tag is used to name the image/container 
- *docker run -p 5000:8080 <container id>* - PORT FORWARDING - (local:container)port 8080 is exposed in the docker file, but its not accessible to the outside world, must use -p flag to implement port forwarding from the Docker container to the local machines