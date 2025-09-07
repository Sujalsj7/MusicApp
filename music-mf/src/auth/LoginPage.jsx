// LoginPage.jsx
import React, { useState } from "react";
import { useAuth } from "./useAuth";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mockUsers = [
    { username: "admin", password: "123", role: "admin" },
    { username: "Sujal", password: "abc", role: "user" },
    { username: "TestUser", password: "xyz", role: "user" },
  ];

  const handleLogin = () => {
    setError("");

    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    const foundUser = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      login(foundUser.username, foundUser.role); 
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        width: "100vw",
      }}
    >
      <Paper sx={{ p: 4, width: 300, textAlign: "center" }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Login
        </Typography>

        <TextField
          label="Username"
          fullWidth
          sx={{ mb: 2 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          fullWidth
          type="password"
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
       
        />

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          disabled={!username || !password}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
