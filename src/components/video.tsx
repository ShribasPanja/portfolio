export default function Video() {
  return (
    <video
      className="w-full h-full object-cover"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/video/home.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
