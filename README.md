Blood Donation System
Overview
The Blood Donation System is a full-stack application comprising a frontend built with React and a backend built with .NET Core (ASP.NET Core). The system provides functionality to manage and query blood donor information.

Features
Frontend (React):

User-friendly interface to add and search for blood donors.
Displays donor information in a table with options to edit or delete records.
Utilizes Bootstrap for styling.
Backend (.NET Core API):

CRUD operations for managing blood donor records.
Endpoint to retrieve donors based on parameters like Blood Group, Country, State, and City.
Integration with SQL Server for data persistence.
Getting Started
Prerequisites
.NET SDK 8
Node.js (for React)
SQL Server Express (or any SQL Server instance)
Visual Studio 2022 (for .NET Core) or any preferred IDE
Installation
Backend Setup
Clone the Repository

bash
Copy code
git clone https://github.com/moirfan-dev/blood-donation-system.git
cd blood-donation-system
Navigate to the Backend Directory

bash
Copy code
cd Backend
Set Up the Database

Ensure you have SQL Server running and create a database named BloodDonor.

Update the appsettings.json file with your connection string:
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=BloodDonor;Trusted_Connection=True;MultipleActiveResultSets=true;"
}
Apply Migrations

Run the following commands to apply the database migrations:

bash
Copy code
dotnet ef migrations add InitialCreate
dotnet ef database update
Build and Run the Project

bash
Copy code
dotnet build
dotnet run
The API will be available at http://localhost:5000.

Frontend Setup
Navigate to the Frontend Directory

bash
Copy code
cd ../Frontend
Install Dependencies

bash
Copy code
npm install
Run the Development Server

bash
Copy code
npm start
The React application will be available at http://localhost:3000.

API Endpoints:

Create Donor:

Endpoint: POST /api/blooddonors
Description: Creates a new blood donor record.
Request Body:
{
  "fullName": "John Doe",
  "mobile": "1234567890",
  "email": "john.doe@example.com",
  "bloodGroup": "A+",
  "country": "USA",
  "state": "NY",
  "city": "New York",
  "age": 30
}
Retrieve Donors
Endpoint: GET /api/blooddonors
Description: Retrieves a list of blood donors based on the specified query parameters.
Parameters:
bloodGroup (string) - Blood group of the donors (optional).
country (string) - Country where the donor resides (optional).
state (string) - State where the donor resides (optional).
city (string) - City where the donor resides (optional).
Example Request:
GET /api/blooddonors?country=USA&state=NY&city=New%20York
Response:
200 OK: Returns a list of matching donors.
Get Donor by ID
Endpoint: GET /api/blooddonors/{id}
Description: Retrieves a single blood donor record by ID.
Parameters:
id (integer) - The unique identifier of the donor.
Update Donor
Endpoint: PUT /api/blooddonors/{id}
Description: Updates an existing blood donor record.
Request Body:
{
  "fullName": "Jane Doe",
  "mobile": "0987654321",
  "email": "jane.doe@example.com",
  "bloodGroup": "B+",
  "country": "USA",
  "state": "CA",
  "city": "Los Angeles",
  "age": 28
}
Delete Donor
Endpoint: DELETE /api/blooddonors/{id}
Description: Deletes a blood donor record by ID.
Parameters:
id (integer) - The unique identifier of the donor.
Frontend Components
SearchForm
Functionality: Allows users to search for donors by Blood Group, Country, State, and City.
DonorList
Functionality: Displays a list of donors and provides options to edit or delete records.
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

Contact
For any inquiries, please contact mohamedirfanpopz@gmail.com.
