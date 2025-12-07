import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, logout } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch profile data
  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const res = await axiosSecure.get(`/users/${user.email}`);
          if (res.data) {
            setProfile({
              name: res.data.name || user.displayName || "",
              email: res.data.email || user.email,
              phone: res.data.phone || "",
              address: res.data.address || "",
            });
          } else {
            setProfile({
              name: user.displayName || "",
              email: user.email,
              phone: "",
              address: "",
            });
          }
        } catch (err) {
          setProfile({
            name: user.displayName || "",
            email: user.email,
            phone: "",
            address: "",
          });
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [user, axiosSecure]);

  const handleChange = (e) =>
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    try {
      const res = await axiosSecure.patch(`/users/profile/${user.email}`, profile);
      setProfile(res.data);
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-2xl p-6 bg-white rounded shadow mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="space-y-3">
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          value={profile.email}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />
        <input
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="address"
          value={profile.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border p-2 rounded"
          rows={3}
        />

        <div className="flex gap-3 mt-3">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
