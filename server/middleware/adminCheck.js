const User = require('../models/User');

// Check if user is admin
// In a production app, you would add an 'isAdmin' field to the User model
// For now, this is a placeholder that checks if user exists
const adminCheck = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(403).json({ message: 'User not found' });
    }
    
    // TODO: Implement proper admin check
    // For now, we'll add a warning in the response
    // In production, add an 'isAdmin' field to User model and check it here
    console.warn('Admin check not fully implemented. Add isAdmin field to User model.');
    
    // Temporary: Only allow if user email contains 'admin'
    // This is NOT secure and should be replaced with proper role-based access control
    if (!user.email.includes('admin')) {
      return res.status(403).json({ 
        message: 'Access denied. Admin privileges required.',
        note: 'This endpoint requires admin privileges. Contact system administrator.'
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = adminCheck;
