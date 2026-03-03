import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { useNavigate } from "react-router-dom";

const TABS = ["Profile", "Skills", "Projects", "Experiences"];

const inputStyle = { padding: "8px 10px", borderRadius: 6, border: "1px solid #ccc", fontSize: 14, width: "100%", boxSizing: "border-box" };
const btnStyle = { padding: "8px 16px", borderRadius: 6, border: "none", background: "#646cff", color: "#fff", cursor: "pointer", fontSize: 14 };
const dangerBtn = { ...btnStyle, background: "#e53935" };
const cardStyle = { border: "1px solid #ddd", borderRadius: 10, padding: 14, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 };

// ─── Profile Tab ─────────────────────────────────────────────────────────────
function ProfileTab() {
  const empty = { full_name: "", title: "", about: "", email: "", phone: "", location: "", github_url: "", linkedin_url: "", cv_url: "" };
  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get("/admin/profile").then((r) => { if (r.data) setForm(r.data); }).catch(() => {});
  }, []);

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setMsg("");
    await api.post("/admin/profile", form);
    setMsg("Profile saved!");
  };

  return (
    <div>
      <h3>Profile</h3>
      <form onSubmit={save} style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
        <input style={inputStyle} value={form.full_name} onChange={f("full_name")} placeholder="Full Name" required />
        <input style={inputStyle} value={form.title} onChange={f("title")} placeholder="Title" />
        <input style={inputStyle} value={form.email} onChange={f("email")} placeholder="Email" />
        <input style={inputStyle} value={form.phone} onChange={f("phone")} placeholder="Phone" />
        <input style={inputStyle} value={form.location} onChange={f("location")} placeholder="Location" />
        <input style={inputStyle} value={form.github_url} onChange={f("github_url")} placeholder="GitHub URL" />
        <input style={inputStyle} value={form.linkedin_url} onChange={f("linkedin_url")} placeholder="LinkedIn URL" />
        <input style={inputStyle} value={form.cv_url} onChange={f("cv_url")} placeholder="CV URL" />
        <textarea style={{ ...inputStyle, gridColumn: "1 / -1", minHeight: 90 }} value={form.about} onChange={f("about")} placeholder="About" />
        <button style={{ ...btnStyle, gridColumn: "1 / -1" }} type="submit">Save Profile</button>
      </form>
      {msg && <p style={{ color: "green" }}>{msg}</p>}
    </div>
  );
}

// ─── Skills Tab ──────────────────────────────────────────────────────────────
function SkillsTab() {
  const emptySkill = { name: "", icon: "", level: 50, description: "", sort_order: 0 };
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(emptySkill);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState("");

  const load = () => api.get("/admin/skills").then((r) => setSkills(r.data));
  useEffect(() => { load(); }, []);

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setMsg("");
    const payload = { ...form, level: Number(form.level), sort_order: Number(form.sort_order) };
    if (editing) {
      const r = await api.put(`/admin/skills/${editing}`, payload);
      setSkills(skills.map((s) => (s.id === editing ? r.data : s)));
      setMsg("Skill updated!");
    } else {
      const r = await api.post("/admin/skills", payload);
      setSkills([r.data, ...skills]);
      setMsg("Skill added!");
    }
    setForm(emptySkill);
    setEditing(null);
  };

  const edit = (s) => { setForm(s); setEditing(s.id); };
  const del = async (id) => { await api.delete(`/admin/skills/${id}`); setSkills(skills.filter((s) => s.id !== id)); };
  const cancel = () => { setForm(emptySkill); setEditing(null); };

  return (
    <div>
      <h3>{editing ? "Edit Skill" : "Add Skill"}</h3>
      <form onSubmit={save} style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
        <input style={inputStyle} value={form.name} onChange={f("name")} placeholder="Name" required />
        <input style={inputStyle} value={form.icon} onChange={f("icon")} placeholder="Icon class (optional)" />
        <input style={inputStyle} value={form.level} type="number" min="0" max="100" onChange={f("level")} placeholder="Level (0-100)" />
        <input style={inputStyle} value={form.sort_order} type="number" onChange={f("sort_order")} placeholder="Sort Order" />
        <textarea style={{ ...inputStyle, gridColumn: "1 / -1" }} value={form.description} onChange={f("description")} placeholder="Description" />
        <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10 }}>
          <button style={btnStyle} type="submit">{editing ? "Update" : "Add"} Skill</button>
          {editing && <button style={{ ...btnStyle, background: "#888" }} type="button" onClick={cancel}>Cancel</button>}
        </div>
      </form>
      {msg && <p style={{ color: "green" }}>{msg}</p>}
      <h3 style={{ marginTop: 20 }}>Skills ({skills.length})</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {skills.map((s) => (
          <div key={s.id} style={cardStyle}>
            <div>
              <b>{s.name}</b> — {s.level}%
              <div style={{ fontSize: 12, opacity: 0.7 }}>{s.description}</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button style={{ ...btnStyle, background: "#fb8c00" }} onClick={() => edit(s)}>Edit</button>
              <button style={dangerBtn} onClick={() => del(s.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Projects Tab ────────────────────────────────────────────────────────────
function ProjectsTab() {
  const emptyProject = { title: "", description: "", tech_stack: "", demo_url: "", github_url: "", image_url: "", sort_order: 0 };
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState("");

  const load = () => api.get("/admin/projects").then((r) => setProjects(r.data));
  useEffect(() => { load(); }, []);

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setMsg("");
    const payload = { ...form, sort_order: Number(form.sort_order) };
    if (editing) {
      const r = await api.put(`/admin/projects/${editing}`, payload);
      setProjects(projects.map((p) => (p.id === editing ? r.data : p)));
      setMsg("Project updated!");
    } else {
      const r = await api.post("/admin/projects", payload);
      setProjects([r.data, ...projects]);
      setMsg("Project added!");
    }
    setForm(emptyProject);
    setEditing(null);
  };

  const edit = (p) => { setForm(p); setEditing(p.id); };
  const del = async (id) => { await api.delete(`/admin/projects/${id}`); setProjects(projects.filter((p) => p.id !== id)); };
  const cancel = () => { setForm(emptyProject); setEditing(null); };

  return (
    <div>
      <h3>{editing ? "Edit Project" : "Add Project"}</h3>
      <form onSubmit={save} style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
        <input style={{ ...inputStyle, gridColumn: "1 / -1" }} value={form.title} onChange={f("title")} placeholder="Title" required />
        <input style={inputStyle} value={form.tech_stack} onChange={f("tech_stack")} placeholder="Tech Stack (e.g. React, Laravel)" />
        <input style={inputStyle} value={form.sort_order} type="number" onChange={f("sort_order")} placeholder="Sort Order" />
        <input style={inputStyle} value={form.demo_url} onChange={f("demo_url")} placeholder="Demo URL" />
        <input style={inputStyle} value={form.github_url} onChange={f("github_url")} placeholder="GitHub URL" />
        <input style={{ ...inputStyle, gridColumn: "1 / -1" }} value={form.image_url} onChange={f("image_url")} placeholder="Image URL" />
        <textarea style={{ ...inputStyle, gridColumn: "1 / -1", minHeight: 80 }} value={form.description} onChange={f("description")} placeholder="Description" />
        <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10 }}>
          <button style={btnStyle} type="submit">{editing ? "Update" : "Add"} Project</button>
          {editing && <button style={{ ...btnStyle, background: "#888" }} type="button" onClick={cancel}>Cancel</button>}
        </div>
      </form>
      {msg && <p style={{ color: "green" }}>{msg}</p>}
      <h3 style={{ marginTop: 20 }}>Projects ({projects.length})</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {projects.map((p) => (
          <div key={p.id} style={cardStyle}>
            <div>
              <b>{p.title}</b>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{p.tech_stack}</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>{p.description}</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button style={{ ...btnStyle, background: "#fb8c00" }} onClick={() => edit(p)}>Edit</button>
              <button style={dangerBtn} onClick={() => del(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Experiences Tab ─────────────────────────────────────────────────────────
function ExperiencesTab() {
  const emptyExp = { company: "", role: "", location: "", start_date: "", end_date: "", details: "", sort_order: 0 };
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState(emptyExp);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState("");

  const load = () => api.get("/admin/experiences").then((r) => setExperiences(r.data));
  useEffect(() => { load(); }, []);

  const f = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    setMsg("");
    const payload = { ...form, sort_order: Number(form.sort_order) };
    if (editing) {
      const r = await api.put(`/admin/experiences/${editing}`, payload);
      setExperiences(experiences.map((ex) => (ex.id === editing ? r.data : ex)));
      setMsg("Experience updated!");
    } else {
      const r = await api.post("/admin/experiences", payload);
      setExperiences([r.data, ...experiences]);
      setMsg("Experience added!");
    }
    setForm(emptyExp);
    setEditing(null);
  };

  const edit = (ex) => { setForm(ex); setEditing(ex.id); };
  const del = async (id) => { await api.delete(`/admin/experiences/${id}`); setExperiences(experiences.filter((ex) => ex.id !== id)); };
  const cancel = () => { setForm(emptyExp); setEditing(null); };

  return (
    <div>
      <h3>{editing ? "Edit Experience" : "Add Experience"}</h3>
      <form onSubmit={save} style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
        <input style={inputStyle} value={form.company} onChange={f("company")} placeholder="Company" required />
        <input style={inputStyle} value={form.role} onChange={f("role")} placeholder="Role / Position" required />
        <input style={inputStyle} value={form.location} onChange={f("location")} placeholder="Location" />
        <input style={inputStyle} value={form.sort_order} type="number" onChange={f("sort_order")} placeholder="Sort Order" />
        <input style={inputStyle} value={form.start_date} onChange={f("start_date")} placeholder="Start Date (e.g. Jan 2022)" />
        <input style={inputStyle} value={form.end_date} onChange={f("end_date")} placeholder="End Date (e.g. Present)" />
        <textarea style={{ ...inputStyle, gridColumn: "1 / -1", minHeight: 80 }} value={form.details} onChange={f("details")} placeholder="Details / Responsibilities" />
        <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10 }}>
          <button style={btnStyle} type="submit">{editing ? "Update" : "Add"} Experience</button>
          {editing && <button style={{ ...btnStyle, background: "#888" }} type="button" onClick={cancel}>Cancel</button>}
        </div>
      </form>
      {msg && <p style={{ color: "green" }}>{msg}</p>}
      <h3 style={{ marginTop: 20 }}>Experiences ({experiences.length})</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {experiences.map((ex) => (
          <div key={ex.id} style={cardStyle}>
            <div>
              <b>{ex.role}</b> — {ex.company}
              <div style={{ fontSize: 12, opacity: 0.7 }}>{ex.start_date} - {ex.end_date} {ex.location ? `| ${ex.location}` : ""}</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>{ex.details}</div>
            </div>
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button style={{ ...btnStyle, background: "#fb8c00" }} onClick={() => edit(ex)}>Edit</button>
              <button style={dangerBtn} onClick={() => del(ex.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("Profile");

  useEffect(() => {
    if (!localStorage.getItem("token")) nav("/admin/login");
  }, []);

  const logout = async () => {
    try { await api.post("/auth/logout"); } catch {}
    localStorage.removeItem("token");
    nav("/admin/login");
  };

  return (
    <div style={{ padding: 16, maxWidth: 960, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
        <button style={dangerBtn} onClick={logout}>Logout</button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, borderBottom: "2px solid #ddd", paddingBottom: 0 }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...btnStyle,
              background: activeTab === tab ? "#646cff" : "transparent",
              color: activeTab === tab ? "#fff" : "inherit",
              border: "1px solid #ccc",
              borderBottom: activeTab === tab ? "2px solid #646cff" : "1px solid #ccc",
              borderRadius: "6px 6px 0 0",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Profile"     && <ProfileTab />}
      {activeTab === "Skills"      && <SkillsTab />}
      {activeTab === "Projects"    && <ProjectsTab />}
      {activeTab === "Experiences" && <ExperiencesTab />}
    </div>
  );
}