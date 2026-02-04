import { Lead } from '../models/Lead.js';

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !phone || !service) {
      return res.status(400).json({ message: 'Name, email, phone, and service are required' });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      service,
      message,
    });

    res.status(201).json({
      message: 'Lead created successfully',
      lead,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json({
      message: 'Leads retrieved successfully',
      leads,
      total: leads.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({
      message: 'Lead updated successfully',
      lead,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
