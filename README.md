# SonarQube Demo

A simple **E-Wallet Demo Project** built to demonstrate the integration and analysis capabilities of **SonarQube**.  
This project showcases static code analysis, quality gates, and best coding practices in a real-world context.

---

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Future Development](#future-development)
- [Author](#author)
- [License](#license)

---

## About the Project
**SonarQube Demo** is a sample **E-Wallet web application** that demonstrates how developers can apply SonarQube to monitor and improve code quality.  
It focuses on essential backend and frontend interactions while keeping the business logic simple enough for educational and showcase purposes.

---

## Features
- **User Authentication** – Register and login securely.  
- **Dashboard** – Displays mock financial operations such as:
  - Mobile top-up  
  - Money transfer to friends  
  - Electricity bill payment  
  - Movie ticket booking  
- **CRUD operations** – Basic data management through the dashboard.  
- **SonarQube Integration** – Analyze TypeScript and React code quality metrics.  

---

## Tech Stack
**Frontend:** React  
**Backend:** TypeScript (Node.js)  
**ORM:** Prisma  
**Database:** SQL (via Prisma)  
**CI/CD & Hosting:** Vercel  
**Code Quality:** SonarQube

---

## Installation
No installation required — the project is deployed directly on **Vercel**.

However, to run locally:
```bash
# Clone repository
git clone https://github.com/kiet-ta/sonarqube-demo.git
cd sonarqube-demo

# Install dependencies
npm install

# Run development server
npm run dev
````

Default server runs on [http://localhost:3000](http://localhost:3000)

---

## Usage

1. Open the deployed site on Vercel.
2. Register a new account or log in with existing credentials.
3. Explore the dashboard:

   * Simulate wallet functions like top-up, transfers, bill payment, and booking.
4. SonarQube dashboard will provide code quality reports for this project’s source.

*(Screenshots and demo links will be added later.)*

---

## Future Development

* Enhanced transaction history with charts
* Role-based authentication
* Real-time notifications
* API documentation with Swagger
* Continuous Integration with SonarCloud

---

## Author

**Kiet Ta**
GitHub: [@kiet-ta](https://github.com/kiet-ta)

---

## License

This project is licensed under the **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0)**.
You may use and share the project for **personal or educational purposes**, but you **cannot modify** or **sell** it.

For details, visit: [https://creativecommons.org/licenses/by-nc-nd/4.0/](https://creativecommons.org/licenses/by-nc-nd/4.0/)

---

## Notes

This project is for **educational and SonarQube demonstration purposes only**.
It does not process real payments or store sensitive data.


© TAK 2025
