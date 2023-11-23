import React, { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userService from '../../Services/UserService';
import { isValidEmail, isValidPassword, isValidName } from '../../utils/Validation';
import UserContext from '../../UserContext';
import { useNavigate } from 'react-router-dom';
//import myLocalImage from '../LoginSignup_Material/picture_gpt.png';
import myLocalImage from '../Assets/picture_gpt.png'
//check
const defaultTheme = createTheme();

export default function LoginSignup() {
  const navigate = useNavigate();
  const [action, setAction] = useState("Login");
  const { setUser } = useContext(UserContext);

  const handleLogin = async (email, password) => {
    try {
      const responseData = await userService.login({ email, password });
      if (responseData.status === 'ok') {
        localStorage.setItem('token', responseData.token);
        setUser({
          token: responseData.token
        });
       
        navigate('/profile');
      } else {
        window.alert('Login Failed');
      }
    } catch (error) {
      window.alert('An error occurred during login: ' + error.message);
    }
  };

  const handleSignup = async (name, email, password) => {
    if (!isValidName(name)) {
      window.alert('Name should be at least 2 characters.');
      return;
    }
    if (!isValidEmail(email)) {
      window.alert('Please enter a valid email address.');
      return;
    }
    if (!isValidPassword(password)) {
      window.alert('Password should be at least 6 characters long.');
      return;
    }
    try {
      const response = await userService.register({ name, email, password });
      console.log(response);
      const responseData = response.data;
  
      if (responseData.status === 'ok') {
        
        handleLogin(email,password);
      } else {
        window.alert('Signup Failed');
      }
    } catch (error) {
      window.alert('An error occurred during signup', error);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const name = action === "Signup" ? data.get('name') : "";

    if (action === "Login") {
      handleLogin(email, password);
    } else {
      handleSignup(name, email, password);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
    item
    xs={false}
    sm={4}
    md={7}
    sx={{
      backgroundImage: `url(${myLocalImage})`, // Replace with your image URL
      backgroundRepeat: 'no-repeat',
      backgroundColor: (t) =>
        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {action}
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              {action === "Signup" && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {action === "Login" ? "Sign In" : "Sign Up"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={() => setAction(action === "Login" ? "Signup" : "Login")}>
                    {action === "Login" ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
