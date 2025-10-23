import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "./components/Header";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import PR from "./components/PR";
import Footer from "./components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/main.scss";

const App: React.FC = () => {
  React.useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  return (
    <>
      <Helmet>
        <title>My Portfolio</title>
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex" />
      </Helmet>

      <div className="App">
        <Header />
        <Skills />
        <Projects />
        <PR />
        <Footer />
      </div>
    </>
  );
};

export default App;
