import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, CircularProgress, CssBaseline, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomAlert from './CustomAlert';

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    // Check if passwords match
    if (password !== cpassword) {
      setAlert({ message: "Passwords do not match", type: "error" });
      return;
    }

    setAlert({ message: "Processing your signup...", type: "info" });
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();
      if (response.ok) {
        localStorage.setItem('token', json.token);
        setAlert({ message: "Signup Successful", type: "success" });
        setTimeout(() => {
          setAlert(null);
          navigate('/');
        }, 3000);
      } else {
        setAlert({ message: json.error || "Signup failed", type: "error" });
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

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CssBaseline />
      <Paper elevation={6} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 400, background: 'linear-gradient(135deg, #E0F9F4, #FFF9E6)' }}>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Signup
        </Typography>
        {alert && (
          <CustomAlert 
            open={Boolean(alert)}
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={credentials.name}
            onChange={onChange}
            autoFocus
            sx={{
              borderRadius: '8px',
              '& .MuiInputBase-input': {
                padding: '12px 14px',
              },
              '& .MuiFormLabel-root': {
                color: '#666',
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: '#6D83F2',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ddd',
                },
                '&:hover fieldset': {
                  borderColor: '#6D83F2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6D83F2',
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            value={credentials.email}
            onChange={onChange}
            sx={{
              borderRadius: '8px',
              '& .MuiInputBase-input': {
                padding: '12px 14px',
              },
              '& .MuiFormLabel-root': {
                color: '#666',
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: '#6D83F2',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ddd',
                },
                '&:hover fieldset': {
                  borderColor: '#6D83F2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6D83F2',
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={onChange}
            sx={{
              borderRadius: '8px',
              '& .MuiInputBase-input': {
                padding: '12px 14px',
              },
              '& .MuiFormLabel-root': {
                color: '#666',
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: '#6D83F2',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ddd',
                },
                '&:hover fieldset': {
                  borderColor: '#6D83F2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6D83F2',
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="cpassword"
            label="Confirm Password"
            name="cpassword"
            type="password"
            value={credentials.cpassword}
            onChange={onChange}
            sx={{
              borderRadius: '8px',
              '& .MuiInputBase-input': {
                padding: '12px 14px',
              },
              '& .MuiFormLabel-root': {
                color: '#666',
              },
              '& .MuiFormLabel-root.Mui-focused': {
                color: '#6D83F2',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ddd',
                },
                '&:hover fieldset': {
                  borderColor: '#6D83F2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6D83F2',
                },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;
