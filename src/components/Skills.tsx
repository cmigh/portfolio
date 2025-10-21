import React from "react";
import "./Skills.scss";

const skills = [
  "WordPress",
  "ACF",
  "MW WP Form",
  "WPML",
  "SEO",
  "Google Maps API",
  "LCP改善",
  "PHP",
  "JavaScript",
];

const Skills: React.FC = () => {
  // スキルリストを2回繰り返して無限スクロール風に
  const repeatedSkills = [...skills, ...skills];

  return (
    <section id="skills">
      <h2>私のスキル、特長</h2>
      <p className="skills-desc">
        ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入りますここにテキストが入りますここにテキストが入りますここにテキストが入ります
      </p>
      <div className="skills-slider">
        <div className="skills-track">
          {repeatedSkills.map((skill, index) => (
            <span className="skill" key={index}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
