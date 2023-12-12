import React, { useState } from 'react';
import AppBar_material from '../Components/AppBar_Material/AppBar';
import TemporaryDrawer from '../Components/sidebar_material/sidebar';
import ChallengeCard from '../Components/Challenges_Post/ChallengeCard';
import styles from './ChallengePage.module.css'; // Import the CSS module
import Challenge from '../Components/Challenge/Challenge'

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
<Challenge/>

        </div>
      </div>
    </div>
  );
};

export default ChallengePage;
