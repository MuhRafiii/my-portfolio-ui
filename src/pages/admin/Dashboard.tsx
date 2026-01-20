import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Cpu, FolderGit2, User } from "lucide-react";
import { Link } from "react-router-dom";

const dashboard_menu = [
  {
    title: "Profile",
    description: "Manage your personal information",
    icon: User,
    href: "/admin/profile",
  },
  {
    title: "Techs",
    description: "Manage tech stack & skills",
    icon: Cpu,
    href: "/admin/techs",
  },
  {
    title: "Experiences",
    description: "Manage work experiences",
    icon: Briefcase,
    href: "/admin/experiences",
  },
  {
    title: "Projects",
    description: "Manage portfolio projects",
    icon: FolderGit2,
    href: "/admin/projects",
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="">
        <h1 className="text-xl sm:text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Manage all portfolio content from here
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboard_menu.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link to={menu.href} key={menu.title}>
              <Card className="h-full cursor-pointer transition-all hover:shadow-md hover:-translate-y-1 hover:border-primary">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Icon size={22} />
                  </div>
                  <CardTitle className="text-base lg:text-lg">
                    {menu.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {menu.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
