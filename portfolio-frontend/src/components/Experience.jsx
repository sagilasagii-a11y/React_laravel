export default function ExperienceCard({ experience }) {
  return (
    <div className="card experience-card">
      <b>{experience.role}</b> — {experience.company}
      <div className="small-text">
        {experience.start_date} - {experience.end_date}{" "}
        {experience.location ? `| ${experience.location}` : ""}
      </div>
      <p className="description">{experience.details}</p>
    </div>
  );
}