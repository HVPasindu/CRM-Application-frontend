import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
  Chip,
  Pagination,
} from "@mui/material";

import {
  Delete,
  Edit,
  Email,
  Phone,
  Business,
  Person,
  Search,
  NoteAdd,
} from "@mui/icons-material";

import Swal from "sweetalert2";
import api from "../../../services/api";

function LeadList() {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [leadSource, setLeadSource] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6;

  const statuses = [
    "New",
    "Contacted",
    "Qualified",
    "Proposal Sent",
    "Won",
    "Lost",
  ];

  const leadSources = [
    "Website",
    "LinkedIn",
    "Referral",
    "Cold Email",
    "Event",
    "Other",
  ];

  const fetchLeads = async (pageNumber = page) => {
    try {
      setLoading(true);

      const params = {
        page: pageNumber,
        limit,
      };

      if (search) {
        params.search = search;
      }

      if (status) {
        params.status = status;
      }

      if (leadSource) {
        params.lead_source = leadSource;
      }

      const res = await api.get("/leads", { params });

      setLeads(res.data.leads || []);
      setTotalPages(res.data.totalPages || 1);
      setPage(res.data.currentPage || pageNumber);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Failed to load leads",
        confirmButtonColor: "#00a6fb",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(1);
  }, []);

  const handleSearch = () => {
    setPage(1);
    fetchLeads(1);
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatus("");
    setLeadSource("");
    setPage(1);

    setTimeout(() => {
      fetchLeads(1);
    }, 0);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    fetchLeads(value);
  };

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await api.put(`/leads/${leadId}/status`, {
        status: newStatus,
      });

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Lead status updated successfully",
        confirmButtonColor: "#00a6fb",
      });

      fetchLeads(page);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Failed to update status",
        confirmButtonColor: "#00a6fb",
      });
    }
  };

  const handleDeleteLead = async (leadId) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete Lead?",
      text: "Are you sure you want to delete this lead?",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await api.delete(`/leads/${leadId}`);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Lead deleted successfully",
        confirmButtonColor: "#00a6fb",
      });

      fetchLeads(page);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Failed to delete lead",
        confirmButtonColor: "#00a6fb",
      });
    }
  };

  const getStatusColor = (leadStatus) => {
    if (leadStatus === "Won") return "success";
    if (leadStatus === "Lost") return "error";
    if (leadStatus === "Qualified") return "primary";
    if (leadStatus === "Proposal Sent") return "warning";

    return "default";
  };

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-4xl font-bold text-[#0b132b]">
          Leads
        </h1>

        <p className="text-gray-600 mt-2">
          Manage and track all customer leads in your CRM.
        </p>
      </div>

      <Card
        sx={{
          borderRadius: "24px",
          boxShadow: "0 6px 18px rgba(11, 19, 43, 0.08)",
          mb: 4,
        }}
      >
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center">
            <TextField
              label="Search lead, company, email, requirement"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                flex: "1 1 280px",
              }}
            />

            <TextField
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{
                flex: "1 1 180px",
              }}
            >
              <MenuItem value="">All Status</MenuItem>

              {statuses.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Lead Source"
              value={leadSource}
              onChange={(e) => setLeadSource(e.target.value)}
              sx={{
                flex: "1 1 180px",
              }}
            >
              <MenuItem value="">All Sources</MenuItem>

              {leadSources.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="contained"
              startIcon={<Search />}
              onClick={handleSearch}
              sx={{
                flex: "1 1 140px",
                py: 1.6,
                borderRadius: "14px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Search
            </Button>

            <Button
              variant="outlined"
              onClick={handleClearFilters}
              sx={{
                flex: "1 1 140px",
                py: 1.6,
                borderRadius: "14px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="min-h-[50vh] flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : leads.length === 0 ? (
        <Card
          sx={{
            borderRadius: "24px",
            boxShadow: "0 6px 18px rgba(11, 19, 43, 0.08)",
          }}
        >
          <CardContent>
            <Typography textAlign="center" color="text.secondary">
              No leads found.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-wrap gap-5">
            {leads.map((lead) => (
              <Card
                key={lead.id}
                sx={{
                  flex: "1 1 330px",
                  maxWidth: {
                    xs: "100%",
                    sm: "calc(50% - 20px)",
                    xl: "calc(33.333% - 20px)",
                  },
                  borderRadius: "28px",
                  boxShadow: "0 6px 18px rgba(11, 19, 43, 0.08)",
                }}
              >
                <CardContent>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Lead Name</p>

                      <h2 className="text-xl font-bold text-[#0b132b]">
                        {lead.lead_name}
                      </h2>

                      <p className="text-sm text-gray-500 mt-3">
                        Requirement
                      </p>

                      <p className="text-gray-700">{lead.requirement}</p>
                    </div>

                    <Chip
                      label={lead.status}
                      color={getStatusColor(lead.status)}
                      size="small"
                    />
                  </div>

                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-center gap-3">
                      <Business fontSize="small" sx={{ color: "#00a6fb" }} />
                      <span>{lead.company_name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Email fontSize="small" sx={{ color: "#00a6fb" }} />
                      <span className="break-all">{lead.email}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone fontSize="small" sx={{ color: "#00a6fb" }} />
                      <span>{lead.phone || "No phone number"}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <Person fontSize="small" sx={{ color: "#00a6fb" }} />
                      <span>{lead.assigned_salesperson}</span>
                    </div>
                  </div>

                  <div className="mt-5 bg-[#f7fbff] rounded-2xl p-4 border border-blue-100">
                    <p className="text-sm text-gray-500">
                      Estimated Deal Value
                    </p>

                    <h3 className="text-xl font-bold text-[#0b132b] mt-1">
                      Rs.{" "}
                      {Number(
                        lead.estimated_deal_value || 0
                      ).toLocaleString()}
                    </h3>

                    <p className="text-sm text-gray-500 mt-3">Lead Source</p>

                    <p className="font-semibold text-[#00a6fb]">
                      {lead.lead_source}
                    </p>
                  </div>

                  <div className="mt-5">
                    <TextField
                      select
                      fullWidth
                      label="Update Status"
                      value={lead.status}
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value)
                      }
                    >
                      {statuses.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-5">
                    <Button
                      variant="outlined"
                      startIcon={<Edit />}
                      onClick={() => navigate(`/leads/edit/${lead.id}`)}
                      sx={{
                        flex: "1 1 120px",
                        borderRadius: "14px",
                        textTransform: "none",
                        fontWeight: "bold",
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={<NoteAdd />}
                      onClick={() => navigate(`/leads/${lead.id}/notes`)}
                      sx={{
                        flex: "1 1 120px",
                        borderRadius: "14px",
                        textTransform: "none",
                        fontWeight: "bold",
                      }}
                    >
                      Add Note
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleDeleteLead(lead.id)}
                      sx={{
                        flex: "1 1 120px",
                        borderRadius: "14px",
                        textTransform: "none",
                        fontWeight: "bold",
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default LeadList;