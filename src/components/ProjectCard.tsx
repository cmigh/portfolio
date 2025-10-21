import React from "react";
import { motion } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Props {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<Props> = ({ project, onClick }) => {
  return (
    <motion.div
      className="project-card"
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={project.image}
        alt={project.title}
        className="project-image"
        loading="lazy"
      />
      <div className="project-info">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    </motion.div>
  );
};

export default React.memo(ProjectCard);
