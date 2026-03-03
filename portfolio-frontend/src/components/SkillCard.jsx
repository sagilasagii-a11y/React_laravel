export default function SkillCard({ skill }) {
  return (
    <div className="card skill-card">
      <b>{skill.name}</b>
      <div className="small-text">{skill.description}</div>
      <div className="level">
        Level: <b>{skill.level}%</b>
      </div>
    </div>
  );
}