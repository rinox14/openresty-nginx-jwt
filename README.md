# 🔐 JWT Authentication at Nginx Proxy Layer (OpenResty)

- This project demonstrates how to implement **JWT authentication at the Nginx proxy layer** using **OpenResty (Nginx + Lua)**, instead of handling authentication logic inside application services.

### Architecture Overview
```
Client
|
| HTTP Request (JWT)
v
OpenResty (Nginx + Lua)
| ├── /api/login → Auth API (issue JWT)
| ├── /api/public/ → Public API (no auth)
| └── /api/protected/user → JWT validation at Nginx
|
v
```

### Run with Docker Compose

```bash
git clone https://github.com/rinox14/openresty-nginx-jwt.git
cd openresty-nginx-jwt
docker-compose up 
```

### Test with curl
- Get JWT Token
    ```bash
    curl http://localhost:8080/api/login 
    ```

- Get route public
    ```bash
    curl http://localhost:8080/api/public 
    ```
- Access Protected API (without token)
    ```bash
    curl http://localhost:8080/api/protected/user
    ```
    Response:
    ```
      Missing Authorization header
    ```  
- Access Protected API (with JWT)
    ```bash
    curl -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
    http://localhost:8080/api/protected/user
    ```
    Example:
    ```bash
    curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJpbm9sdXYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3Njk2MTg0NDksImV4cCI6MTc2OTYyMjA0OX0.lcFTD8-25olSe_EbbSPySQaHYJLPsSBdRFmf8QaFLBs" http://localhost:8080/api/protected/user
    ```
    Response:
    ```
    Hello user: [rinoluv] -> is a [admin]
    ```
