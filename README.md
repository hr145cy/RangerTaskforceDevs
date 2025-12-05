# RangerTaskforceDevs
The Rangers Ops Planner is a state-of-the-art, real-time collaborative board system designed to replace archaic, static mission planning tools like whiteboards, sticky notes, and paper timelines. This platform serves as the central Collaborative HQ Board where Ranger teams can plan, track, and execute missions together with seamless, synchronized updates.

This project was built to deliver a non-cluttering, tactical "Rangers Vibe" UI/UX, providing a focused, dark-themed command experience essential for mission-critical operations.

_____________________________________________________________________________________________________________________________________________________________________

Technology Stack: 

This project utilizes a modern, robust, full-stack architecture optimized for real-time performance.
  ~ Frontend >>	React.js >> styled-components, react-beautiful-dnd, @stomp/stompjs >> Dynamic UI and drag-and-drop functionality with a unique tactical aesthetic.
  ~ Real-time >> Spring WebSockets >> STOMP Protocol >> Secure and reliable bidirectional communication for immediate collaboration.
  ~ Backend >> Spring Boot (Java) >> REST APIs, Service Layer >> Robust, scalable mission logic and data handling.
  ~ Database >> MongoDB >> Spring Data MongoDB >> Flexible, non-relational storage perfect for document-based structures like boards, lists, and cards.

_____________________________________________________________________________________________________________________________________________________________________
Project Structure

rangers-ops-planner/
├── backend-springboot/   # Spring Boot application (Port 8080)
│   ├── src/main/java/com/rangers/...
│   ├── src/main/resources/application.properties
│   └── pom.xml
└── frontend-react/       # React application (Port 3000)
    ├── src/components/...
    ├── src/services/WebSocketService.js
    └── package.json

____________________________________________________________________________________________________________________________________________________________________
1. Backend Setup
   Navigate to the backend-springboot directory.

Build the project:
    ./mvnw clean install

Run the application:
    ./mvnw spring-boot:run
    
The server will start on http://localhost:8080.


2. Frontend Setup
   Navigate to the frontend-react directory.

Install dependencies:
npm install

Start the React application:
npm start

The frontend will open automatically on http://localhost:3000.

____________________________________________________________________________________________________________________________________________________________________

Brownie Points

Board Analytics: Implement metrics to track mission efficiency (e.g., average time cards spend in "In Progress").

Export as JSON: Feature to export entire board data for archiving or backup.

Authentication: Integrate Spring Security for user login and role-based access control.
