import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Typography, Button, Avatar, Box, Chip } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp'; // Importing the thumbs-up icon
import { Link } from 'react-router-dom';

const ChallengeCard = ({
  title,
  date,
  avatarUrl,
  imageUrl,
  description,
  complexity,
  buttonGroup,
  readMoreLink,
  likesCount
}) => {
  return (
    <Card 
      sx={{ 
        mt: 6,
        width: '100%',
        boxShadow: 3,
        border: '1px solid',
        borderColor: 'primary.main',
        bgcolor: 'background.paper',
        '&:hover': {
          boxShadow: 6,
        }
      }}
    >
      <CardHeader
        avatar={<Avatar src={avatarUrl || '/static/images/avatar/defaultAvatar.jpg'} />}
        title={title}
        subheader={date}
      />
      {imageUrl && (
        <CardMedia
          component="img"
          height="194"
          image={imageUrl}
          alt={`${title} image`}
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
        <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
          <Chip
            icon={<ThumbUpIcon />}
            label={likesCount || 0}
            size="small"
            variant="outlined"
          />
        </Box>
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: 'start', flexWrap: 'wrap' }}>
        {buttonGroup && buttonGroup.length > 0 && (
          buttonGroup.map((buttonLabel, index) => (
            <Link key={index} to={`/feed/tags/${buttonLabel}`} style={{ textDecoration: 'none', marginRight: '8px' }}>
              <Chip label={buttonLabel} variant="outlined" color="primary" />
            </Link>
          ))
        )}
      </CardActions>
      <CardActions disableSpacing>
        <Box width="100%" textAlign="center">
          <Button size="small" variant="contained" component={Link} to={readMoreLink}>Read More</Button>
        </Box>
      </CardActions>
    </Card>
  );
}

ChallengeCard.defaultProps = {
  avatarUrl: '/static/images/avatar/defaultAvatar.jpg',
};

export default ChallengeCard;
