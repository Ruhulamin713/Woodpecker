import Footer from "../Footer/Footer";
import Reviews from "../Reviews/Reviews";
import Summery from "../Summery/Summery";
import Tools from "../Tools/Tools";
import Banner from "./Banner";

const Home = () => {
  return (
    <div className="bg-gray-200">
      <Banner />
      <Tools />
      <Summery />
      <Reviews />
      <Footer />
    </div>
  );
};

export default Home;
