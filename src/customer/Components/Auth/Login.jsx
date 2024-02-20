import * as React from "react";
import { Grid, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../Redux/Auth/Action";
import { useState } from "react";
import { API_BASE_URL } from "../../../config/api";

export default function LoginUserForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const { auth } = useSelector((store) => store);
  const handleCloseSnackbar = () => setOpenSnackBar(false);
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/forgotPassword`, {
        method: 'POST',
        body: JSON.stringify({ userEmail: email }),
      });
      if (response.ok) {
        setOpenSnackBar(true); // Open success Snackbar
      } else {
        throw new Error('Failed to send reset password email');
      }
    } catch (error) {
      console.error('Error sending reset password email:', error.message);
      // Handle error and display error message to the user
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    dispatch(login(userData));
  };

  return (
    <React.Fragment>
      <form className="w-full" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="given-name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{ padding: ".8rem 0" }}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center flex-col items-center">
        <div className="py-3 flex items-center">
          <Button onClick={handleForgotPassword} size="small">
            Forgot Password
          </Button>
          <p className="m-0 p-0 ml-2">Forgot your password?</p>
        </div>
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Reset password instructions sent to your email.
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
