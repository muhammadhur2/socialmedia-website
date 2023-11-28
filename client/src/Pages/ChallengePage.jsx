import React, { useState } from 'react';
import AppBar_material from '../Components/AppBar_Material/AppBar';
import TemporaryDrawer from '../Components/sidebar_material/sidebar';
import ChallengeCard from '../Components/Challenges_Post/ChallengeCard';
import styles from './ChallengePage.module.css'; // Import the CSS module

const ChallengePage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <div>
      <AppBar_material toggleDrawer={toggleDrawer} />
      <TemporaryDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      {/* Use the CSS module's styles here */}
      <div className={styles.cardContainer}>
        <div className={styles.card}>
        <ChallengeCard
  title="Dynamic Title"
  date="Dynamic Date"
  avatarUrl="https://example.com/path-to-avatar.jpg" // Optional
  
  description="This is a dynamically generated card."
  complexity="Gold" // or "Silver"
  buttonGroup={['Button 1', 'Button 2', 'Button 3']}
  readMoreLink="https://example.com"
/>

        </div>
      </div>
    </div>
  );
};

export default ChallengePage;
