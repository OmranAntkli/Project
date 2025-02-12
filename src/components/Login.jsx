import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  Typography,
  Box,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import InputAdornment from "@mui/material/InputAdornment";

import "../App.css";
import { LockOutlined, MailOutline } from "@mui/icons-material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setTimeout(async () => {
      try {
        const data = await loginUser(email, password);
        if (data) {
          console.log("Login successful", data);
          localStorage.setItem("authToken", data.jwt);
          navigate("/*");
        }
      } catch (err) {
        setError(err.message || "Login failed");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <Box
      className="bg-shapes"
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(-45deg, #87ceeb, #00203f, #8ca2cf, #4b0082)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 10s ease infinite",
        backgroundAttachment: "fixed",
        overflow: "hidden",
      }}
    >
      <Box className="shape circle"></Box>
      <Box className="shape triangle"></Box>
      <Box className="shape square"></Box>
      <Box className="shape hexagon"></Box>
      <Box className="shape circle"></Box>
      <Box className="shape triangle"></Box>
      <Box className="shape square"></Box>
      <Box className="shape hexagon"></Box>

      <Paper
        elevation={10}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          color: "#fff",
          boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          Sign In
        </Typography>
        <TextField
          placeholder="nouraldeenmahmo@gmail.com"
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 2,
            "& .MuiInputBase-input": { color: "#00203f" },
          }}
          InputLabelProps={{ style: { color: "#00203f" } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <MailOutline sx={{ color: "#00203f90" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          placeholder="********"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderRadius: 2,
            "& .MuiInputBase-input": { color: "#00203f" },
          }}
          InputLabelProps={{ style: { color: "#00203f" } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <LockOutlined sx={{ color: "#00203f90" }} />
              </InputAdornment>
            ),
          }}
        />
        <Box display="flex" alignItems="center" width="100%">
          <Checkbox sx={{ color: "#fff" }} />
          <Typography variant="body2">Remember me</Typography>
        </Box>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            background:
              "linear-gradient(-45deg,  #87ceeb, #00203f, #8ca2cf, #4b0082)",
            backgroundSize: "400% 400%",
            animation: "gradientMove 15s ease infinite",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: 2,
            "&:hover": {
              filter: "brightness(1.2)",
            },
          }}
          onClick={handleLogin}
        >
          {loading ? (
            <CircularProgress size={24} style={{ color: "white" }} />
          ) : (
            "Sign In"
          )}
        </Button>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            textAlign: "center",
            cursor: "pointer",
            textDecoration: "underline",
            color: "#fff",
          }}
        >
          Forgot your password?
        </Typography>
        <Divider
          sx={{
            width: "100%",
            my: 2,
            fontSize: "0.9rem",
            color: "#fff",
          }}
        >
          OR
        </Divider>
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          fullWidth
          sx={{
            mb: 1,
            textTransform: "none",
            fontSize: "0.875rem",
            borderColor: "#fff",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#283048",
            },
            "& .MuiButton-startIcon": {
              marginRight: "8px", // المسافة بين الأيقونة والنص
            },
          }}
        >
          Sign in with Google
        </Button>
        <Button
          variant="outlined"
          startIcon={<FacebookIcon />}
          fullWidth
          sx={{
            textTransform: "none",
            fontSize: "0.875rem",
            borderColor: "#fff",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#fff",
              color: "#1e3c72",
            },
          }}
        >
          Sign in with Facebook
        </Button>
        <Typography
          variant="body2"
          sx={{ mt: 2, color: "#fff" }}
          onClick={() => navigate("/signup")}
        >
          Dont have an account?
          <span
            style={{ color: "#1e3c72", cursor: "pointer", fontWeight: "bold" }}
          >
            {" "}
            Sign up
          </span>
        </Typography>
        {error && (
          <Typography
            variant="h8"
            fontWeight="12px"
            gutterBottom
            sx={{
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
              padding: "5px 20px",
              margin: "10px",
              color: "red",
              borderRadius: "4px",
            }}
          >
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default Login;
