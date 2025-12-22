 <div className="p-4">
      <title>Approved Loans</title>
      <h2 className="text-2xl font-bold mb-4">Approved Loan Applications</h2>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Loan ID</th>
              <th className="p-2">User Info</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Approved Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((a) => (
              <tr key={a._id} className="border-t">
                <td className="p-2">{a._id}</td>
                <td className="p-2">
                  {a.firstName} {a.lastName}<br />
                  <span className="text-sm text-gray-600">{a.userEmail}</span>
                </td>
                <td className="p-2">${a.loanAmount}</td>
                <td className="p-2">{a.approvedAt ? new Date(a.approvedAt).toLocaleString() : "—"}</td>
                <td className="p-2">
                  <button
                    onClick={() => setViewApp(a)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      {viewApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded max-w-md w-full">
            <h3 className="text-xl font-bold mb-3">Application Details</h3>
            <p><strong>Loan:</strong> {viewApp.loanTitle}</p>
            <p><strong>Amount:</strong> ${viewApp.loanAmount}</p>
            <p><strong>Borrower:</strong> {viewApp.firstName} {viewApp.lastName}</p>
            <p><strong>Email:</strong> {viewApp.userEmail}</p>
            <p><strong>Approved At:</strong> {viewApp.approvedAt ? new Date(viewApp.approvedAt).toLocaleString() : "—"}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setViewApp(null)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>