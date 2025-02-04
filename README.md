# Project README

## Project Overview

This project is a simple **Users & Posts Dashboard** built with **Next.js**, featuring:

- User and post fetching using Zustand for state management.
- User detail page with associated posts.
- Elegant UI using **shadcn/ui** components.
- Global styles managed with **Tailwind CSS**.

## Features

- Display user and post information.
- Navigate to user detail pages with individual user data and associated posts.
- Persistent state management using Zustand.
- Fetch and store data in session storage for faster subsequent loads.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js v14+**
- **Git**

---

## Installation Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Suraj9505/user-dashboard.git
   cd <project-directory>
   ```

2. **Install Dependencies**

   ```bash
   npm install
   OR
   npm install --legacy-peer-deps
   ```

3. **Run the Development Server**

   ```bash
   npm run dev
   ```

4. **Open the App**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
├── components
├── pages
│   ├── index.js (Home Page)
│   └── user/[id].js (User Detail Page)
├── public
├── store
│   └── useUserStore.js (Zustand store)
├── styles
└── package.json
```

---

## Important Libraries Used

### 1. **Next.js**

- A React framework for production-grade web applications.
- Used for server-side rendering and routing.

### 2. **Zustand**

- Lightweight state management solution.
- Used to manage user and post data with persistent storage in session storage.

### 3. **Axios**

- Simplifies HTTP requests for fetching data from external APIs.

### 4. **shadcn/ui**

- Modern UI components built on top of Radix Primitives.

### 5. **Tailwind CSS**

- Utility-first CSS framework.
- Provides responsive and highly customizable design.

### 6. **React Hot Toast**

- For providing user feedback with non-intrusive toast notifications.

---

## Features Walkthrough

1. **Home Page**

   - Displays user and post cards.
   - Click on user cards to navigate to individual user detail pages.

2. **User Detail Page**
   - Displays user information at the top.
   - Shows the user's posts below.

---

## Customization Instructions

### Adding a New Feature or State Property

1. Define the state property in `useUserStore.js`.
2. Fetch or update data and update the relevant view components.

### Styling Components

Modify the Tailwind CSS classes or use additional components from `shadcn/ui`.

---

## Running Production Build

```bash
npm run build
npm start
```

---

## Conclusion

This project demonstrates efficient state management, elegant UI design, and seamless navigation using modern web technologies. Customize and extend it further based on your requirements!
