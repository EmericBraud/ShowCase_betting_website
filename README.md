# React Showcase Website

This repository contains a **showcase project** of a React-based website, deployed using **Docker Compose** with a connected database and a **responsive UI**. 

> ⚠️ **Work in Progress:** The project is not fully completed yet, but basic functionalities like **user login** are already implemented.

## Features

- React frontend with a responsive design
- PostgreSQL database integrated via Docker Compose
- User authentication and login system
- Fully containerized environment for easy setup
- Prisma migrations applied for database schema management

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Run the Project

1. Clone the repository:

```bash
git clone https://github.com/EmericBraud/ShowCase_betting_website.git
cd react-showcase-website
```

2. Create a .env file with the following variables:
```
# In frontend/autocook folder.
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret

# In  main folder
STABLEHORDE_API_KEY=""
OPEN_API_KEY=""
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DB="db"
```

3. Start the containers:

```
docker compose up --build
```

4. Visit the app in your browser:
```
http://localhost:3000
```
### Notes

The backend API runs on port 8080

Database migrations are handled by Prisma

Some features are still in development, so expect occasional issues or incomplete functionality.

License

This project is for showcase purposes and does not currently have a license.
