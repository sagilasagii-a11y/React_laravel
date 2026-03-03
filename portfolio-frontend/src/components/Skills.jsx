import SkillCard from "./SkillCard";

export default function Skills({ skills }) {
  return (
    <section className="section skills-section">
      <h2>Skills</h2>
      <div className="skills-grid">
        {skills?.map((s) => (
          <SkillCard key={s.id} skill={s} />
        ))}
      </div>
    </section>
  );
}