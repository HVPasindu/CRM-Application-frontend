import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, Save } from "@mui/icons-material";
import Swal from "sweetalert2";
import api from "../../../services/api";

function AddLead() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [leadName, setLeadName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [requirement, setRequirement] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [leadSource, setLeadSource] = useState("Other");
  const [assignedSalesperson, setAssignedSalesperson] = useState("");
  const [status, setStatus] = useState("New");
  const [estimatedDealValue, setEstimatedDealValue] = useState("");

  const [leadNameError, setLeadNameError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [requirementError, setRequirementError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [assignedSalespersonError, setAssignedSalespersonError] = useState("");

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

  const validateEmail = (value) => {
    if (!value.trim()) {
      return "Email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      return "Enter a valid email address";
    }

    return "";
  };

  const validatePhone = (value) => {
    if (!value.trim()) {
      return "Phone number is required";
    }

    const phoneRegex = /^[0-9]{10}$/;

    if (!phoneRegex.test(value)) {
      return "Phone number must be exactly 10 digits";
    }

    return "";
  };

  const validateForm = () => {
    const leadNameMessage = !leadName.trim() ? "Lead name is required" : "";

    const companyNameMessage = !companyName.trim()
      ? "Company name is required"
      : "";

    const requirementMessage = !requirement.trim()
      ? "Requirement is required"
      : "";

    const emailMessage = validateEmail(email);
    const phoneMessage = validatePhone(phone);

    const assignedSalespersonMessage = !assignedSalesperson.trim()
      ? "Assigned salesperson is required"
      : "";

    setLeadNameError(leadNameMessage);
    setCompanyNameError(companyNameMessage);
    setRequirementError(requirementMessage);
    setEmailError(emailMessage);
    setPhoneError(phoneMessage);
    setAssignedSalespersonError(assignedSalespersonMessage);

    if (
      leadNameMessage ||
      companyNameMessage ||
      requirementMessage ||
      emailMessage ||
      phoneMessage ||
      assignedSalespersonMessage
    ) {
      return false;
    }

    return true;
  };

  const handleCreateLead = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      await api.post("/leads", {
        lead_name: leadName,
        company_name: companyName,
        requirement,
        email,
        phone,
        lead_source: leadSource,
        assigned_salesperson: assignedSalesperson,
        status,
        estimated_deal_value: estimatedDealValue || 0,
      });

      Swal.fire({
        icon: "success",
        title: "Created",
        text: "Lead created successfully",
        confirmButtonColor: "#00a6fb",
      }).then(() => {
        navigate("/leads");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Create Failed",
        text: error.response?.data?.message || "Failed to create lead",
        confirmButtonColor: "#00a6fb",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-[#0b132b]">
            Add Lead
          </h1>

          <p className="text-gray-600 mt-2">
            Create a new customer lead for your CRM pipeline.
          </p>
        </div>

        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/leads")}
          sx={{
            borderRadius: "14px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Back to Leads
        </Button>
      </div>

      <Card
        sx={{
          borderRadius: "28px",
          boxShadow: "0 6px 18px rgba(11, 19, 43, 0.08)",
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h6" fontWeight="bold" color="secondary" mb={3}>
            Lead Information
          </Typography>

          <div className="flex flex-wrap gap-5">
            <TextField
              label="Lead Name"
              value={leadName}
              onChange={(e) => {
                setLeadName(e.target.value);

                if (leadNameError) {
                  setLeadNameError("");
                }
              }}
              error={!!leadNameError}
              helperText={leadNameError}
              sx={{ flex: "1 1 300px" }}
            />

            <TextField
              label="Company Name"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);

                if (companyNameError) {
                  setCompanyNameError("");
                }
              }}
              error={!!companyNameError}
              helperText={companyNameError}
              sx={{ flex: "1 1 300px" }}
            />

            <TextField
              label="Requirement"
              value={requirement}
              onChange={(e) => {
                setRequirement(e.target.value);

                if (requirementError) {
                  setRequirementError("");
                }
              }}
              error={!!requirementError}
              helperText={requirementError}
              sx={{ flex: "1 1 300px" }}
              placeholder="Ecommerce Website, Mobile App, POS System"
            />

            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                if (emailError) {
                  setEmailError("");
                }
              }}
              error={!!emailError}
              helperText={emailError}
              sx={{ flex: "1 1 300px" }}
            />

            <TextField
              label="Phone Number"
              value={phone}
              onChange={(e) => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                setPhone(onlyNumbers);

                if (phoneError) {
                  setPhoneError("");
                }
              }}
              error={!!phoneError}
              helperText={phoneError}
              inputProps={{
                maxLength: 10,
              }}
              sx={{ flex: "1 1 300px" }}
            />

            <TextField
              select
              label="Lead Source"
              value={leadSource}
              onChange={(e) => setLeadSource(e.target.value)}
              sx={{ flex: "1 1 300px" }}
            >
              {leadSources.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Assigned Salesperson"
              value={assignedSalesperson}
              onChange={(e) => {
                setAssignedSalesperson(e.target.value);

                if (assignedSalespersonError) {
                  setAssignedSalespersonError("");
                }
              }}
              error={!!assignedSalespersonError}
              helperText={assignedSalespersonError}
              sx={{ flex: "1 1 300px" }}
            />

            <TextField
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{ flex: "1 1 300px" }}
            >
              {statuses.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Estimated Deal Value"
              type="number"
              value={estimatedDealValue}
              onChange={(e) => setEstimatedDealValue(e.target.value)}
              sx={{ flex: "1 1 300px" }}
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-8">
            <Button
              variant="contained"
              startIcon={
                saving ? (
                  <CircularProgress size={20} sx={{ color: "white" }} />
                ) : (
                  <Save />
                )
              }
              disabled={saving}
              onClick={handleCreateLead}
              sx={{
                flex: "1 1 180px",
                py: 1.4,
                borderRadius: "14px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              {saving ? "Saving..." : "Create Lead"}
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/leads")}
              sx={{
                flex: "1 1 180px",
                py: 1.4,
                borderRadius: "14px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddLead;