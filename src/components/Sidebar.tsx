import { useAuth } from "@/hooks/useAuth";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

const menus = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Profile", path: "/admin/profile" },
  { label: "Techs", path: "/admin/techs" },
  { label: "Experiences", path: "/admin/experiences" },
  { label: "Projects", path: "/admin/projects" },
];

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-full lg:w-64 border-b lg:border-r bg-background p-4">
      <h2 className="text-lg font-bold mb-4">Admin Panel</h2>

      <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2">
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              `px-3 py-2 rounded text-sm ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`
            }
          >
            {menu.label}
          </NavLink>
        ))}
      </nav>

      <Button variant="destructive" className="mt-6 w-full" onClick={logout}>
        Logout
      </Button>
    </aside>
  );
}
