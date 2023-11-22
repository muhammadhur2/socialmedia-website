import React from 'react';
// import AppBar from '../Components/AppBar/AppBar';  // Adjust the path if needed
import AppBar_material from '../Components/AppBar_Material/AppBar';  // Adjust the path if needed
// import Profile from '../Components/Profile_Material/Profile';  // Adjust the path if needed
// import FriendsPage from '../Components/Friends/Friends';
import Challenge from '../Components/Challenge/Challenge'

const ChallengePage = () => {
  return (
    <div>
      <AppBar_material />  {/* Adding the AppBar here */}
      {/* <FriendsPage /> */}
      <Challenge/>
    </div>
  );
};

export default ChallengePage;
