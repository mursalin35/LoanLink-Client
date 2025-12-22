{/* View Modal */}
  {viewApp && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setViewApp(null)}
          className="absolute top-4 right-4 text-2xl font-bold text-[#6B7C75] hover:text-[#ef4f4f] transition-colors"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-[#1F4F45] text-center">
          {viewApp.loanTitle}
        </h2>

        {/* Loan Info Section */}
        <div className="bg-[#F4F7F5] rounded-xl p-4 mb-4 shadow-inner">
          <h3 className="text-lg font-semibold text-[#1F4F45] mb-2">Loan Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#1C2B27] text-sm sm:text-base">
            <p><strong>Loan ID:</strong> {viewApp._id}</p>
            <p><strong>Amount:</strong> ${viewApp.loanAmount}</p>
            <p><strong>Status:</strong> <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-[#6FBF73]/30 text-[#1F4F45]">{viewApp.status}</span></p>
            <p><strong>Application Fee:</strong> {viewApp.applicationFeeStatus}</p>
            <p className="sm:col-span-2"><strong>Applied At:</strong> {new Date(viewApp.appliedAt).toLocaleString()}</p>
            <p className="sm:col-span-2"><strong>Approved At:</strong> {viewApp.approvedAt ? new Date(viewApp.approvedAt).toLocaleString() : "—"}</p>
          </div>
        </div>

        {/* Borrower Info Section */}
        <div className="bg-[#F4F7F5] rounded-xl p-4 mb-4 shadow-inner">
          <h3 className="text-lg font-semibold text-[#1F4F45] mb-2">Borrower Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#1C2B27] text-sm sm:text-base">
            <p><strong>Name:</strong> {viewApp.firstName} {viewApp.lastName}</p>
            <p><strong>Email:</strong> {viewApp.userEmail}</p>
            <p><strong>Contact Number:</strong> {viewApp.contactNumber}</p>
            <p><strong>National ID:</strong> {viewApp.nationalID}</p>
          </div>
        </div>

        {/* Personal & Income Info Section */}
        <div className="bg-[#F4F7F5] rounded-xl p-4 shadow-inner">
          <h3 className="text-lg font-semibold text-[#1F4F45] mb-2">Personal & Income Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[#1C2B27] text-sm sm:text-base">
            <p ><strong>Income Source:</strong> {viewApp.incomeSource}</p>
            <p><strong>Monthly Income:</strong> ${viewApp.monthlyIncome}</p>
            <p className="sm:col-span-2"><strong>Reason:</strong> {viewApp.reason}</p>
            <p className="sm:col-span-2"><strong>Address:</strong> {viewApp.address}</p>
            {viewApp.extraNotes && (
              <p className="sm:col-span-2"><strong>Notes:</strong> {viewApp.extraNotes}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )}
</div>