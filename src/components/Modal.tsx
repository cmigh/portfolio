import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./Modal.scss";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
  details: string;
  codeSnippet?: string;
}

interface Props {
  project: Project | null;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button className="close-button" onClick={onClose}>
            ×
          </button>

          <img src={project.image} alt={project.title} />
          <h3>{project.title}</h3>
          <p>{project.details}</p>

          {project.codeSnippet && (
            <SyntaxHighlighter language="typescript" style={oneDark}>
              {project.codeSnippet}
            </SyntaxHighlighter>
          )}

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="view-link"
            >
              公開サイトを見る
            </a>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
