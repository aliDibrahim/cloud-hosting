const About = () => {
  return (
    <section className="min-h-screen bg-gray-50 flex items-center">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            About Our Platform
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            A modern publishing platform built to help creators share ideas,
            write meaningful articles, and connect with readers around the
            world.
          </p>
        </div>

        {/* Content */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              ✍️ Built for Writers
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Focus on what matters most — writing. Our platform gives you a
              clean and distraction-free experience to create, edit, and manage
              your articles with ease.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              ⚡ Fast & Modern
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Built with modern technologies like Next.js and TypeScript to
              ensure fast performance, reliability, and a smooth user
              experience across all devices.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              🔒 Secure & Scalable
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Your content is protected with secure APIs and scalable
              architecture, making it easy to grow from a personal blog to a
              large publishing platform.
            </p>
          </div>
        </div>

        {/* Footer text */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-base">
            Our mission is to empower creators by providing simple tools and a
            powerful platform for sharing knowledge and stories.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
