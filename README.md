# EventShuffle Frontend

This frontend is built with React and TypeScript, offering a responsive and user-friendly interface for event management.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Design Practices](#design-practices)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Key Components](#key-components)
- [Routing and State Management](#routing-and-state-management)
- [Styling](#styling)
- [Future Improvements](#future-improvements)

---

## Project Overview

EventShuffle enables users to create and participate in events, vote on dates, and manage their schedules efficiently. The frontend communicates with the backend API to handle user authentication, event management, and voting functionalities.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A strongly typed programming language that builds on JavaScript.
- **React Router**: For handling navigation within the app.
- **React Toastify**: For providing notifications and alerts.
- **CSS Modules**: For styling components.

## Design Practices

- **Component-Based Architecture**: The frontend is built using reusable and independent components, making the codebase maintainable and scalable.
- **TypeScript**: Using TypeScript helps in catching errors early and improving the overall developer experience with better tooling and type safety.
- **Responsive Design**: The UI is designed to be responsive, ensuring a good user experience across devices.

## Project Structure

```
frontend/
│
├── src/
│ ├── components/ # React components
│ ├── pages/ # Page components
│ ├── hooks/ # Custom hooks
│ ├── services/ # API services
│ ├── styles/ # CSS Modules
│ ├── App.tsx # Main App component
│ └── index.tsx # Entry point
│
├── public/ # Public assets
├── package.json # Dependencies and scripts
└── README.md # Frontend README
```

## Setup and Installation

### Installing Dependencies

To install the required dependencies, navigate to the root folder and run the below command.

```
npm install
```

Once the overall implementation is done, and to start the application run the below command.

```
npm run start
```

## Key Components

- AuthComponent.tsx: Manages authentication logic, including login, logout, and registration.
- EventList.tsx: Displays a list of events.
- EventDetail.tsx: Shows detailed information about a specific event, allowing users to vote on dates.
- Login.tsx and Register.tsx: Handle user authentication and registration.

## Routing and State Management

- React Router is used to manage navigation within the app.
- Routes are defined in App.tsx.
- State Management is handled using React's built-in hooks (useState, useContext, etc.).

## Styling

CSS Modules are used for styling components to ensure that styles are scoped locally.
