import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Spinner";

const Profile = () => {
  const { user} = useAuth();
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      setLoading(true); // start loading
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
        setLoading(false); // stop loading
      }
    };

    loadProfile();
  }, [user, axiosSecure]);

  if (loading) return (
   
      <Spinner />
   
  );

  return (
   <div className="max-w-5xl mx-auto bg-white dark:bg-[#132925] rounded-2xl shadow-xl overflow-hidden">
  <title>My Profile</title>

  {/* COVER */}
  <div className="h-48 relative bg-gradient-to-br from-[#15ce87] via-[#6adfb6] to-[#b2beab]">
    <div className="absolute -bottom-16 left-10">
      <img
        src={user?.photoURL || "https://i.ibb.co/2kR8YzC/user.png"}
        alt="Profile"
        className="w-36 h-36 rounded-full border-4 border-white dark:border-[#1f3f35] object-cover shadow"
      />
    </div>
  </div>

  {/* CONTENT */}
  <div className="pt-24 px-10 pb-10">
    <div className="flex items-center gap-3 mb-2">
      <h2 className="text-2xl font-semibold text-[#1C2B27] dark:text-[#EAF3F1]">
        {profile?.name}
      </h2>

      {/* status badge */}
      <span
        className={`px-3 py-1 text-xs rounded-full font-medium ${
          profile?.status === "active"
            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
            : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
        }`}
      >
        {profile?.status || "active"}
      </span>
    </div>

    <p className="text-gray-600 dark:text-[#9FB8B1] mb-6">
      Welcome to your profile dashboard. Here you can see all your
      registered details.
    </p>

    <hr className="mb-6 border-gray-200 dark:border-[#1f3f35]" />

    {/* INFO GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-[#1C2B27] dark:text-[#EAF3F1]">
      <Info
        label="Email Address"
        value={profile?.email}
        capitalize={false}
      />
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
      {/*----------------------- After assignment mark edit ------------------------- */}
      {/* <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
        Edit Profile
      </button> */}

     
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
