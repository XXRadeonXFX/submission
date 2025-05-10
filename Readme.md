# Microservices Application Containerization

This project containerizes a Node.js-based microservices application consisting of three services:
- User Service (Port 3000)
- Product Service (Port 3001)
- Gateway Service (Port 3003)

## Prerequisites

- Docker Engine (version 20.10.x or later)
- Docker Compose (version 2.x or later)
- Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Build and Start the Services

```bash
docker-compose up --build
```

This command will:
- Build Docker images for all three services
- Create and start containers
- Configure the shared network
- Map the container ports to host ports

To run the services in detached mode:

```bash
docker-compose up -d --build
```

### 3. Verify the Services are Running

```bash
docker-compose ps
```

You should see all three services running without any exit codes.

## Testing Each Service

### User Service

- Access the user service directly:
```bash
curl http://localhost:3000/users
```

- Expected response: List of users in JSON format

### Product Service

- Access the product service directly:
```bash
curl http://localhost:3001/products
```

- Expected response: List of products in JSON format

### Gateway Service

- Access the gateway service:
```bash
curl http://localhost:3003/api/users
curl http://localhost:3003/api/products
```

- Expected response: The gateway should return data from the respective services

## Troubleshooting

### Services Not Starting

1. Check container logs:
```bash
docker-compose logs user-service
docker-compose logs product-service
docker-compose logs gateway-service
```

2. Verify ports aren't already in use:
```bash
netstat -tulpn | grep 3000
netstat -tulpn | grep 3001
netstat -tulpn | grep 3003
```

### Network Issues Between Services

1. Ensure all services are on the same network:
```bash
docker network inspect microservices-network
```

2. Try pinging between containers:
```bash
docker exec -it gateway-service ping user-service
docker exec -it gateway-service ping product-service
```

### Docker Compose Commands Reference

- Stop all services:
```bash
docker-compose down
```

- Rebuild a specific service:
```bash
docker-compose build user-service
```

- View logs from all services:
```bash
docker-compose logs -f
```

## Service Screenshots

### All Services Running in Docker
![All Services Running](images/all-services-running.png)

### User Service Response
![User Service Response](images/user-service-response.png)

### Product Service Response
![Product Service Response](images/product-service-response.png)

### Gateway Service Response
![Gateway Service Response](images/gateway-service-response.png)

## Directory Structure

```
submission/
├── user-service/
│   └── Dockerfile
├── product-service/
│   └── Dockerfile
├── gateway-service/
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Maintenance

To update any service:

1. Make changes to the service code
2. Rebuild and restart the specific service:
```bash
docker-compose up -d --build <service-name>
```