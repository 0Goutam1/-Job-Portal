import Hero from "../component/Hero";
import Categories from "../component/Categories";
import FeaturedJobs from "../component/FeaturedJobs";
import Companies from "../component/Companies";
import Statistics from "../component/Statistics";
import Testimonials from "../component/Testimonials";

const Home = () => {
  return (
    <main>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Popular Categories */}
      <Categories />

      {/* 3. Featured Jobs */}
      <FeaturedJobs />

      {/* 4. Top Corporate Partners */}
      <Companies />

      {/* 5. Counter Metrics */}
      <Statistics />

      {/* 6. Candidate Testimonials */}
      <Testimonials />
    </main>
  );
};

export default Home;
