import { useState } from "react";
import { addIssue } from "../services/api";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Paper } from "@mui/material";

function AddProblem() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  const handleAddIssue = async (e) => {
    e.preventDefault();
    const newIssue = {
      title: title.trim(),
      description: description.trim(),
      userId: userId.trim(),
      imageUrl: imageUrl.trim() || null,
      counter: 0,
      issueStatus: "Open",
      username: username.trim(),
    };
    console.log("Sending issue:", newIssue);
    try {
      const response = await addIssue(newIssue);
      console.log("API Response:", response); // Debugging
      if (response && response.data) {
        navigate("/listIssuePage");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to add issue. Check console for details.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Add Problem
        </Typography>
        <form onSubmit={handleAddIssue}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
            multiline
            rows={4}
            margin="normal"
          />
          <TextField
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default AddProblem;
