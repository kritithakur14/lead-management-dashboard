import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://lead-management-dashboard-e54s.onrender.com/api/leads";



export default function LeadsPage() {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  //analytics states
  const [totalLeads, setTotalLeads] = useState(0);
  const [convertedLeads, setConvertedLeads] = useState(0);
  const [statusCounts, setStatusCounts] = useState({});

  useEffect(() => {
    fetchLeads();
  }, [page, search, status]);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}?page=${page}&limit=10&search=${search}&status=${status}`
      );
      const data = await res.json();

      setLeads(data.leads);
      setTotalPages(data.totalPages);
      setTotalLeads(data.total);

      //analytics calculations
      const converted = data.leads.filter(
        (lead) => lead.status === "converted"
      ).length;
      setConvertedLeads(converted);

      const counts = {};
      data.leads.forEach((lead) => {
        counts[lead.status] = (counts[lead.status] || 0) + 1;
      });
      setStatusCounts(counts);
    } catch (error) {
      console.error("Failed to fetch leads", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#022a66]">
          Leads Dashboard
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            navigate("/", {replace: true});
            window.location.reload();
          }}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-[#022a66] hover:bg-[#031f44] transition"
        >
          Logout
        </button>
      </div>
      {/* Heading */}

      {/* Analytics (placeholder for now) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-[#01023d] font-bold">Total Leads</p>
          <h2 className="text-2xl font-bold text-[#093c9b]">{totalLeads}</h2>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-[#01023d] font-bold">Converted Leads</p>
          <h2 className="text-2xl font-bold text-[#093c9b]">
            {convertedLeads}
          </h2>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-[#01023d] font-bold">Leads by Status</p>
          <div className="mt-2 space-y-1 text-sm text-[#093c9b]">
            {Object.keys(statusCounts).length === 0 ? (
              <p>—</p>
            ) : (
              Object.entries(statusCounts).map(([key, value]) => (
                <p key={key} className="capitalize">
                  {key}: {value}
                </p>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => {
            setPage(1); // reset pagination
            setSearch(e.target.value);
          }}
          className="w-full sm:w-1/2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9ac7d6]"
        />

        {/* Status Filter */}
        <select
          value={status}
          onChange={(e) => {
            setPage(1); // reset pagination
            setStatus(e.target.value);
          }}
          className="w-full sm:w-1/4 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#9ac7d6] bg-white text-[#022a66]"
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="converted">Converted</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-[#02214e]">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Source</th>
              <th className="px-4 py-3 text-left">Created</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="border-t hover:bg-gray-50 cursor-pointer text-[#031f44]"
                  onClick={() => navigate(`/leads/${lead._id}`)}
                >
                  <td className="px-4 py-3">{lead.name}</td>
                  <td className="px-4 py-3">{lead.email}</td>
                  <td className="px-4 py-3 capitalize">{lead.status}</td>
                  <td className="px-4 py-3 capitalize">{lead.source}</td>
                  <td className="px-4 py-3">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50 text-[blue] bg-[#94c2ce]"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600 ">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded-lg disabled:opacity-50 text-[blue] bg-[#94c2ce] "
        >
          Next
        </button>
      </div>
    </div>
  );
}
