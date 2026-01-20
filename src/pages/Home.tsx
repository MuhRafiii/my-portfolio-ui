import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useTheme } from "@/hooks/useTheme";
import { api } from "@/services/api";
import type { Experience } from "@/types/experiences";
import type { Profile } from "@/types/profile";
import type { Project } from "@/types/projects";
import type { Tech } from "@/types/techs";
import {
  Download,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [techs, setTechs] = useState<Tech[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [profileRes, techRes, expRes, projectRes] = await Promise.all([
          api.get("/profile"),
          api.get("/techs"),
          api.get("/experiences"),
          api.get("/projects"),
        ]);

        setProfile(profileRes.data.data);
        setTechs(techRes.data.techs);
        setExperiences(expRes.data.experiences);
        setProjects(projectRes.data.projects);
      } catch (error) {
        console.error("Failed to fetch homepage data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-background dark:bg-gray-900 border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#hero">
            <h1 className="font-bold text-lg">{profile?.name}</h1>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <a
              href="#techs"
              className="text-muted-foreground hover:text-foreground"
            >
              Tech Stack
            </a>
            <a
              href="#experiences"
              className="text-muted-foreground hover:text-foreground"
            >
              Experiences
            </a>
            <a
              href="#projects"
              className="text-muted-foreground hover:text-foreground"
            >
              Projects
            </a>
            <div className="flex items-center gap-4">
              <a
                href={`https://wa.me/${profile?.phone ?? ""}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="flex gap-2 items-center bg-green-500 hover:bg-green-600 text-white px-4 text-base">
                  <img
                    src="data:image/png;base64,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"
                    alt="whatsapp--v1"
                    className="w-4 h-4"
                  />
                  Let's Talk
                </Button>
              </a>
              <a href={profile?.resume} target="_blank">
                <Button className="w-42 text-base">
                  <Download className="w-4 h-4" />
                  Donwload CV
                </Button>
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div ref={menuRef} className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setOpenMenu((prev) => (prev === true ? false : true))
              }
            >
              {openMenu ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {openMenu && (
          <div className="lg:hidden border-t bg-muted/90 dark:bg-muted/20">
            <div className="flex flex-col gap-4 px-4 py-6">
              <a
                href="#techs"
                className="text-muted-foreground"
                onClick={() => setOpenMenu(false)}
              >
                Tech stack
              </a>
              <a
                href="#experiences"
                className="text-muted-foreground"
                onClick={() => setOpenMenu(false)}
              >
                Experiences
              </a>
              <a
                href="#projects"
                className="text-muted-foreground"
                onClick={() => setOpenMenu(false)}
              >
                Projects
              </a>
              <a
                href={`https://wa.me/${profile?.phone ?? ""}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full flex gap-2 items-center bg-green-500 hover:bg-green-600 text-white px-4 text-base">
                  <img
                    src="data:image/png;base64,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"
                    alt="whatsapp--v1"
                    className="w-4 h-4"
                  />
                  Let's Talk
                </Button>
              </a>
              <a href={profile?.resume} target="_blank">
                <Button className="w-full text-base">
                  <Download className="w-4 h-4" />
                  Donwload CV
                </Button>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row mx-auto px-4 sm:px-6 lg:px-8 items-center gap-10">
          <div className="w-full flex justify-center">
            <img
              src={profile?.photo}
              alt={profile?.name}
              className="w-56 h-56 lg:w-72 lg:h-72 object-cover rounded-full shadow-lg"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {profile?.title}
            </h2>

            <p className="text-muted-foreground lg:text-lg text-justify">
              {profile?.about}
            </p>

            <div className="flex items-center gap-2">
              <MapPin />
              <p className="text-muted-foreground lg:text-lg">
                {profile?.address}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={`https://wa.me/${profile?.phone ?? ""}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="flex gap-2 items-center bg-green-500 hover:bg-green-600 dark:text-white px-8 py-6 text-lg"
                >
                  <img
                    src="data:image/png;base64,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"
                    alt="whatsapp--v1"
                    className="w-5 h-5"
                  />
                  Let's Talk
                </Button>
              </a>
              <a href={profile?.resume} target="_blank">
                <Button size="lg" className="w-48 text-lg py-6">
                  <Download className="w-5 h-5" />
                  Donwload CV
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="techs" className="py-16 bg-muted/50 dark:bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="font-semibold text-2xl mb-6">Tech Stack</h3>

          <div className="flex gap-6 overflow-x-auto py-4">
            {techs.map((tech) => (
              <div
                key={tech.id}
                className="min-w-30 bg-background dark:bg-muted/50 border rounded-xl p-4 flex flex-col items-center gap-2 hover:shadow-sm transition"
              >
                <img src={tech.icon} alt={tech.name} className="w-10 h-10" />
                <p className="text-sm font-medium">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section id="experiences" className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h3 className="text-2xl font-semibold">Experiences</h3>

          {experiences.map((e) => (
            <div
              key={e.id}
              className="border rounded-xl p-6 md:p-8 hover:shadow-md transition dark:bg-muted/50"
            >
              <div className="md:flex md:gap-8 space-y-2">
                <img
                  src={e.logo}
                  alt={e.company}
                  className="w-18 h-18 rounded"
                />

                <div className="w-full space-y-4">
                  <div className="">
                    <h1 className="text-xl font-semibold">{e.company}</h1>
                    <div className="md:flex text-sm text-muted-foreground items-center justify-between space-y-2">
                      <p>{e.position}</p>
                      <p>
                        {e.start_month} {e.start_year} -{" "}
                        {e.end_month
                          ? `${e.end_month} ${e.end_year}`
                          : "Present"}
                      </p>
                    </div>
                  </div>

                  <ul className="list-disc ml-5 text-gray-700 dark:text-muted-foreground text-justify">
                    {e.jobdesk.map((j, i) => (
                      <li key={i}>{j}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {e.tech.map((t, i) => (
                      <Badge
                        key={i}
                        variant="secondary"
                        className="text-sm text-gray-700 dark:text-gray-400 px-3"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-16 bg-muted/50 dark:bg-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h3 className="text-2xl font-semibold">Projects</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <Card
                key={p.id}
                className="flex flex-col justify-between dark:bg-muted/50"
              >
                <div className="space-y-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-48 lg:h-80"
                  />
                  <CardContent className="space-y-6 px-8">
                    <h2 className="text-xl font-bold">{p.name}</h2>
                    <p className="text-muted-foreground text-justify">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map((t, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-sm text-gray-700 dark:text-gray-400 px-3"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </div>
                <CardFooter>
                  <div className="w-full flex items-center justify-around">
                    {p.github === "unavailable" ? (
                      <div className="flex gap-2 items-center text-sm text-muted-foreground">
                        <Github className="w-4 h-4" />
                        <p>Private Repository</p>
                      </div>
                    ) : (
                      <a
                        href={p.github}
                        className="flex gap-2 text-sm text-blue-500 hover:text-blue-700 items-center"
                      >
                        <Github className="w-4 h-4" />
                        View on GitHub
                      </a>
                    )}

                    {p.demo ? (
                      <a
                        href={p.demo}
                        className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <p>Live Demo</p>
                      </a>
                    ) : (
                      <div className="flex gap-2 items-center text-sm text-muted-foreground">
                        <ExternalLink className="w-4 h-4" />
                        <p>Demo Unavailable</p>
                      </div>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 text-center">
        <h3 className="text-3xl font-bold mb-4">Let’s work together 🚀</h3>
        <p className="text-muted-foreground mb-6">
          Feel free to reach out if you're looking for a developer, have a
          question, or just want to connect.
        </p>
        <div className="w-1/3 mx-auto flex items-center justify-between text-muted-foreground">
          <a
            href={`mailto:${profile?.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            {profile?.email}
          </a>
          <p>|</p>
          <a
            href={`https://wa.me/${profile?.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <img
              src="data:image/png;base64,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"
              alt="whatsapp--v1"
              className="w-5 h-5"
            />
            +{profile?.phone}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Designed and created by {profile?.name}
        <div className="flex items-center justify-center gap-2 mt-4">
          <a
            href={`https://www.instagram.com/${profile?.instagram}`}
            target="_blank"
          >
            <img
              src={
                theme === "light"
                  ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAFcUlEQVR4nO2c3W8VRRTAf70NLeiFhxaDL3rtiygPKm9+S0iUD98MH/XFiImm8SNG4z9hiImKtRqMRGujxG/4A0AaDTFYgtZnC2IUrGDAqFTomklO4029M7t7d7Y7u3t+ySQ3lJ2dM2f2zJkzZwYURVEURVEURVEURVEURVEUpZJcAzwMjAFHgJ+Bi0C0xOWivPsw8DqwE1hNRekBtgIHgX8K6OwoYZkDDgBbqBD3AVMBdG6UshwD7qHEXAXsBeYD6Myoy2La/iawgpJxAzAdQAdGnsq3QIuSsA74KYBOizyX0yJb8CM/Sef/BrwrnsctwLUyUS8VPfLOW4FhYBw4l1AJrZBtfpzZ+QV4ElhGeCwDngLOxMhwItQ5YW9Mw98CmoRPE3g7RhazhgmKex3ezmXgWcrHc9L2TjIZWe8iEIw9/cYxWsrY+Qs875DrawJha4zZKTv7HPJtJgAOOibcMtj8IeBR4AGLJ7bSMTF/TgCBtTlL44y3EzoPAn+1tflTixKetshoZB+kQIYdfn6IruZivu/Q9vv/97+gDzhvkXUHBTJmaZRZZOVhKkaACQnuzcoInJPfU/K3EVkQJuH3Dm035qgT71lkNaHswjiS86hoSF2TKYN689K27VKHjQ8WPfenQ3m2r93sJxSGLexwm4e6N1pMRNrynYTEOzEAvC9fwnSMV7PeUv+PFMgflkatyVDncmDUQ8cv/iJeBfoztGuNY2etMGxmwfXZuxgEjnru/PbypYz6bmg4lFsYNkG77fzpHDu/3SQNBCCvF3w1aHnCkT8DvCKLprXA1VLM703yt5kE9XzVpTmqrAJGE3T8IwlNW0NcyVMxde4pUF5v+GjQxpiO2i97DWkxX8ZHjnqN7d5QdwX0xriaL2bcKTPP7o6ZDxp1VsBORx0fe9qm7Omw4Gov2+qsgEmHze/G7LjMkW1O+KKuChhyrCPMhOubXY65oFVHBYxYnv0hw0Iubr45aXnnE3VUwITlWePL58UeyztNWkrtFDBledYsqPJiiyMPtHYKmLU8e2OO7V1reefZOirgkuXZPPeRm5Z3/p3weVVARlapAv5jVk1QmJPw5gJymGo5CU9YnlU3NAV5LMRmZNHkm15HOOLxOipgyBGKsKWGZOExy7tMG66vowJcaS2nJIDmi6ZkL2RNK6mcAnY46vjEYzh6v+M9D9VZAQ3ZFLHVs9vDhsxLMaddar0hgyRNubLePuzSHDXlK7LVO9/FOeBKKgBJmrLVtTAn7EroHfXKhGuz+QvlZdJTWQX0S9JUFFNOii9vFms3yShvym8T6XwtQTZEJDtxfQXK6w2fDRqImQ98HrquTGKW79TEAUmayqvzJ6uWmphHcm6/mBmfd0zMi83vxuwEnZx7Osf09A2eTNIJT7eeBJmevhQHNLZJ6kjaAxqHZZHla4PfdkDjEAEeUUoaXUxDS7IXxiV8PCubOqb8Kv82LoG1pLGdNNiit8bzKgzbqDiX0d6GhuuQnjkGVRirHcdUzcUXVeEZi4yXMnhV3jjg2OYze7BlZ6UcOu8kozlXXDi2XJtIbh0pO+845DMHRYLgmKOR5taRsvKCQy5zoicY7o65rsbcOlLGzr9skekKcAeB8UaMb75P7GnorIoxO5EcqQqOFRLocjX8jFx8EaKL2ifeztkYGY7LocIgaTnCE+3lvNy9MCxhi6Iu7Vsv1yhPOPz8xWGH6wicdQmVEJWsmM6/mZLQkiBYVJFyvAwjv9OcMFbyq4uvSKwnWJufhDvlgruoZOUocDsVYpPcsWaLHUUBFBPb+SykFW4eDMp+wajE0s2dQxcK6OwL4iwckrZsDyGwpiiKoiiKoiiKoiiKoiiKoij45183XDssgvm+/AAAAABJRU5ErkJggg=="
                  : "data:image/png;base64,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"
              }
              alt="instagram-new"
              className="w-6 h-6 opacity-60 hover:opacity-100"
            />
          </a>
          <a href={profile?.linkedin} target="_blank" className="">
            <img
              src={
                theme === "light"
                  ? "data:image/png;base64,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"
                  : "data:image/png;base64,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"
              }
              alt="linkedin"
              className="w-5 h-5 opacity-60 hover:opacity-100"
            />
          </a>
          <a href={profile?.github} target="_blank">
            <img
              src={
                theme === "light"
                  ? "data:image/png;base64,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"
                  : "data:image/png;base64,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"
              }
              alt="github"
              className="w-5 h-5 opacity-60 hover:opacity-100"
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
