import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Button, Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link

const ChallengeCard = ({
  title,
  date,
  avatarUrl,
  imageUrl,
  description,
  complexity,
  buttonGroup,
  readMoreLink
}) => {
  return (
    <Card 
      sx={{ 
        mt: 6,
        width: '24rem', // Adjusted width to equivalent 96
        boxShadow: 3, // Adds a stronger shadow to make the card "pop"
        border: '1px solid', // Adds a border
        borderColor: 'primary.main', // Use the theme's primary color for the border
        bgcolor: 'background.paper', // A slight off-white color that stands out against a white background
        '&:hover': {
          boxShadow: 6, // Increases the shadow strength on hover for a "lifting" effect
        }
      }}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={avatarUrl || '/static/images/avatar/defaultAvatar.jpg'} />
        }
        title={title}
        subheader={date}
      />
      {imageUrl && (
        <CardMedia
          component="img"
          height="194"
          image={imageUrl}
          alt="Card Image"
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        {complexity && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Complexity: {complexity}
          </Typography>
        )}
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'start', flexWrap: 'wrap' }}>
  {buttonGroup && buttonGroup.length > 0 && (
    buttonGroup.map((buttonLabel, index) => (
      <Link 
        key={index} 
        to={`/feed/tags/${buttonLabel}`} // Use template literals to insert the button label
        style={{ textDecoration: 'none' }} // Optional: to remove the underline of links
      >
        <Button size="small" variant="outlined" sx={{ m: 0.5 }}>
          {buttonLabel}
        </Button>
      </Link>
    ))
  )}
</CardActions>
      <CardActions disableSpacing>
        <Box width="100%" textAlign="center"> {/* Centering Read More button */}
          <Button size="small" variant="contained" onClick={() => window.location.href = readMoreLink}>Read More</Button>
        </Box>
      </CardActions>
    </Card>
  );
}

ChallengeCard.defaultProps = {
  avatarUrl: '/static/images/avatar/defaultAvatar.jpg', // Default avatar image path
};

export default ChallengeCard;
