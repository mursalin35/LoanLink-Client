<div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <title>My Profile</title>
      {/* COVER */}
      <div className="h-48 relative bg-gradient-to-br from-[#15ce87] via-[#6adfb6] to-[#b2beab]



">
        <div className="absolute -bottom-16 left-10">
          <img
            src={user?.photoURL || "https://i.ibb.co/2kR8YzC/user.png"}
            alt="Profile"
            className="w-36 h-36 rounded-full border-4 border-white object-cover shadow"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="pt-24 px-10 pb-10">
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
          Welcome to your profile dashboard. Here you can see all your
          registered details.
        </p>

        <hr className="mb-6" />

        {/* INFO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
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
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition">
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>