import { Link } from 'react-router-dom'; 

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-r from-black via-gray-800 to-darkgray min-h-screen flex flex-col justify-center items-center text-white">
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-2">Welcome to Our Platform</h1>
        <p className="text-xl">Empowering projects and building a brighter future together.</p>
      </header>

      <main className="flex flex-wrap justify-around w-full px-5">
        <section className="max-w-md p-6 space-y-4">
          <h2 className="text-3xl font-semibold">Why Choose Us?</h2>
          <p className="text-lg">We bring transparency, security, and innovation to crowdfunding.</p>
        </section>

        <section className="max-w-md p-6 space-y-4">
          <h2 className="text-3xl font-semibold">Featured Projects</h2>
          <p className="text-lg">Discover projects that are shaping the future.</p>
        </section>
      </main>

      {/* Start Button */}
      <div className="mt-12">
        <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Start
        </Link>
      </div>

      <div className="mt-12">
        <Link to="/home" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Campaigns
        </Link>
      </div>

      <footer className="mt-12">
        <p>&copy; 2024 Decentralized Crowdfunding Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
