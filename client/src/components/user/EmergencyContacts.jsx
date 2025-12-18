import React, { useEffect, useState } from "react";
import { userService } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import ConfirmDialog from "../UI/ConfirmDialog"; // Adjust path if needed

export default function EmergencyContacts() {
  const { user } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    relationship: "",
    priority: 1,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null); // ✅ missing before

  const fetchContacts = async () => {
    try {
      const res = await userService.getContacts();
      setContacts(res.data);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch emergency contacts"
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, relationship, priority } = form;
    if (!name.trim() || !phone.trim() || !relationship.trim()) {
      return toast.error("Please fill in all fields.");
    }

    const normalizedPriority = parseInt(priority);
    if (isNaN(normalizedPriority) || normalizedPriority < 1 || normalizedPriority > 3) {
      return toast.error("Priority must be a number between 1 and 3.");
    }

    if (!editingId && contacts.length >= 3) {
      return toast.error("You can only add up to 3 emergency contacts.");
    }

    const phoneExists = contacts.some(
      (c) => c.phone === phone && c._id !== editingId
    );
    if (phoneExists) {
      return toast.error("This phone number is already in your contacts.");
    }

    const priorityExists = contacts.some(
      (c) => parseInt(c.priority) === normalizedPriority && c._id !== editingId
    );
    if (priorityExists) {
      return toast.error("This priority is already assigned to another contact.");
    }

    try {
      setLoading(true);
      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        relationship: relationship.trim(),
        priority: normalizedPriority,
      };

      if (editingId) {
        await userService.updateContact(editingId, payload);
        toast.success("Emergency contact updated");
      } else {
        await userService.addContact(payload);
        toast.success("Emergency contact added");
      }

      setForm({ name: "", phone: "", relationship: "", priority: 1 });
      setEditingId(null);
      fetchContacts();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to save emergency contact"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (contact) => {
    setForm(contact);
    setEditingId(contact._id);
  };

  const handleDelete = (id) => {
    setContactToDelete(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await userService.deleteContact(contactToDelete);
      toast.success("Contact deleted");
      fetchContacts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete contact");
    } finally {
      setConfirmOpen(false);
      setContactToDelete(null);
    }
  };

  useEffect(() => {
    if (user) fetchContacts();
  }, [user]);

  const label = loading
    ? editingId
      ? "Updating..."
      : "Adding..."
    : editingId
      ? "Update Contact"
      : "Add Contact";

  return (
    <div className="p-1 max-w-[70vw] md:max-w-3xl">
      <h2 className="text-3xl font-semibold text-primary/70 font-playfair mb-4">
        Emergency Contacts
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
      >
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          value={form.phone}
          onChange={(e) => {
            let value = e.target.value;
            value = value.replace(/[^\d+]/g, "");
            if (value.includes("+")) {
              value = "+" + value.replace(/\+/g, "");
            }
            setForm({ ...form, phone: value });
          }}
          placeholder="Phone"
          className="border border-gray-300 p-2 rounded"
        />

        <input
          value={form.relationship}
          onChange={(e) =>
            setForm({ ...form, relationship: e.target.value })
          }
          placeholder="Relationship"
          className="border border-gray-300 p-2 rounded"
        />
        <input
          type="number"
          min={1}
          max={3}
          value={form.priority}
          onChange={(e) =>
            setForm({ ...form, priority: parseInt(e.target.value) || 1 })
          }
          placeholder="Priority (1-3)"
          className="border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 sm:col-span-2"
        >
          {label}
        </button>
      </form>

      <div className="overflow-x-auto border border-primary/30 rounded">
        <table className="min-w-full text-md p-2">
          <thead className="bg-secondary/30  ">
            <tr className="text-center font-play-fair">
              <th className="px-4 py-2 ">Name</th>
              <th className="px-4 py-2 ">Phone</th>
              <th className="px-4 py-2 ">Relationship</th>
              <th className="px-4 py-2 ">Priority</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  No contacts added yet.
                </td>
              </tr>
            ) : (
              contacts.map((c) => (
                <tr key={c._id} className="border-t border-primary/30 text-center">
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.phone}</td>
                  <td className="px-4 py-2">{c.relationship}</td>
                  <td className="px-4 py-2">{c.priority}</td>
                  <td className="px-4 py-2 flex items-center justify-center gap-2">
                    <button
                      className="text-white border w-full p-1 border-sky-500 bg-sky-500 rounded rounded-lg hover:scale-105 hover:bg-sky-600"
                      onClick={() => handleEdit(c)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-white border w-full p-1 border-red-500 bg-red-500 rounded rounded-lg hover:scale-105 hover:bg-red-600"
                      onClick={() => handleDelete(c._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this contact?"
      />
    </div>
  );
}
