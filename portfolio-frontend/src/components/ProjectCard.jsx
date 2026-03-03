export default function ProjectCard({ project }) {
  return (
    <div className="card project-card">
      <b>{project.title}</b>
      <p className="description">{project.description}</p>
      <div className="small-text">{project.tech_stack}</div>
      <div className="links">
        {project.demo_url && (
          <a href={project.demo_url} target="_blank" rel="noreferrer">
            Demo
          </a>
        )}
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noreferrer">
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}