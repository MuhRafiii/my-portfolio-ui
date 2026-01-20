import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/services/api";
import type { Profile } from "@/types/profile";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export function Profile() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const [form, setForm] = useState<Profile>({
    name: "",
    title: "",
    about: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    instagram: "",
    github: "",
    resume: "",
  });

  const fetchProfile = async () => {
    try {
      const res = await api.get("/profile");
      setForm(res.data.data);
      setPhotoPreview(res.data.data.photo);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Failed to load profile",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    setFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("title", form.title);
      formData.append("about", form.about);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("address", form.address);
      formData.append("linkedin", form.linkedin);
      formData.append("instagram", form.instagram);
      formData.append("github", form.github);
      formData.append("resume", form.resume);

      if (file) {
        formData.append("photo", file);
      }

      await api.put("/profile", formData);

      await Swal.fire({
        icon: "success",
        title: "Profile updated",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchProfile();
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border"
              />
            )}

            <div className="space-y-1">
              <Label>Photo Profile</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="max-w-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <Label>Title</Label>
              <Input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <Label>Phone</Label>
              <Input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-1">
              <Label>Address</Label>
              <Input
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="lg:col-span-2"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label>About</Label>
            <Textarea
              name="about"
              placeholder="About"
              value={form.about}
              onChange={handleChange}
              className="min-h-30"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>LinkedIn</Label>
              <Input
                name="linkedin"
                placeholder="LinkedIn"
                value={form.linkedin}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <Label>Instagram</Label>
              <Input
                name="instagram"
                placeholder="Instagram"
                value={form.instagram}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <Label>Github</Label>
              <Input
                name="github"
                placeholder="Github"
                value={form.github}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1">
              <Label>Resume URL</Label>
              <Input
                name="resume"
                placeholder="Resume URL"
                value={form.resume}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
