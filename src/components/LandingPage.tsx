import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col justify-center items-center text-textPrimary">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-sans font-bold text-primary mb-4">
          Welcome to Our Platform
        </h1>
        <p className="text-xl font-body font-semibold text-secondary">
          Empowering projects and building a brighter future together.
        </p>
      </header>

      <main className="flex flex-col lg:flex-row justify-around items-center w-full px-5 space-y-6 lg:space-y-0">
        <section className="max-w-md p-6 bg-card shadow-lg rounded-lg">
          <h2 className="text-3xl font-sans font-semibold text-black mb-3">
            Why Choose Us?
          </h2>
          <p className="text-base font-body text-textSecondary">
            We bring transparency, security, and innovation to crowdfunding.
          </p>
        </section>

        <section className="max-w-md p-6 bg-card shadow-lg rounded-lg">
          <h2 className="text-3xl font-sans font-semibold text-black  mb-3">
            Featured Projects
          </h2>
          <p className="text-base font-body text-textSecondary">
            Discover projects that are shaping the future.
          </p>
        </section>
      </main>

      <div className="mt-12 flex space-x-4">
        <Link to="/login" className="bg-primary hover:bg-hoverPrimary text-card font-body font-bold py-3 px-6 rounded-lg shadow-lg">
          Start
        </Link>
        <Link to="/home" className="bg-primary hover:bg-hoverSecondary text-card font-body font-bold py-3 px-6 rounded-lg shadow-lg">
          Campaigns
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
