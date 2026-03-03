export default function Header({ profile }) {
  return (
    <header className="header">
      <h1>{profile?.full_name || "Your Name"}</h1>
      <p className="title">{profile?.title || "Your Title"}</p>
      <p className="about">{profile?.about}</p>
    </header>
  );
}