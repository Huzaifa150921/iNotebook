import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, CircularProgress, CssBaseline, Paper, Fade, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import CustomAlert from './CustomAlert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlert({ message: "Processing your login...", type: "info" });
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('token', result.token);
        setAlert({ message: "Login Successful", type: "success" });
        setTimeout(() => {
          setAlert(null);
          navigate('/');
        }, 3000);
      } else {
        setAlert({ message: "Invalid Email or Password", type: "error" });
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    } catch (error) {
      setAlert({ message: "An Error Occurred. Please try again", type: "error" });
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CssBaseline />
      <Paper elevation={6} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 400,  background: 'linear-gradient(135deg, #E0F9F4, #FFF9E6)' }}>
        <Typography component="h1" variant="h5">Login</Typography>
        <Fade in={Boolean(alert)} timeout={500}>
          <div>
            {alert && (
              <CustomAlert 
                open={Boolean(alert)}
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert(null)}
              />
            )}
          </div>
        </Fade>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" align="center">
              Don't have an account? <Link component={RouterLink} to="/signup">Sign up</Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
