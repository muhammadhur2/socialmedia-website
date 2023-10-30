const User = require('../models/user.model');
const bcrypt = require('../utils/bcryptHelper.js');
const jwt = require('../utils/jwtHelper');
const { verifyToken } = require('../utils/jwtHelper');

exports.register = async (req, res) => {
    try {
      console.log(req.body);
        if (!req.body.password) {
            return res.json({ status: 'error', error: 'Password is null' });
        }
        const hashedPassword = await bcrypt.hashPassword(req.body.password);
        
        // Debug log to check what is actually being saved
                // Debug log to check what is actually being saved

        console.log('Hashed Password:', hashedPassword);
        
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        res.json({ status: 'ok' });
    } catch (err) {
        console.log(err);
        res.json({ status: 'error', error: 'Error' });
    }
};

exports.login = async (req, res) => {
  try {
      console.log(req.body);

      const user = await User.findOne({ email: req.body.email });
      if (user) {
          const match = await bcrypt.comparePassword(req.body.password, user.password);
          if (match) {
              const token = jwt.generateToken(user);
              return res.json({ status: 'ok', token });
          } else {
              return res.json({ status: 'error', message: 'Incorrect password' });
          }
      } else {
          return res.json({ status: 'error', message: 'User not found' });
      }
  } catch (err) {
      res.json({ status: 'error', message: 'Internal server error' });
  }
};



exports.getProfile = async (req, res) => {
    try {
        // Extract user info from req.user which was attached in verifyToken middleware
        const user = await User.findOne({ email: req.user.email }, { password: 0 }); // Exclude password from query
        if (user) {
            return res.json({ status: 'ok', user });
        } else {
            return res.json({ status: 'error', error: 'User not found' });
        }
    } catch (err) {
        return res.json({ status: 'error', error: 'Error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        console.log("Request Body: ", req.body);  // Debug Line

        const updatedUser = await User.findOneAndUpdate(
            { email: req.user.email },
            { $set: { name: req.body.name, email: req.body.email } },
            { new: true, fields: { password: 0 }, w: "majority" }
        );

        console.log("Updated User: ", updatedUser);  // Debug Line

        if (updatedUser) {
            return res.json({ status: 'ok', user: updatedUser });
        } else {
            return res.json({ status: 'error', error: 'User not found' });
        }
    } catch (err) {
        console.log("Error in Update: ", err);  // Debug Line
        return res.json({ status: 'error', error: 'Update failed' });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
      // Extract user ID from verified JWT token
      const userId = req.user.id;
      console.log('User ID:', userId);  // Debugging line
  
      // Delete user from database
      const deletedUser = await User.findByIdAndDelete(userId);
      
      if (deletedUser) {
        res.status(200).json({ message: 'Account deleted successfully' });
      } else {
        console.log('User not found');  // Debugging line
        res.status(404).json({ error: 'User not found' });
      }
    } catch (err) {
      console.log('Error:', err);  // Debugging line
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

exports.sendFriendRequest = async (req, res) => {
    const friendId = req.body.friendId;
    const userId = req.user.id;
    const user = await User.findById(userId);
    const friend = await User.findById(req.body.friendId);
  
    if (!friend) {
      return res.json({ status: 'error', error: 'Friend not found' });
    }
    
    user.outgoingRequests.push(friendId);
    friend.incomingRequests.push(userId);
    
    await user.save();
    await friend.save();
    
    res.json({ status: 'ok' });
  };
  
  exports.acceptFriendRequest = async (req, res) => {
    const friendId = req.body.friendId;
    const userId = req.user.id;
  
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
  
    if (!friend || !user.incomingRequests.includes(friendId)) {
      return res.json({ status: 'error', error: 'Invalid request' });
    }
  
    user.friends.push(friendId);
    user.incomingRequests.pull(friendId);
    
    friend.friends.push(userId);
    friend.outgoingRequests.pull(userId);
  
    await user.save();
    await friend.save();
  
    res.json({ status: 'ok' });
  };
  
  exports.rejectFriendRequest = async (req, res) => {
    const friendId = req.body.friendId;
    const userId = req.user.id;
    
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);
    
    if (!friend || !user.incomingRequests.includes(friendId)) {
      return res.json({ status: 'error', error: 'Invalid request' });
    }
    
    user.incomingRequests.pull(friendId);
    friend.outgoingRequests.pull(userId);
    
    await user.save();
    await friend.save();
    
    res.json({ status: 'ok' });
  };
  
  exports.listFriends = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).populate('friends', '-password');
      
      res.json({ status: 'ok', friends: user.friends });
    } catch (err) {
      console.log(err);
      res.json({ status: 'error', error: 'Error listing friends' });
    }
  };

  exports.listFriendRequests = async (req, res) => {
    const userId = req.user.id;
  
    const user = await User.findById(userId)
                             .populate('incomingRequests', 'name email -_id');  // Only get name and email of the friends
    
    if (!user) {
      return res.json({ status: 'error', error: 'User not found' });
    }
  
    res.json({ status: 'ok', incomingRequests: user.incomingRequests });
  };