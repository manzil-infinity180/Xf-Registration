# Xf-Registration

[![GitHub Repository](https://img.shields.io/badge/GitHub-Xf--Registration__frontend-blue?style=flat-square&logo=github)](https://github.com/manzil-infinity180/Xf-Registration_frontend)

## Introduction

Xf-Registration is a comprehensive user registration and management system designed to streamline the onboarding process and enhance user interaction. This project offers a robust set of features for user registration, profile management, and user discovery.

### Key Features

- **User Registration with Email Notification**
  - Automated email confirmation upon successful registration
  ```
  Subject: 'Xf Registration Successfully Completed 🦾'
  Message: 'Thank you for registering with Xf. You can now explore the platform.'
  ```

- **Advanced User Search**
  - Find users based on skills, username, postal code, or college name
  - Proximity-based search using radius, latitude, and longitude

- **Profile Management**
  - Update phone number and username
  - Upload and manage profile photo and background image
  - Secure image storage using multer package

- **Account Actions**
  - User registration
  - Profile updates
  - Account deletion

- **OAuth Integration**
  - Seamless authentication with GitHub

For detailed API documentation, please visit our [Postman Documentation](https://documenter.getpostman.com/view/27140962/2s9YeD8D4V).

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your system.

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/manzil-infinity180/Xf-Registration_frontend.git
   cd Xf-Registration_frontend
   ```

2. Install dependencies:
   ```
   npm install express nodemailer nodemon passport passport-github validate validator express-session jsonwebtoken mongodb mongoose multer passport-google-oauth crypto-js
   ```

3. Configure environment variables:
   - Create a `config.env` file in the root directory
   - Add necessary environment variables (refer to `config_example`)

4. Start the application:
   ```
   npm start
   ```

## Feature Showcase

### GitHub OAuth Authentication

![GitHub OAuth Login](https://github.com/manzil-infinity180/Xf-Registration/assets/119070053/24d34cd0-34d9-46fb-b1e2-dacce1e6e74e)
![GitHub OAuth Authorization](https://github.com/manzil-infinity180/Xf-Registration/assets/119070053/f2050239-973a-4e42-90e3-6a0547732603)

### User Registration Interface

![User Registration Form](https://github.com/manzil-infinity180/Xf-Registration/assets/119070053/a769fe0c-e49d-4285-8cc0-c51e43f369c8)

### User Profile View

![User Profile Page](https://github.com/manzil-infinity180/Xf-Registration/assets/119070053/7b1fc6e3-829f-49cb-8377-41bdb430844a)

## Contributing

We welcome contributions to the Xf-Registration project. Please feel free to submit issues, fork the repository and send pull requests!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape Xf-Registration
- Special thanks to the open-source community for the fantastic tools and libraries used in this project
