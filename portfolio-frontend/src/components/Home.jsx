import { useEffect, useState } from "react";
import { api } from "../lib/api";

import Header from "../components/Header";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Footer from "../components/Footer";

import "../styles/Home.scss";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/home")
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">Loading...</div>;
  if (!data) return <div className="container">No data</div>;

  const { profile, skills, projects, experiences } = data;

  return (
    <div className="container">
      <Header profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experiences={experiences} />
      <Footer profile={profile} />
    </div>
  );
}