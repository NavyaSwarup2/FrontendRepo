import * as React from "react";
import { Grid, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../../Redux/Auth/Action";
import { Fragment, useEffect, useState } from "react";

export default function RegisterUserForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const { auth } = useSelector((store) => store);
  const handleClose = () => setOpenSnackBar(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const { firstName, lastName, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if email and password are valid
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!isValidPassword(password)) {
      alert("Password must be at least 7 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }
    // Check if email is unique
    const isEmailUnique = await checkEmailUnique(email);
    if (!isEmailUnique) {
      alert("Email already exists. Please use a different email address.");
      return;
    }
    // Check if password is unique
    const isPasswordUnique = await checkPasswordUnique(password);
    if (!isPasswordUnique) {
      alert("Password already exists. Please use a different password.");
      return;
    }
    // If all validations pass, proceed with registration
    dispatch(register(formData));
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidPassword = (password) => {
    return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{7,}$/.test(password);
  };

  const checkEmailUnique = async (email) => {
    // Make an API call to check if the email is unique
    // You will need to implement this function based on your backend logic
    // Return true if email is unique, false otherwise
    return true;
  };

  const checkPasswordUnique = async (password) => {
    // Make an API call to check if the password is unique
    // You will need to implement this function based on your backend logic
    // Return true if password is unique, false otherwise
    return true;
  };

  useEffect(() => {
    if (auth.user || auth.error) setOpenSnackBar(true);
  }, [auth.user, auth.error]);

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
              value={firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="given-name"
              value={lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="given-name"
              value={email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="given-name"
              type="password"
              value={password}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{padding:".8rem 0"}}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center ">
          <p className="m-0 p-0">if you have already account ?</p>
          <Button onClick={() => navigate("/login")} className="ml-5" size="small">
            Login
          </Button>
        </div>
      </div>

      <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {auth.error ? auth.error : auth.user ? "Register Success" : ""}
        </Alert>
      </Snackbar>
     
    </div>
  );
}
