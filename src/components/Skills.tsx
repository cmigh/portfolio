import React from "react";
import "./Skills.scss";

const skills = [
  "WordPress",
  "サイト多言語化",
  "ACF",
  "MW WP Form",
  "WPML",
  "SEO",
  "Google Maps API",
  "サイト速度改善",
  "構造化データ",
  "リッチテキスト",
  "PHP",
  "JavaScript",
  "React",
  "TypeScript",
];

const Skills: React.FC = () => {
  // スキルリストを2回繰り返して無限スクロール風に
  const repeatedSkills = [...skills, ...skills];

  return (
    <section id="skills">
      <h2>私のスキル、特長</h2>
      <p className="skills-desc">
        HTML / JavaScript / PHP / MySQL / React勉強中 / TypeScript勉強中 / JSON
        / GAS
        <br />
        Github / Visual Studio Code / Notion / Slack / Photoshop / Illustrator /
        Indesign / Figma / CLIP STUDIO PAINT
        <br />
        前職では広告制作会社のDTPオペレーターとして、チラシやポスターのデザインをしており、今の会社では最初の1年半はWEBデザイナーとしてデザイン業務に携わっていました。
        <br />
        2年目〜3年目の頃にエンジニアとしてサイトの構築業務に転向し、6年目に入る現在はWordpressのテーマのカスタムやプラグインの作成、その他PHPでの開発業務に携わっています。
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
