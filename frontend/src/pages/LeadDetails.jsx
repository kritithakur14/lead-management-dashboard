import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://lead-management-dashboard-e54s.onrender.com/api/leads";


export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLead();
  }, []);

  const fetchLead = async () => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      const data = await res.json();
      setLead(data);
    } catch (error) {
      console.error("Failed to fetch lead", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!lead) return <div className="p-6">Lead not found</div>;

  return (
    <div className="p-6 space-y-4">
      <button
        onClick={() => navigate("/leads")}
        className="text-blue-600 underline text-sm"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-2xl font-semibold text-[#022a66]">
        Lead Details
      </h1>

      <div className="bg-white shadow rounded-lg p-6 space-y-2 text-[#070758]">
        <p><b>Name:</b> {lead.name}</p>
        <p><b>Email:</b> {lead.email}</p>
        <p><b>Phone:</b> {lead.phone}</p>
        <p className="capitalize"><b>Status:</b> {lead.status}</p>
        <p className="capitalize"><b>Source:</b> {lead.source}</p>
        <p><b>Created:</b> {new Date(lead.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
