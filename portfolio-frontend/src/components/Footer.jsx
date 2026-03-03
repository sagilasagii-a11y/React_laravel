export default function Footer({ profile }) {
  return (
    <footer className="footer">
      <div>Email: {profile?.email}</div>
      <div>Phone: {profile?.phone}</div>
      <div>Location: {profile?.location}</div>
    </footer>
  );
}