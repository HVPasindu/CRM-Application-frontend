import { Avatar, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

function Topbar({ setOpen }) {
  const user = JSON.parse(localStorage.getItem("crm_user")) || {};

  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <IconButton className="md:!hidden" onClick={() => setOpen(true)}>
          <Menu />
        </IconButton>

        <h2 className="text-lg md:text-xl font-bold text-[#0b132b]">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <p className="hidden sm:block text-sm md:text-base text-gray-700">
          {user.name || "Admin User"}
        </p>

        <Avatar sx={{ bgcolor: "#bdbdbd" }}>
          {(user.name || "A").charAt(0).toUpperCase()}
        </Avatar>
      </div>
    </header>
  );
}

export default Topbar;