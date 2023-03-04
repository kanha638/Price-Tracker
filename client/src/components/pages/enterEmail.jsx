import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
  palette: {
    neutral: {
      main: '#0C0B0B',
      contrastText: '#fff',
    },
  },
});

export default function EnterEmail() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{marginTop: 10,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
          <Avatar sx={{ m: 1, bgcolor: '#0C0B0B' }}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            Email Id
          </Typography>
        
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              bgcolor="#0C0B0B"
              fullWidth
              color='neutral'
              variant="contained"
              sx={{ mt: 3, mb: 2}}
              
            >
              Continue
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Sign in"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
      <Typography paddingTop={4}><Copyright/></Typography>
      
    </ThemeProvider>
  );
}