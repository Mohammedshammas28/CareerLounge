import { User } from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({
      message: 'Users retrieved successfully',
      users,
      total: users.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting the last admin
    const adminCount = await User.countDocuments({ role: 'admin' });
    const user = await User.findById(id);

    if (user.role === 'admin' && adminCount === 1) {
      return res.status(400).json({ message: 'Cannot delete the last admin user' });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User deleted successfully',
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: 'admin' });
    const regularUsers = await User.countDocuments({ role: 'user' });

    res.json({
      message: 'Stats retrieved successfully',
      stats: {
        totalUsers,
        adminUsers,
        regularUsers,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
