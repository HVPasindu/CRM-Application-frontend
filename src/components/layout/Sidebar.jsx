import {
  Dashboard,
  PeopleAlt,
  AddCircle,
  Logout,
  Menu,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      icon: "question",
      title: "Logout?",
      text: "Are you sure you want to logout?",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#00a6fb",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("crm_token");
        localStorage.removeItem("crm_user");

        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been logged out successfully.",
          confirmButtonText: "OK",
          confirmButtonColor: "#00a6fb",
        }).then(() => {
          navigate("/login");
        });
      }
    });
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: <Dashboard />,
      path: "/dashboard",
      exact: true,
    },
    {
      label: "Leads",
      icon: <PeopleAlt />,
      path: "/leads",
      exact: true,
    },
    {
      label: "Add Lead",
      icon: <AddCircle />,
      path: "/leads/create",
      exact: true,
    },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-30 md:hidden ${
          open ? "block" : "hidden"
        }`}
        onClick={() => setOpen(false)}
      />

      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#00a6fb] text-white z-40
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/20">
          <h1 className="text-xl font-bold">CRM System</h1>

          <IconButton
            className="!text-white md:!hidden"
            onClick={() => setOpen(false)}
          >
            <Menu />
          </IconButton>
        </div>

        <nav className="p-3 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `
                flex items-center gap-4 px-5 py-3 rounded-2xl transition
                ${
                  isActive
                    ? "bg-white/25 font-semibold"
                    : "hover:bg-white/15"
                }
                `
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-5 left-0 w-full px-4">
          <Button
            fullWidth
            variant="contained"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{
              backgroundColor: "rgba(255,255,255,0.18)",
              boxShadow: "none",
              borderRadius: "16px",
              py: 1.2,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.25)",
                boxShadow: "none",
              },
            }}
          >
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;