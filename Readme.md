# Microservices Containerization Project

This project containerizes a Node.js-based microservices application consisting of four services:
- User Service (Port 3000)
- Product Service (Port 3001)
- Order Service (Port 3002)
- Gateway Service (Port 3003)

## Prerequisites

- Docker Engine (version 20.10.x or later)
- Docker Compose (version 2.x or later)

## Setup Instructions

### 1. Directory Structure

Ensure your project has the following structure:
```
submission/
├── user-service/
│   ├── Dockerfile
│   ├── package.json
│   └── app.js
├── product-service/
│   ├── Dockerfile
│   ├── package.json
│   └── app.js
├── order-service/
│   ├── Dockerfile
│   ├── package.json
│   └── app.js
├── gateway-service/
│   ├── Dockerfile
│   ├── package.json
│   └── app.js
├── docker-compose.yml
└── README.md
```

### 2. Build and Start the Services

```bash
docker-compose up --build
```

This command will:
- Build Docker images for all four services
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

You should see all four services running without any exit codes.

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

### Order Service

- Access the order service directly:
```bash
curl http://localhost:3002/orders
```

- Expected response: List of orders in JSON format

### Gateway Service

- Access the gateway service:
```bash
curl http://localhost:3003/api/users
curl http://localhost:3003/api/products
curl http://localhost:3003/api/orders
```

- Expected response: The gateway should return data from the respective services

## Service Descriptions

### User Service
A simple microservice that provides user information through RESTful endpoints.

### Product Service
A microservice that provides product information through RESTful endpoints.

### Order Service
A microservice that provides order information through RESTful endpoints.

### Gateway Service
An API gateway that routes requests to the appropriate microservices and aggregates responses.

## Troubleshooting

### Services Not Starting

1. Check container logs:
```bash
docker-compose logs user-service
docker-compose logs product-service
docker-compose logs order-service
docker-compose logs gateway-service
```

2. Verify ports aren't already in use:
```bash
netstat -tulpn | grep 3000
netstat -tulpn | grep 3001
netstat -tulpn | grep 3002
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
docker exec -it gateway-service ping order-service
```

## Docker Compose Commands Reference

- Stop all services:
```bash
docker-compose down
```

- Restart a specific service:
```bash
docker-compose restart <service-name>
```

- View logs from all services:
```bash
docker-compose logs -f
```

- View logs from a specific service:
```bash
docker-compose logs -f <service-name>
```

## Maintenance

To update any service:

1. Make changes to the service code
2. Rebuild and restart the specific service:
```bash
docker-compose up -d --build <service-name>
```
