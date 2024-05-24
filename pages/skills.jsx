import Footer from "../components/Footer";
import SkillsBanner from "../components/skills/banner";
import SkillsCards from "../components/skills/skillsCards";

const skill = () => {
  return (
    <div className="Home-Page -z-10">
      <SkillsBanner />
      <SkillsCards/>
      <Footer />
    </div>
  );
};

export default skill;
