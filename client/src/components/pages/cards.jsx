import * as React from 'react';
//import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
//import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import { Link } from '@mui/material';
// import { fontFamily, fontWeight } from '@mui/system';
// import Container from '@mui/material/Container';
//import { createTheme, ThemeProvider } from '@mui/material/styles';
import shareImg from '../Images/share.svg'

export function CardDesign() {
  const prices={
     productName:"Samsung ZFlip4",
     current : 4000,
     actual :10000
  }
    return(
        <>
             <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column',position:'relative' }}>
             <img style={{right:2,top:2,position:'absolute' , cursor:'pointer'}} src={shareImg} alt="productLinkofOurApp" width="20" height="20" position="absolute" ></img>
             
                  <CardMedia
                    component="img"
                    sx={{
                      //pt: '56.25%',// 16:9
                      px:'10%',
                      position:'relative'
                    }}
                    image="https://m.media-amazon.com/images/I/41uBE7W6wcL._SX300_SY300_QL70_FMwebp_.jpg"
                  />
                  <CardContent sx={{ flexGrow: 1,display:'flex', flexDirection:'column' } }>
                    <Typography gutterBottom variant="h6" component="h2">
                      {prices.productName}
                    </Typography>
                    <Typography variant='h8' color='red'>
                        Rs.{prices.current}
                    </Typography>
                    <Typography variant='overline'>
                      <s>Rs.{prices.actual}</s>  ({((prices.actual-prices.current)/prices.actual)*100}% off)
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent:'space-between'}}>
                    <Button size="small" sx={{backgroundColor:'yellow'}}>Buy Now</Button>
                    <Button size="small">Delete</Button>
                  </CardActions>
            </Card>
        </>
    );
}