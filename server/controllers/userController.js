import User from "../models/User.js";

export const getEmergencyContacts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.emergencyContacts || []);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Failed to load contacts" });
  }
};

export const addEmergencyContact = async (req, res) => {
  try {
    const { name, phone, relationship, priority } = req.body;

    if (!name || !phone || !relationship || priority === undefined) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findById(req.user._id);

    if (user.emergencyContacts.length >= 3) {
      return res.status(400).json({ message: "You can only add up to 3 emergency contacts." });
    }

    const phoneExists = user.emergencyContacts.some(c => c.phone === phone);
    if (phoneExists) {
      return res.status(400).json({ message: "This phone number is already in your emergency contacts." });
    }

    const priorityExists = user.emergencyContacts.some(c => c.priority == priority);
    if (priorityExists) {
      return res.status(400).json({ message: `Priority ${priority} is already assigned to another contact.` });
    }

    user.emergencyContacts.push({ name, phone, relationship, priority });
    await user.save();

    res.json({ message: "Emergency contact added successfully.", contacts: user.emergencyContacts });
  } catch (error) {
    console.error("Add contact error:", error);
    res.status(500).json({ message: "Failed to add contact. Please try again." });
  }
};

export const updateEmergencyContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, relationship, priority } = req.body;

    const user = await User.findById(req.user._id);
    const contact = user.emergencyContacts.id(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found." });
    }

    const otherContacts = user.emergencyContacts.filter(c => c._id.toString() !== id);

    if (otherContacts.some(c => c.phone === phone)) {
      return res.status(400).json({ message: "This phone number is already in another contact." });
    }

    if (otherContacts.some(c => c.priority == priority)) {
      return res.status(400).json({ message: `Priority ${priority} is already used in another contact.` });
    }

    Object.assign(contact, { name, phone, relationship, priority });
    await user.save();

    res.json({ message: "Emergency contact updated successfully.", contacts: user.emergencyContacts });
  } catch (error) {
    console.error("Update contact error:", error);
    res.status(500).json({ message: "Failed to update contact. Please try again." });
  }
};

export const deleteEmergencyContact = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    const initialLength = user.emergencyContacts.length;

    user.emergencyContacts = user.emergencyContacts.filter(c => c._id.toString() !== id);

    if (user.emergencyContacts.length === initialLength) {
      return res.status(404).json({ message: "Contact not found or already deleted." });
    }

    await user.save();
    res.json({ message: "Emergency contact removed successfully.", contacts: user.emergencyContacts });
  } catch (error) {
    console.error("Delete contact error:", error);
    res.status(500).json({ message: "Failed to delete contact. Please try again." });
  }
};
