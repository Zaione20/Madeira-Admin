# Madeira Admin Enterprise

Madeira Admin Enterprise is a comprehensive solution designed for the administrative, financial, and ministerial management of churches. This application is built using modern technologies including .NET 8, WPF, ASP.NET Core, and PostgreSQL, following a clean architecture structure to ensure maintainability and scalability.

## Project Structure

The project is organized into several layers, each serving a specific purpose:

- **API Layer**: Contains the ASP.NET Core Web API for handling HTTP requests and responses.
- **Web Layer**: A Blazor-based web application for user interaction and management.
- **Desktop Layer**: A WPF application providing a rich desktop experience for users.
- **Application Layer**: Contains business logic and service interfaces.
- **Domain Layer**: Defines the core entities and domain logic.
- **Infrastructure Layer**: Manages data access and external services.
- **Shared Layer**: Contains common utilities and shared code.

## Technologies Used

- **.NET 8**: The latest version of the .NET framework for building applications.
- **WPF**: Windows Presentation Foundation for creating desktop applications.
- **ASP.NET Core**: A cross-platform framework for building web applications and APIs.
- **PostgreSQL**: A powerful, open-source relational database system.
- **Entity Framework Core**: An ORM for data access in .NET applications.

## Getting Started

To get started with the Madeira Admin Enterprise project, follow these steps:

1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   ```

2. **Navigate to the Project Directory**:
   ```
   cd MadeiraAdminEnterprise
   ```

3. **Set Up the Database**:
   - Ensure PostgreSQL is installed and running.
   - Run the SQL scripts located in `docker/postgres/init.sql` to initialize the database.

4. **Build the Solution**:
   ```
   dotnet build
   ```

5. **Run the API**:
   ```
   cd src/Madeira.Admin.API
   dotnet run
   ```

6. **Run the Web Application**:
   ```
   cd src/Madeira.Admin.Web
   dotnet run
   ```

7. **Run the Desktop Application**:
   ```
   cd src/Madeira.Admin.Desktop
   dotnet run
   ```

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the contributors and the community for their support and feedback.
- Special thanks to the developers of the technologies used in this project.