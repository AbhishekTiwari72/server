const cron = require('node-cron');
const User = require('../models/userModel');

// Schedule a job to run every minute to remove expired email verification tokens
cron.schedule('* * * * *', async () => {
  try {
    const expiredUsers = await User.find({ emailTokenExpires: { $lt: Date.now() }, isVerified: false });
    
    if (expiredUsers.length > 0) {
      console.log(`Removing ${expiredUsers.length} expired unverified users:`);
      
      expiredUsers.forEach(user => {
        console.log(`- ${user.email}`);
      });
      
      const result = await User.deleteMany({ _id: { $in: expiredUsers.map(user => user._id) } });
      console.log(`Removed ${result.deletedCount} expired unverified users`);
    }
  } catch (error) {
    console.error('Error removing expired unverified users:', error);
  }
});
