# Issue Tracker Project

## Introduction
This project is a web application for issue tracking, where users can log in or create a new account, then add and track issues through a simple and user-friendly interface.

## Main Interfaces

### 1. Sign In Page
- Contains input fields for email and password.
- "Remember me" checkbox to remember user credentials.
- Sign-in button.
- Option to sign in with Google or Facebook.
- "Forgot your password?" link for account recovery.
- Link to create a new account.

### 2. Sign Up Page
- Contains input fields for creating a new account, including:
  - Email
  - Username
  - Password
  - Confirm Password
- Button to create an account.
- Link to navigate to the sign-in page if the user already has an account.

### 3. Home Page
- Contains two main buttons:
  - **Add New Issue**: Redirects the user to the add issue page.
  - **View Issues**: Redirects the user to the issue list.

### 4. Add Issue Page
- Contains a form to add a new issue with the following fields:
  - Title
  - Description
  - Image URL (optional)
  - User ID
  - Username
- "Add" button to save the issue.

### 5. Issue List Page
- Displays a list of recorded issues with the following information:
  - Issue title.
  - Issue status (Open or Closed).
  - Date and time of creation.
  - Counter for tracking interactions with the issue.
- Issue control options:
  - Delete issue.
  - Edit issue.
  - Increase or decrease the counter.
- **Export Issues to CSV** button.
- Filters to sort issues by status and layout.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript, React
- **Backend:** Node.js, Express
- **Database:** MongoDB

## How to Run the Project
1. Download the project.
2. Install dependencies using:
   ```sh
   npm install
   ```
3. Start the local server:
   ```sh
   npm start
   ```
4. Open a browser and navigate to `http://localhost:3000`.

## Contribution
If you would like to contribute to the project, please open a Pull Request with a clear description of the proposed changes.

## License
This project is open-source and available under the MIT License.

