import React, { Suspense } from "react";
import { AuthProvider } from "../../music-mf/src/auth/AuthProvider";
import { useAuth } from "../../music-mf/src/auth/useAuth";
import Login from "../../music-mf/src/auth/LoginPage";
import { CssBaseline } from "@mui/material";
const MusicLibrary = React.lazy(() => import("musicMf/MusicLibrary"));

function Content() {
  const { user, logout } = useAuth(); 

  return user ? (
    <Suspense fallback={<div>Loading Music Library...</div>}>
    
      <MusicLibrary user={user} logout={logout} /> 

    </Suspense>
  ) : (
    <Login />
  );
}

function App() {
  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <Content />
      </AuthProvider>
    </>
  );
}

export default App;
