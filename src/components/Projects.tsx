import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import Modal from "./Modal";

import work1 from "../assets/images/work1.jpg";
import work2 from "../assets/images/work2.jpg";
import work3 from "../assets/images/work3.jpg";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
  details: string;
  codeSnippet?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "観光サイト開発",
    description: "WordPressを使った地域観光サイト構築",
    image: work1,
    link: "https://example.com/tourism-site",
    details: "WPML対応・Google Maps連携",
    codeSnippet: `const fetchData = async () => {
  const res = await fetch("/api/spots");
  return res.json();
};`,
  },
  {
    id: 2,
    title: "企業コーポレートサイト",
    description: "Next.jsベースの企業サイト",
    image: work2,
    link: "https://example.com/corporate",
    details: "画像最適化・SEO対策",
    codeSnippet: `export async function getStaticProps() {
  return { props: { data: await fetchData() } };
}`,
  },
  {
    id: 3,
    title: "地方自治体ポータル",
    description: "複数部署のニュース統合サイト",
    image: work3,
    link: "https://example.com/local-gov",
    details: "REST API + Vue.js SPA",
    codeSnippet: `fetch("/api/news")
  .then(res => res.json())
  .then(console.log);`,
  },
  {
    id: 4,
    title: "地方自治体ポータル",
    description: "複数部署のニュース統合サイト",
    image: work3,
    link: "https://example.com/local-gov",
    details: "REST API + Vue.js SPA",
    codeSnippet: `fetch("/api/news")
  .then(res => res.json())
  .then(console.log);
  const fetchData = async () => {
  const res = await fetch("/api/spots");
  return res.json();
};
const fetchData = async () => {
  const res = await fetch("/api/spots");
  return res.json();
};
const fetchData = async () => {
  const res = await fetch("/api/spots");
  return res.json();
};
const fetchData = async () => {
  const res = await fetch("/api/spots");
  return res.json();
};
  `,
  },
  {
    id: 5,
    title: "地方自治体ポータル",
    description: "複数部署のニュース統合サイト",
    image: work3,
    link: "https://example.com/local-gov",
    details: "REST API + Vue.js SPA",
    codeSnippet: `fetch("/api/news")
  .then(res => res.json())
  .then(console.log);`,
  },
  {
    id: 6,
    title: "地方自治体ポータル",
    description: "複数部署のニュース統合サイト",
    image: work3,
    link: "https://example.com/local-gov",
    details: "REST API + Vue.js SPA",
    codeSnippet: `fetch("/api/news")
  .then(res => res.json())
  .then(console.log);`,
  },
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section className="projects" id="projects">
      <h2 className="section-title">制作実績</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <Modal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
