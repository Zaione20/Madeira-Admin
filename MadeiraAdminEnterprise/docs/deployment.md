# Deployment Documentation for Madeira Admin Enterprise

## Overview

This document outlines the deployment procedures for the Madeira Admin Enterprise solution, which includes the API, Web, and Desktop applications. The deployment can be performed using Docker for containerization or directly on a server.

## Prerequisites

- .NET 8 SDK installed
- PostgreSQL database server
- Docker (if using containerization)
- Access to the server or cloud environment for deployment

## Deployment Steps

### 1. Database Setup

1. **Create a PostgreSQL Database:**
   - Create a new database for the application using the PostgreSQL command line or a database management tool.

2. **Run Database Migrations:**
   - Navigate to the `src/Madeira.Admin.Infrastructure` project directory.
   - Run the following command to apply migrations:
     ```
     dotnet ef database update
     ```

### 2. API Deployment

1. **Build the API Project:**
   - Navigate to the `src/Madeira.Admin.API` project directory.
   - Run the following command to build the project:
     ```
     dotnet publish -c Release -o ./publish
     ```

2. **Run the API:**
   - You can run the API using the command:
     ```
     dotnet ./publish/Madeira.Admin.API.dll
     ```
   - Alternatively, if using Docker, build the Docker image and run the container:
     ```
     docker build -t madeira-admin-api .
     docker run -d -p 5000:80 madeira-admin-api
     ```

### 3. Web Application Deployment

1. **Build the Web Project:**
   - Navigate to the `src/Madeira.Admin.Web` project directory.
   - Run the following command to build the project:
     ```
     dotnet publish -c Release -o ./publish
     ```

2. **Run the Web Application:**
   - You can run the Web application using the command:
     ```
     dotnet ./publish/Madeira.Admin.Web.dll
     ```
   - Alternatively, if using Docker, build the Docker image and run the container:
     ```
     docker build -t madeira-admin-web .
     docker run -d -p 5001:80 madeira-admin-web
     ```

### 4. Desktop Application Deployment

- The Desktop application is a WPF application and is typically distributed as an installer or packaged application. Ensure that the target machines have the .NET 8 runtime installed.

### 5. Environment Configuration

- Update the `appsettings.json` files in both the API and Web projects to reflect the production database connection strings and any other environment-specific settings.

### 6. Monitoring and Maintenance

- Set up logging and monitoring for the API and Web applications to ensure they are running smoothly.
- Regularly check for updates and apply any necessary patches or upgrades.

## Conclusion

Following these steps will help you successfully deploy the Madeira Admin Enterprise solution. Ensure to test the deployment in a staging environment before going live.