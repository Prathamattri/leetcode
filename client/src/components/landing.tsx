import image from "../assets/bg-large.jpg";

export default function landing() {
  const rootStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    minHeight: "100vh",
    width: "100vw",
  };
  return (
    <div style={rootStyle}>
      <h1>LeetCode</h1>
    </div>
  );
}
