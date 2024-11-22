
# Book Review Application

This project is a **Book Review Application** built using a **React** frontend and a **Spring Boot** backend. The backend is connected to a MySQL database for storing and managing data.

## Table of Contents
- Technologies Used
- Setup
  - Frontend Setup
  - Backend Setup
- Running the Application
- API Endpoints

---



## Technologies Used

### Frontend
- **React**: For building the user interface.
- **CSS/Tailwind CSS**: For styling components.
- **FLowbite Components**: For components.
### Backend
- **Spring Boot**: Backend framework for handling business logic and API.
- **MySQL**: Relational database for storing reviews and other data.

---

## Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (for frontend)
- Java 21 (for backend)
- MySQL (for database)

---

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```


### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Configure the database:
   - Create a MySQL database named `review_db`.
   - Update the following properties in `src/main/resources/application.properties`:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/review_db
     spring.datasource.username=
     spring.datasource.password=
     spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

     spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.show-sql=true
     ```

3. Build and run the backend:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`.


## API Endpoints

The backend exposes the following endpoints (example):

| HTTP Method | Endpoint            | Description                     |
|-------------|---------------------|---------------------------------|
| `GET`       | `/api/reviews`      | Get all reviews                |
| `POST`      | `/api/reviews`      | Add a new review               |
| `PUT`       | `/api/reviews/{id}` | Update a review by ID          |
| `DELETE`    | `/api/reviews/{id}` | Delete a review by ID          |

