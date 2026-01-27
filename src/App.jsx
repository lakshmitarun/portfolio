import { useState, useEffect } from "react"
import Nav from "./components/nav/nav"
import Introduction from "./components/introduction"
import About from "./components/about"
import Skills from "./components/skills"
import LeetCode from "./components/leetcode"
import Projects from "./components/projects"
import Achievements from "./components/achievements"
import Contact from "./components/contact"
import Footer from "./components/footer"
import { generateResumePDF } from "./utils/generateResumePDF"

// Resume Data
const resumeData = {
  name: "Palivela Lakshmi Tarun",
  email: "lakshmitaruntarungmail.com",
  phone: "6303474889",
  linkedin: "https://www.linkedin.com/in/lakshmi-tarun-palivela-010582292/",
  instagram: "https://www.instagram.com/single__boy__tarun__/",
  summary: "Motivated B.Tech student specializing in Artificial Intelligence and Data Science with hands-on experience in Machine Learning and Full Stack development. Passionate about building real-world projects and continuously improving technical and problem-solving skills. Currently pursuing 3rd year at Kakinada Institute of Engineering and Technology with CGPA 7.13.",
  skills: [
    {
      category: "Programming Languages",
      items: ["Python"]
    },
    {
      category: "Web Development",
      items: ["HTML", "CSS", "JavaScript", "React"]
    },
    {
      category: "Backend & Databases",
      items: ["Node.js", "MongoDB"]
    },
    {
      category: "Machine Learning",
      items: ["NumPy", "Pandas", "Scikit-learn"]
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "GitHub", "VS Code"]
    }
  ],
  projects: [
    {
      title: "Handwritten Digit Recognition",
      description: "A machine learning project that recognizes handwritten digits using the MNIST dataset. Built a classifier using Support Vector Machine (SVM) to accurately classify digits from 0 to 9.",
      tech: ["Python", "Machine Learning", "SVM", "MNIST"]
    },
    {
      title: "AI ChatBOT (HunterAI)",
      description: "An AI-based chatbot developed using APIs as part of the KHUB project task. The chatbot is designed to interact with users and provide intelligent responses.",
      tech: ["Python", "API Integration", "AI", "Chatbot"]
    }
  ],
  achievements: [
    {
      title: "Kabaddi Medal",
      description: "Won Kabaddi medal in 9th class at school level.",
      year: "School Level"
    },
    {
      title: "AI for Students: Build Your Own Generative AI Model",
      description: "Participated in workshop conducted by AI expert and IIT Delhi alumnus, Mr. Trivikrama. Certificate issued by NxtWave.",
      year: "2024"
    },
    {
      title: "Foundations of Modern Machine Learning (FMML)",
      description: "Completed one-year online course from iHub-Data, IIIT Hyderabad (27 July 2024 - 18 April 2025) with Grade A.",
      year: "2024-2025"
    },
    {
      title: "Python Full Stack Developer Virtual Internship",
      description: "Successfully completed 10 weeks internship from EduSkills Academy. Grade: A (Outstanding).",
      year: "2024"
    },
    {
      title: "AI-ML Virtual Internship",
      description: "Successfully completed 10 weeks internship from EduSkills supported by India Edu Program and Google for Developers. Grade: 0 (Outstanding).",
      year: "2025"
    },
    {
      title: "Android Developer Virtual Internship",
      description: "Successfully completed 10 weeks internship from EduSkills supported by India Edu Program and Google for Developers. Grade: E (Excellent).",
      year: "2025"
    },
    {
      title: "Java Full Stack Developer Virtual Internship",
      description: "Successfully completed 10 weeks internship from EduSkills Academy. Grade: O (Outstanding).",
      year: "2025"
    }
  ],
  education: [
    {
      degree: "B.Tech – CSE (AI & Data Science)",
      school: "Kakinada Institute of Engineering and Technology, Kakinada",
      details: "CGPA: 7.13 | 2023 – 2027 (Currently 3rd Year)"
    },
    {
      degree: "Intermediate (MPC)",
      school: "Sri Chaitanya Junior College, Kakinada",
      details: "Score: 772"
    },
    {
      degree: "10th Class",
      school: "St. Ann Gloria English Medium High School, Ramachandrapuram",
      details: "Score: 598"
    }
  ]
}


function App() {
  // Load theme from localStorage (or default dark)
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "light" ? false : true
  })

  // Apply theme to <html> and save it
  useEffect(() => {
    console.log("useEffect running, dark:", dark)
    if (dark) {
      document.documentElement.classList.add("dark")
      document.documentElement.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
      console.log("Added dark class, classList:", document.documentElement.classList)
    } else {
      document.documentElement.classList.remove("dark")
      document.documentElement.setAttribute("data-theme", "light")
      localStorage.setItem("theme", "light")
      console.log("Removed dark class, classList:", document.documentElement.classList)
    }
  }, [dark])

  return (
    <div
      className="
        min-h-screen
        bg-white text-black
        dark:bg-gray-950 dark:text-white
        transition-colors duration-300
      "
      style={{
        backgroundColor: dark ? "rgb(3, 7, 30)" : "white",
        color: dark ? "white" : "black"
      }}
    >
      <Nav dark={dark} setDark={setDark} onDownloadResume={() => generateResumePDF(resumeData)} />

      <main className="pt-24">
        <Introduction dark={dark} />
        <About dark={dark} />
        <Skills dark={dark} />
        <LeetCode dark={dark} />
        <Projects dark={dark} />
        <Achievements dark={dark} />
        <Contact dark={dark} />
      </main>

      <Footer dark={dark} />
    </div>
  )
}

export default App
