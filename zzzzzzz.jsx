<div className="min-h-screen px-4 sm:px-6 pt-4 pb-10 max-w-7xl mx-auto bg-transparent dark:bg-[#0F1F1B]">
  <title>Pending Loans</title>

  {/* Header */}
  <div className="mb-6 text-center sm:text-left">
    <h1 className="text-3xl font-semibold text-[#1C2B27] dark:text-[#E6F4F1]">
      Pending Loan Applications
    </h1>
    <p className="text-sm sm:text-base text-[#6B7C75] dark:text-[#9FB3AC] mt-2">
      Review and manage pending loan requests
    </p>
  </div>

  {apps.length === 0 ? (
    <p className="text-[#6B7C75] dark:text-[#9FB3AC]">
      No pending applications.
    </p>
  ) : (
    <>
      {/* ================= MOBILE + TABLET CARD VIEW ================= */}
      <div className="sm:hidden space-y-4">
        {apps.map((a) => (
          <div
            key={a._id}
            className="bg-white dark:bg-[#162925] rounded-2xl shadow-md p-5 space-y-4 border border-gray-100 dark:border-[#1F4F45]"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold text-[#1C2B27] dark:text-[#E6F4F1] text-lg">
                  {a.loanTitle}
                </h2>
                <span className="text-sm text-[#6B7C75] dark:text-[#9FB3AC] mt-1 block">
                  #{a._id.slice(-10)}
                </span>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#B6E04C]/30 dark:bg-[#B6E04C]/20 text-[#1C2B27] dark:text-[#E6F4F1]">
                Pending
              </span>
            </div>

            {/* Info */}
            <div className="grid grid-cols-1 gap-2 text-sm text-[#1C2B27] dark:text-[#E6F4F1]">
              <p>
                <strong>User:</strong> {a.firstName} {a.lastName}
              </p>
              <p className="text-[#6B7C75] dark:text-[#9FB3AC]">
                {a.userEmail}
              </p>
              <p>
                <strong>Amount:</strong> ${a.loanAmount}
              </p>
              <p>
                <strong>Applied At:</strong>{" "}
                {new Date(a.appliedAt).toLocaleString()}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => setViewApp(a)}
                className="flex-1 px-3 py-2 rounded-md bg-[#F4F7F5] dark:bg-[#1F4F45] text-[#1C2B27] dark:text-white text-sm font-semibold hover:bg-[#1F4F45] hover:text-white transition-colors"
              >
                View
              </button>

              <button
                onClick={() => rejectMutation.mutate(a._id)}
                className="flex-1 px-3 py-2 rounded-md bg-red-400 hover:bg-red-500 transition-colors text-white text-sm font-semibold"
              >
                Reject
              </button>

              <button
                onClick={() => approveMutation.mutate(a._id)}
                className="flex-1 px-3 py-2 rounded-md bg-[#6FBF73] hover:bg-[#5fb850] text-white text-sm font-semibold transition-colors"
              >
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP TABLE VIEW ================= */}
      <div className="hidden sm:block bg-white dark:bg-[#162925] rounded-md shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-[#1F4F45] text-white">
              <tr>
                <th className="px-4 py-4 text-left">Loan ID</th>
                <th className="px-4 py-4 text-left">User Info</th>
                <th className="px-4 py-4 text-left">Amount</th>
                <th className="px-4 py-4 text-left">Date</th>
                <th className="px-4 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-[#1F4F45]">
              {apps.map((a) => (
                <tr
                  key={a._id}
                  className="hover:bg-[#F4F7F5] dark:hover:bg-[#1F4F45]/40 transition"
                >
                  <td className="px-4 py-3 flex flex-col font-semibold text-[#1C2B27] dark:text-[#E6F4F1]">
                    {a.loanTitle}
                    <span className="text-sm font-normal text-[#6B7C75] dark:text-[#9FB3AC]">
                      #{a._id.slice(-10)}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <p className="font-semibold text-[#1C2B27] dark:text-[#E6F4F1]">
                      {a.firstName} {a.lastName}
                    </p>
                    <span className="text-sm text-[#6B7C75] dark:text-[#9FB3AC]">
                      {a.userEmail}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-[#1F4F45] dark:text-[#6FBF73]">
                    ${a.loanAmount}
                  </td>

                  <td className="px-4 py-3 text-[#1C2B27] dark:text-[#E6F4F1]">
                    {new Date(a.appliedAt).toLocaleString()}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-row gap-2">
                      <button
                        onClick={() => approveMutation.mutate(a._id)}
                        className="px-3 py-1 rounded-md bg-[#6FBF73] text-white text-sm font-semibold hover:bg-[#5fb850] transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectMutation.mutate(a._id)}
                        className="px-3 py-1 rounded-md bg-red-400 text-white text-sm font-semibold hover:bg-red-500 transition-colors"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => setViewApp(a)}
                        className="px-3 py-1 rounded-md bg-[#ebebeb] dark:bg-[#1F4F45] text-[#1C2B27] dark:text-white text-sm font-semibold hover:bg-[#1F4F45] hover:text-white transition-colors"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )}
</div>
