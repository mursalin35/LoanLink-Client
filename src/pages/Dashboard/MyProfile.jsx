import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const Profile = () => {
  const { user, logout } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      try {
        const { data } = await axiosSecure.get(`/users/${user.email}`);
        setProfile(data);
      } catch {
        setProfile({
          name: user?.displayName || "User",
          email: user?.email,
          role: "user",
          status: "active",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, axiosSecure]);

  if (loading) {
    return <Spinner/>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-xl overflow-hidden">
<title>My Profile</title>
      {/* COVER */}
      <div className="h-48 bg-yellow-400 relative">
        <div className="absolute -bottom-14 left-10">
          <img
            src={user?.photoURL || "https://i.ibb.co/2kR8YzC/user.png"}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white object-cover shadow"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="pt-20 px-10 pb-10">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-2xl font-semibold">{profile?.name}</h2>

          <span
            className={`px-3 py-1 text-xs rounded-full font-medium ${
              profile?.status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {profile?.status || "active"}
            {/* {profile?.status || "inactive"} */}
          </span>
        </div>

        <p className="text-gray-600 mb-6">
          Welcome to your profile dashboard. Here you can see all your registered details.
        </p>

        <hr className="mb-6" />

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
        <Info label="Email Address" value={profile?.email} capitalize={false}/>

          <Info
            label="Account Created"
            value={
              profile?.createdAt
                ? new Date(profile.createdAt).toLocaleDateString()
                : "N/A"
            }
          />
          <Info
            label="Last Logged In"
            value={
              user?.metadata?.lastSignInTime
                ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                : "N/A"
            }
          />
          <Info label="User Role" value={profile?.role || "user"} />
          <Info label="Phone Number" value={profile?.phone || "N/A"} />
          <Info label="Gender" value={profile?.gender || "N/A"} />
          <Info label="Age" value={profile?.age || "N/A"} />
          <Info label="Address" value={profile?.address || "N/A"} />
        </div>

        {/* ACTIONS */}
        <div className="mt-10 flex flex-wrap gap-4">
          <button
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Edit Profile
          </button>

          <button
            onClick={async () => {
              await logout();
              toast.success("Logged out successfully");
            }}
            className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

/* Reusable Info Component */
const Info = ({ label, value, capitalize = true }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className={`font-medium ${capitalize ? "capitalize" : ""}`}>{value}</p>
  </div>
);


export default Profile;
