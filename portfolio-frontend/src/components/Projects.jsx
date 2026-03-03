import ProjectCard from "./ProjectCard";

export default function Projects({ projects }) {
  return (
    <section className="section projects-section">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects?.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}