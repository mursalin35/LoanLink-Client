  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
        <button
          onClick={() => setView(null)}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-red-500"
        >
          &times;
        </button>

        <h3 className="text-xl font-bold text-center text-[#1F4F45] mb-4">
          Application Details
        </h3>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Name:</strong> {view.firstName} {view.lastName}
          </p>
          <p>
            <strong>Email:</strong> {view.userEmail}
          </p>
          <p>
            <strong>Amount:</strong> ${view.loanAmount}
          </p>
          <p>
            <strong>Status:</strong> {view.status}
          </p>
          <p>
            <strong>Category:</strong> {view.loanCategory || "-"}
          </p>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() =>
              statusM.mutate({ id: view._id, status: "Rejected" })
            }
            className="px-3 py-1 rounded-md bg-red-600 text-white hover:opacity-90"
          >
            Reject
          </button>
          <button
            onClick={() =>
              statusM.mutate({ id: view._id, status: "Approved" })
            }
            className="px-3 py-1 rounded-md bg-[#1F4F45] text-white hover:opacity-90"
          >
            Approve
          </button>
          <button
            onClick={() => setView(null)}
            className="px-3 py-1 rounded-md bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>