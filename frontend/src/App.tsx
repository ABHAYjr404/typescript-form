import React, { useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import axios from "axios";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/submit", formData);
      alert("Form submitted successfully!");
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
      alert("Error submitting form");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Address Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(formData).map((key) => (
            <Grid item xs={12} key={key}>
              <TextField
                fullWidth
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                name={key}
                value={formData[key as keyof typeof formData]}
                onChange={handleChange}
                required
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default App;
