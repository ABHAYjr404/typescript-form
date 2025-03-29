import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  MenuItem,
  Paper,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";
import axios from "axios";

// Sample data for dropdowns
const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Jaipur",
  "Kolkata",
  "Ahmedabad",
];
const states = [
  "Maharashtra",
  "Karnataka",
  "Telangana",
  "Delhi",
  "Tamil Nadu",
  "Uttar Pradesh",
  "Rajasthan",
  "West Bengal",
  "Gujarat",
  "Kerala",
];
const countries = ["India", "USA"];

// Custom style objects for text fields and dropdowns
const customTextFieldSX = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  backgroundColor: "rgba(255,255,255,0.2)", // Adjust this RGBA for input background opacity
  input: { color: "white" },
};

const customInputLabelProps = { style: { color: "white" } };
const customFormHelperTextProps = { style: { color: "white" } };

const App: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address1: "",
    address2: "",
    pincode: "",
    city: "",
    state: "",
    country: "",
  });

  const [errors, setErrors] = useState({
    contact: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Validate contact number: must be exactly 10 digits (allow empty field)
    if (name === "contact") {
      const isValid = value === "" || /^\d{10}$/.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        contact: isValid ? "" : "Contact number must be 10 digits",
      }));
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check for any validation errors before submitting
    if (errors.contact) {
      setSnackbar({
        open: true,
        message: "Please correct the errors before submitting.",
        severity: "error",
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/submit", formData);
      setSnackbar({
        open: true,
        message: "Form submitted successfully!",
        severity: "success",
      });
      setFormData({
        name: "",
        contact: "",
        address1: "",
        address2: "",
        pincode: "",
        city: "",
        state: "",
        country: "",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Error submitting form",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Transparent AppBar */}
      <AppBar position="static" sx={{ backgroundColor: "rgba(64, 79, 178, 0.7)" }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            PORTAL
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" sx={{ fontSize: "1rem" }}>
            Contact Us
          </Button>
        </Toolbar>
      </AppBar>

      {/* Form Container */}
      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Paper
          elevation={5}
          sx={{
            p: 6,
            borderRadius: 3,
            backgroundColor: "rgba(64, 79, 178, 0.7)", // Adjust container opacity
            color: "white",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ color: "white" }}>
            Personal Details Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              {/* Left Column */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  sx={customTextFieldSX}
                  InputLabelProps={customInputLabelProps}
                  FormHelperTextProps={customFormHelperTextProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  error={!!errors.contact}
                  helperText={errors.contact}
                  required
                  sx={customTextFieldSX}
                  InputLabelProps={customInputLabelProps}
                  FormHelperTextProps={customFormHelperTextProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Flat No. and Building Name"
                  name="address1"
                  value={formData.address1}
                  onChange={handleChange}
                  placeholder="e.g., Flat 101, Sunshine Apartments"
                  required
                  sx={customTextFieldSX}
                  InputLabelProps={customInputLabelProps}
                  FormHelperTextProps={customFormHelperTextProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Street Name and Station Name"
                  name="address2"
                  value={formData.address2}
                  onChange={handleChange}
                  placeholder="e.g., MG Road, Central Station"
                  required
                  sx={customTextFieldSX}
                  InputLabelProps={customInputLabelProps}
                  FormHelperTextProps={customFormHelperTextProps}
                />
              </Grid>
              {/* Right Column */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  sx={customTextFieldSX}
                  InputLabelProps={customInputLabelProps}
                  FormHelperTextProps={customFormHelperTextProps}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  sx={customTextFieldSX}
                  InputLabelProps={customInputLabelProps}
                  FormHelperTextProps={customFormHelperTextProps}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city} sx={{ color: "black" }}>
                      {city}
                    </MenuItem>
                  ))}
                  <MenuItem value="other" sx={{ color: "black" }}>
                    Other
                  </MenuItem>
                </TextField>
                {formData.city === "other" && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter your city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    sx={{ mt: 1, ...customTextFieldSX }}
                    InputLabelProps={customInputLabelProps}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  sx={customTextFieldSX}
                  InputLabelProps={customInputLabelProps}
                  FormHelperTextProps={customFormHelperTextProps}
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state} sx={{ color: "black" }}>
                      {state}
                    </MenuItem>
                  ))}
                  <MenuItem value="other" sx={{ color: "black" }}>
                    Other
                  </MenuItem>
                </TextField>
                {formData.state === "other" && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter your state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    sx={{ mt: 1, ...customTextFieldSX }}
                    InputLabelProps={customInputLabelProps}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  variant="outlined"
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  sx={customTextFieldSX}
                  InputLabelProps={customInputLabelProps}
                  FormHelperTextProps={customFormHelperTextProps}
                >
                  {countries.map((country) => (
                    <MenuItem key={country} value={country} sx={{ color: "black" }}>
                      {country}
                    </MenuItem>
                  ))}
                </TextField>
                {formData.country === "other" && (
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter your country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    sx={{ mt: 1, ...customTextFieldSX }}
                    InputLabelProps={customInputLabelProps}
                  />
                )}
              </Grid>
            </Grid>
            {/* Submit Button */}
            <Grid container justifyContent="center" sx={{ mt: 6 }}>
              <Grid item xs={12} sm={5}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 1, fontSize: "1rem" }} // Increased padding and font size
              >
                Submit
              </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>

      {/* Snackbar for dynamic alerts */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;
