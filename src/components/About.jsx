import React from 'react';
import { Container, Typography, Button, Divider, Grow, List, ListItem, ListItemText, Box, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { Fade } from '@mui/material';

// Use the theme hook
const useStyles = () => {
  const theme = useTheme();
  return {
    section: {
      padding: theme.spacing(4),
      borderRadius: theme.shape.borderRadius,
      marginBottom: theme.spacing(4),
      color: theme.palette.text.primary,
      background: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
      boxShadow: theme.shadows[2],
    },
    title: {
      color: theme.palette.primary.dark,
    },
    highlightText: {
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
  };
};

const About = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Box style={classes.section}>
        <Grow in={true} timeout={1000}>
          <div>
            <Fade in={true} timeout={1500}>
              <Typography variant="h2" component="h1" gutterBottom align="center" style={classes.title}>
                About iNoteBook
              </Typography>
            </Fade>
            <Fade in={true} timeout={2000}>
              <Typography variant="h5" component="p" gutterBottom align="center">
                iNoteBook is your personal digital notebook, designed to help you keep track of your notes efficiently and effectively.
              </Typography>
            </Fade>
          </div>
        </Grow>
      </Box>

      <Box style={classes.section}>
        <Grow in={true} timeout={1000}>
          <div>
            <Fade in={true} timeout={1500}>
              <Typography variant="h6" component="p" gutterBottom align="center">
                With iNoteBook, you can:
              </Typography>
            </Fade>
            <Fade in={true} timeout={2000}>
              <List>
                <ListItem>
                  <ListItemText primary={<span style={classes.highlightText}>Add, update, and delete notes with ease</span>} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<span style={classes.highlightText}>Access your notes from anywhere</span>} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={<span style={classes.highlightText}>Keep your notes organized with tags</span>} />
                </ListItem>
              </List>
            </Fade>
            <Box style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button variant="contained" color="primary" size="large" href="https://www.linkedin.com/in/huzaifakhan123">
                Learn more
              </Button>
            </Box>
          </div>
        </Grow>
      </Box>
    </Container>
  );
};

export default About;
