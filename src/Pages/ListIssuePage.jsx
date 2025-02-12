import { useState, useEffect } from "react";
import { fetchIssues, deleteIssue, updateIssue } from "../services/api";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  useTheme,
  TextField,
  Button,
  Box,
  Fab,
  Snackbar,
  Alert
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  AddCircle as AddIcon,
  RemoveCircle as RemoveIcon,
  FileDownload as ExportIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function ListIssuePage() {
  const navigate = useNavigate();
  const theme = useTheme(); 
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [layout, setLayout] = useState("Layout1");
  const [editingIssue, setEditingIssue] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadIssues = async () => {
      try {
        const response = await fetchIssues();
        if (response && response.data) {
          setIssues(response.data);
        } else {
          throw new Error("Error fetching issues");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadIssues();
  }, []);

  const handleDelete = async (documentId) => {
    if (window.confirm("Are you sure you want to delete this issue?")) {
      try {
        setIssues((prevIssues) =>
          prevIssues.filter((issue) => issue.documentId !== documentId)
        );
        await deleteIssue(documentId);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingIssue({ ...editingIssue, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (issue) => {
    setEditingIssue(issue);
  };

  const handleSaveEdit = async () => {
    if (!editingIssue.title || !editingIssue.description || !editingIssue.issueStatus) {
      setError("Please fill all fields before saving.");
      return;
    }

    try {
      const updatedData = {
        title: editingIssue.title,
        description: editingIssue.description,
        issueStatus: editingIssue.issueStatus,
        imageUrl: editingIssue.imageUrl || "",
        counter: editingIssue.counter || 0,
      };

      await updateIssue(editingIssue.documentId, updatedData);

      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue.documentId === editingIssue.documentId ? { ...issue, ...updatedData } : issue
        )
      );

      setEditingIssue(null);
      setError(null);
      setSuccessMessage("Issue updated successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleIncrementCounter = async (documentId) => {
    const updatedIssue = issues.find(
      (issue) => issue.documentId === documentId
    );
    if (updatedIssue) {
      await handleUpdateIssue(documentId, {
        counter: updatedIssue.counter + 1,
      });
    }
  };

  const handleDecrementCounter = async (documentId) => {
    const updatedIssue = issues.find(
      (issue) => issue.documentId === documentId
    );
    if (updatedIssue && updatedIssue.counter > 0) {
      await handleUpdateIssue(documentId, {
        counter: updatedIssue.counter - 1,
      });
    }
  };

  const handleUpdateIssue = async (documentId, updatedData) => {
    try {
      await updateIssue(documentId, updatedData);
      setIssues((prevIssues) =>
        prevIssues.map((issue) =>
          issue.documentId === documentId ? { ...issue, ...updatedData } : issue
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleExportCSV = () => {
    const csvContent = [
      ["Title", "Description", "Status", "Counter", "Created At", "Username"],
      ...issues.map(issue => [
        issue.title,
        issue.description,
        issue.issueStatus,
        issue.counter,
        new Date(issue.createdAt).toLocaleString(),
        issue.username
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "issues_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredIssues = issues.filter((issue) =>
    filter === "All" ? true : issue.issueStatus === filter
  );

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          my: 3,
          textAlign: "center",
          fontWeight: "bold",
          color: theme.palette.primary.main,
        }}
      >
        Issues List
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
              <MenuItem value="In-progress">In Progress</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Layout</InputLabel>
            <Select
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
              label="Layout"
            >
              <MenuItem value="Layout1">Layout 1</MenuItem>
              <MenuItem value="Layout2">Layout 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Grid item>
          <Button variant="outlined" startIcon={<ExportIcon />} onClick={handleExportCSV}>
            Export CSV
          </Button>
        </Grid>
        <Grid item>
          <Fab color="primary" aria-label="add" onClick={() => navigate("/addProblem")}> 
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>

      {loading ? (
        <Typography align="center">Loading...</Typography>
      ) : (
        <Grid
          container
          spacing={layout === "Layout2" ? 0 : 3}
          sx={{
            flexDirection: layout === "Layout2" ? "column" : "row",
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {filteredIssues.map((issue) => (
            <Grid
              item
              xs={12}
              sm={layout === "Layout2" ? 12 : 6}
              md={layout === "Layout2" ? 12 : 4}
              key={issue.documentId}
            >
              <Card
                sx={{
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)", boxShadow: 8 },
                  borderRadius: "15px",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "#333"
                      : layout === "Layout1"
                      ? "#ffffff"
                      : "#e3f2fd",
                  color: theme.palette.mode === "dark" ? "#fff" : "#000",
                  border: layout === "Layout2" ? "2px solid #007BFF" : "none",
                  width: "100%",
                }}
              >
                {issue.imageUrl && (
                  <CardMedia
                    component="img"
                    height={layout === "Layout2" ? "120" : "180"}
                    image={issue.imageUrl}
                    alt="Issue"
                    sx={{
                      objectFit: "contain",
                      maxHeight: layout === "Layout2" ? "120px" : "180px",
                      width: "100%",
                    }}
                  />
                )}
                <CardContent>
                  {editingIssue && editingIssue.documentId === issue.documentId ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <TextField
                        fullWidth
                        label="Title"
                        value={editingIssue.title}
                        onChange={(e) => setEditingIssue({ ...editingIssue, title: e.target.value })}
                      />
                      <TextField
                        fullWidth
                        label="Description"
                        multiline
                        rows={4}
                        value={editingIssue.description}
                        onChange={(e) => setEditingIssue({ ...editingIssue, description: e.target.value })}
                      />
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={editingIssue.issueStatus}
                          onChange={(e) => setEditingIssue({ ...editingIssue, issueStatus: e.target.value })}
                          label="Status"
                        >
                          <MenuItem value="Open">Open</MenuItem>
                          <MenuItem value="Closed">Closed</MenuItem>
                          <MenuItem value="In-progress">In Progress</MenuItem>
                        </Select>
                      </FormControl>
                      <Button
                        variant="contained"
                        component="label"
                      >
                        Upload Image
                        <input
                          type="file"
                          hidden
                          onChange={handleImageUpload}
                        />
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveEdit}
                      >
                        Save Changes
                      </Button>
                    </Box>
                  ) : (
                    <>
                      <Typography variant="h6">{issue.title}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {issue.issueStatus}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {new Date(issue.createdAt).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {issue.username}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Counter: {issue.counter}
                      </Typography>
                    </>
                  )}
                  <Grid container spacing={1} sx={{ mt: 2 }}>
                    <Grid item>
                      <IconButton color="error" onClick={() => handleDelete(issue.documentId)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton color="success" onClick={() => handleIncrementCounter(issue.documentId)}>
                        <AddIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton color="warning" onClick={() => handleDecrementCounter(issue.documentId)}>
                        <RemoveIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton color="primary" onClick={() => handleEdit(issue)}>
                        <EditIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar open={!!successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage("")}> 
        <Alert onClose={() => setSuccessMessage("")} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ListIssuePage;
