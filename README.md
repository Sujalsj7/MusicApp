# MusicApp

A micro-frontend based Music Library application with role-based authentication.

---

## Overview

- **Main App:** Acts as the container for the Music Library micro frontend.
- **Music Library (Micro Frontend):** Separate app loaded dynamically via Module Federation.
- **Roles:**
  - **Admin:** Can view, add, and delete songs.
  - **User:** Can only view and filter songs.
- Built with React, Material-UI, and Vite-compatible Module Federation.

---

## How to Run Locally

1. **Clone the repository**

git clone https://github.com/Sujalsj7/MusicApp.git

### Music Library (micro frontend)
2. Navigate to the `music-mf` folder:

```bash
cd music-mf
npm install
npm run dev:remote
```



### Main App
3. Navigate to the main app folder:

```bash
cd main-app
npm install
npm run dev
```



### Demo Credentials
Use the following credentials to test role-based access:

| Role  | Username   | Password |
|-------|-----------|----------|
| Admin | admin     | 123      |
| User  | Sujal     | abc      |
| User  | TestUser  | xyz      |





### Micro Frontend & Role-based Auth

**Micro Frontend Architecture**

The app is split into two parts:

- **Main App**: Container application that hosts the micro frontend.  
- **Music Library**: Exposed as a module using Module Federation.

**Integration**

- The main app imports the Music Library dynamically via `React.lazy()` and `Suspense`.  
- The main app does not need the internal code of Music Library—only the exposed module.

**Role-based Authentication**

- Uses in-memory JWT-like tokens (no backend required).

**Roles & Permissions**

- **Admin**:  
  - Can add new songs via modal.  
  - Can delete songs.

- **User**:  
  - Can only view and filter songs.

- UI elements dynamically show or hide based on the user role.
