import FuzzyOverlayExample from "./components/hero";
import GlassNavigation from "./components/navbar";
import CollapseCardFeatures from "./components/slide";
import SwapColumnFeatures from "./components/column";
import { HoverImageLinks } from "./components/end";
import DoubleScrollingLogos from "./components/team";

const Home = () => {
  return (
    <div className="bg-white" id="home">
      <GlassNavigation />
      <FuzzyOverlayExample />
      <CollapseCardFeatures />
      <SwapColumnFeatures />
      <DoubleScrollingLogos />
      <HoverImageLinks />
    </div>
  );
};

export default Home;
