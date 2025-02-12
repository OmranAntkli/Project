import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function HomePage() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      {/* عنوان الترحيب */}
      <Typography variant="h3" gutterBottom>
        Welcome to Issue Management
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" paragraph>
        A platform that helps you register and manage issues easily. You can add
        a new issue or browse existing ones.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* كارد إضافة مشكلة */}
        <Grid item xs={12} sm={6}>
          <Box
            onClick={() => navigate("/addProblem")}
            sx={{
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <Card
              sx={{
                textAlign: "center",
                p: 2,
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardContent>
                <AddCircleOutlineIcon
                  sx={{ fontSize: 50, color: "primary.main" }}
                />
                <Typography variant="h5" component="div">
                  Add New Issue
                </Typography>
                <Typography color="textSecondary">
                  Easily add and manage a new issue.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
        {/* كارد عرض المشاكل */}

        <Grid item xs={12} sm={6}>
          <Box
            onClick={() => navigate("/listIssuePage")}
            sx={{
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <Card
              sx={{
                textAlign: "center",
                p: 2,
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardContent>
                <LayersIcon sx={{ fontSize: 50, color: "primary.main" }} />
                <Typography variant="h5" component="div">
                  View Issues
                </Typography>
                <Typography color="textSecondary">
                  Browse and manage all reported issues.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
export default HomePage;
