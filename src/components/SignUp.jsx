import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../services/api";
import {
  TextField,
  Button,
  Checkbox,
  Typography,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { LockOutlined, MailOutline } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "../App.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setTimeout(async () => {
      try {
        const data = await signUpUser(username, email, password);
        if (data) {
          console.log("Sign up successful", data);
          localStorage.setItem("authToken", data.jwt);
          navigate("/*");
        }
      } catch (err) {
        setError(err.message || "Sign up failed");
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
          Create a new account
        </Typography>
        <TextField
          type="text"
          placeholder="Nour Aldeen"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="User Name"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: 2,
            "& .MuiInputBase-input": { color: "#00203f" },
          }}
          InputLabelProps={{ style: { color: "#00203f" } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <AccountCircle sx={{ color: "#00203f90" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          placeholder="nouraldeenmahmo@gmail.com"
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
          label="Password"
          type="password"
          placeholder="********"
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
          variant="contained"
          fullWidth
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
          onClick={handleSignUp}
        >
          {loading ? (
            <CircularProgress size={24} style={{ color: "white" }} />
          ) : (
            "Create an account"
          )}
        </Button>

        <Typography
          variant="body2"
          sx={{ mt: 2, color: "#fff" }}
          onClick={() => navigate("/login")}
        >
          You already have an account?
          <span
            style={{
              color: "#1e3c72",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Sign In
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

export default SignUp;
