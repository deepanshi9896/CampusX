// Single static hero image (no slideshow/carousel) - a "party" vibe photo
function Hero() {
  return (
    <section className="hero">
      <img
        className="hero-image"
        src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&q=80"
        alt="Campus event crowd"
      />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-tag">✦ DISCOVER YOUR CAMPUS</span>
        <h1 className="hero-title">
          FIND YOUR CREW, <span>FIND YOUR CLUBS.</span>
        </h1>
        <p className="hero-desc">
          Discover clubs, meet new people, and find events that match your
          interests.
        </p>
      </div>
    </section>
  );
}

export default Hero;
