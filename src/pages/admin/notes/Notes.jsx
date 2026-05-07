import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import {
  Add,
  Delete,
  Notes as NotesIcon,
  ArrowBack,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import api from "../../../services/api";

function Notes() {
  const { leadId } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);

  const [noteContent, setNoteContent] = useState("");
  const [noteError, setNoteError] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchLeadAndNotes = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/leads/${leadId}`);

      setLead(res.data.lead);
      setNotes(res.data.notes || []);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Failed to load lead notes",
        confirmButtonColor: "#00a6fb",
      }).then(() => {
        navigate("/leads");
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadAndNotes();
  }, [leadId]);

  const handleAddNote = async () => {
    if (!noteContent.trim()) {
      setNoteError("Note content is required");
      return;
    }

    try {
      setSaving(true);

      await api.post(`/leads/${leadId}/notes`, {
        note_content: noteContent,
      });

      Swal.fire({
        icon: "success",
        title: "Added",
        text: "Note added successfully",
        confirmButtonColor: "#00a6fb",
      });

      setNoteContent("");
      setNoteError("");
      fetchLeadAndNotes();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Failed to add note",
        confirmButtonColor: "#00a6fb",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Delete Note?",
      text: "Are you sure you want to delete this note?",
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
      await api.delete(`/leads/notes/${noteId}`);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Note deleted successfully",
        confirmButtonColor: "#00a6fb",
      });

      fetchLeadAndNotes();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Failed to delete note",
        confirmButtonColor: "#00a6fb",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-[#0b132b]">
            Notes
          </h1>

          <p className="text-gray-600 mt-2">
            Add and manage follow-up notes for this lead.
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

      <div className="flex flex-wrap gap-5">
        <Card
          sx={{
            flex: "1 1 360px",
            borderRadius: "28px",
            boxShadow: "0 6px 18px rgba(11, 19, 43, 0.08)",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h6" fontWeight="bold" color="secondary" mb={3}>
              Add Note
            </Typography>

            {lead && (
              <div className="bg-[#f7fbff] border border-blue-100 rounded-2xl p-4 mb-5">
                <p className="text-sm text-gray-500">Selected Lead</p>

                <h3 className="font-bold text-[#0b132b] mt-1">
                  {lead.lead_name}
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  {lead.company_name}
                </p>

                <p className="text-sm text-[#00a6fb] font-semibold mt-1">
                  {lead.requirement}
                </p>

                <p className="text-sm text-gray-500 mt-2">{lead.email}</p>
              </div>
            )}

            <div className="flex flex-col gap-5">
              <TextField
                fullWidth
                multiline
                rows={5}
                label="Note Content"
                value={noteContent}
                onChange={(e) => {
                  setNoteContent(e.target.value);

                  if (noteError) {
                    setNoteError("");
                  }
                }}
                error={!!noteError}
                helperText={noteError}
                placeholder="Example: Called customer today. Asked to send proposal tomorrow."
              />

              <Button
                fullWidth
                variant="contained"
                startIcon={
                  saving ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    <Add />
                  )
                }
                disabled={saving}
                onClick={handleAddNote}
                sx={{
                  py: 1.4,
                  borderRadius: "14px",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                {saving ? "Saving..." : "Add Note"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card
          sx={{
            flex: "2 1 520px",
            borderRadius: "28px",
            boxShadow: "0 6px 18px rgba(11, 19, 43, 0.08)",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#e6f6ff] text-[#00a6fb] flex items-center justify-center">
                <NotesIcon />
              </div>

              <div>
                <Typography variant="h6" fontWeight="bold" color="secondary">
                  Lead Notes
                </Typography>

                <p className="text-gray-500 text-sm">
                  Follow-up history for selected lead
                </p>
              </div>
            </div>

            {notes.length === 0 ? (
              <div className="bg-[#f7fbff] border border-blue-100 rounded-2xl p-6 text-center">
                <p className="text-gray-500">
                  No notes available for this lead.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-[#f7fbff] border border-blue-100 rounded-2xl p-4"
                  >
                    <div className="flex flex-wrap justify-between gap-3">
                      <div>
                        <p className="text-[#0b132b] font-medium whitespace-pre-wrap">
                          {note.note_content}
                        </p>

                        <p className="text-gray-500 text-sm mt-3">
                          Added by: {note.created_by_name || "User"}
                        </p>

                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(note.created_at).toLocaleString()}
                        </p>
                      </div>

                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<Delete />}
                        onClick={() => handleDeleteNote(note.id)}
                        sx={{
                          borderRadius: "12px",
                          textTransform: "none",
                          height: "38px",
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Notes;