import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import styles from "../styles/Home.module.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/home")
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (!data) return <div className={styles.container}>No data</div>;

  const { profile, skills, projects, experiences } = data;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1>{profile?.full_name || "Your Name"}</h1>
        <p>{profile?.title || "Your Title"}</p>
        <p className={styles.about}>{profile?.about}</p>
      </header>

      {/* Sections (Skills, Projects, Experience) */}
      <section className={styles.section}>
        <h2>Skills</h2>
        <div className={styles.grid220}>
          {skills?.map((s) => (
            <div key={s.id} className={styles.card}>
              <b>{s.name}</b>
              <div className={styles.description}>{s.description}</div>
              <div className={styles.level}>Level: {s.level}%</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Projects</h2>
        <div className={styles.grid280}>
          {projects?.map((p) => (
            <div key={p.id} className={styles.card}>
              <b>{p.title}</b>
              <p className={styles.description}>{p.description}</p>
              <div className={styles.tech}>{p.tech_stack}</div>
              <div className={styles.links}>
                {p.demo_url && <a href={p.demo_url} target="_blank">Demo</a>}
                {p.github_url && <a href={p.github_url} target="_blank">GitHub</a>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Experience</h2>
        <div className={styles.grid}>
          {experiences?.map((e) => (
            <div key={e.id} className={styles.card}>
              <b>{e.role}</b> — {e.company}
              <div className={styles.description}>
                {e.start_date} - {e.end_date} {e.location ? `| ${e.location}` : ""}
              </div>
              <p>{e.details}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer with icons */}
      <footer className={styles.footer}>
        <div className={styles.socials}>
          {profile?.github && (
            <a href={profile.github} target="_blank" aria-label="GitHub">
              <FaGithub />
            </a>
          )}
          {profile?.linkedin && (
            <a href={profile.linkedin} target="_blank" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          )}
          {profile?.email && (
            <a href={`mailto:${profile.email}`} aria-label="Email">
              <FaEnvelope />
            </a>
          )}
        </div>
        <div>Email: {profile?.email}</div>
        <div>Phone: {profile?.phone}</div>
        <div>Location: {profile?.location}</div>
      </footer>
    </div>
  );
}