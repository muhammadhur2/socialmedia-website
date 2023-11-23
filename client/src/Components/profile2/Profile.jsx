// PersonalProfile.js

import React from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import styles from './Profile.module.css'; // Make sure this path is correct

export default function PersonalProfile() {
  return (
    <section className={styles.vh100} style={{ backgroundColor: '#f4f5f7' }}>
      <Container className={`${styles.py5} ${styles.h100}`}>
        <Grid container justifyContent="center" alignItems="center" className={styles.h100}>
          <Grid item lg={6} className={styles.mb4}>
            <Card className={styles.mb3} sx={{ borderRadius: '10px' }}>
              <Grid container>
                <Grid item md={4} className={`${styles.textCenter} ${styles.textWhite} ${styles.gradientcustom}`}
                      sx={{ borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }}>
                  <CardMedia
                    component="img"
                    image="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className={styles.my5}
                    sx={{ width: '80px' }}
                  />
                  <Typography variant="h5">Marie Horwitz</Typography>
                  <Typography>Web Designer</Typography>
                  <IconButton color="default" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </Grid>
                <Grid item md={8}>
                  <CardContent>
                    <Typography variant="h6">Information</Typography>
                    <hr className="mt-0 mb-4" />
                    <Grid container pt={1}>
                      <Grid item xs={6} className={styles.mb3}>
                        <Typography variant="h6">Email</Typography>
                        <Typography className={styles.textMuted}>info@example.com</Typography>
                      </Grid>
                      <Grid item xs={6} className={styles.mb3}>
                        <Typography variant="h6">Phone</Typography>
                        <Typography className={styles.textMuted}>123 456 789</Typography>
                      </Grid>
                    </Grid>

                    <Box className="d-flex justify-content-start">
                      <IconButton aria-label="facebook" color="primary">
                        <FacebookIcon fontSize="large" />
                      </IconButton>
                      <IconButton aria-label="twitter" color="primary">
                        <TwitterIcon fontSize="large" />
                      </IconButton>
                      <IconButton aria-label="instagram" color="primary">
                        <InstagramIcon fontSize="large" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
