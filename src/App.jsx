import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/ui/tabs";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MailIcon, PhoneIcon, FileDownIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function PortfolioSite() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-pink-100 px-4 py-10 text-gray-800 font-sans">
      <section className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-sky-700">Aastha Mittal</h1>
          <p className="text-lg text-gray-600 mt-2">
            Software Engineer | AI + ML Enthusiast | Speaker
          </p>
          <div className="flex justify-center gap-6 mt-4 text-sky-600">
            <a href="mailto:aasthami@andrew.cmu.edu"><MailIcon className="w-5 h-5" /></a>
            <a href="tel:+16027069102"><PhoneIcon className="w-5 h-5" /></a>
            <a href="https://linkedin.com/in/aastha-mittal-cs" target="_blank"><FaLinkedin className="w-5 h-5" /></a>
            <a href="https://github.com/aasthami" target="_blank"><FaGithub className="w-5 h-5" /></a>
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <a href="https://linkedin.com/in/aastha-mittal-cs" target="_blank">
              <Button variant="outline" className="text-sky-700 border-sky-700">
                <FaLinkedin className="mr-2" /> LinkedIn
              </Button>
            </a>
            <a href="/resume.pdf" target="_blank">
              <Button variant="outline" className="text-pink-700 border-pink-700">
                <FileDownIcon className="mr-2 w-4 h-4" /> Resume
              </Button>
            </a>
          </div>
        </motion.div>

        <Tabs defaultValue="experience">
          <TabsList className="flex justify-center gap-4 mb-8">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="activities">Extracurriculars</TabsTrigger>
          </TabsList>

          <TabsContent value="experience">
            <div className="grid gap-6">
              {[
                {
                  title: "Software Engineer Intern – Nationwide Insurance (2025)",
                  description:
                    "Building dashboards in Java, Angular & SQL to improve risk analysis for underwriters."
                },
                {
                  title: "Software Engineer Intern – Nationwide Insurance (2024)",
                  description:
                    "Streamlined defect logging with FullStory, wrote Java unit tests, and optimized Angular navigation."
                },
                {
                  title: "Software Engineer Intern – Axway Inc",
                  description:
                    "Built React UI components for API management and worked with clients like Novartis and the US Government."
                },
                {
                  title: "Technical Intern – Paradise Valley Unified School District",
                  description:
                    "Built ML models in GCP BigQuery and TensorFlow to analyze educational performance and climate impact."
                }
              ].map((exp, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold text-sky-800">{exp.title}</h3>
                    <p className="text-gray-700 mt-1">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="grid gap-6">
              {[
                {
                  title: "MedEase: Healthcare Made Easy",
                  description:
                    "Multilingual chatbot with CDC data + Azure ML + Firebase for secure translation and symptom analysis."
                },
                {
                  title: "FitForm Analyzer",
                  description:
                    "Python-based posture tool using cosine similarity to provide real-time workout feedback."
                },
                {
                  title: "Racial Bias in Criminal Justice System",
                  description:
                    "Facial detection model using TensorFlow with mentorship from Brown University."
                }
              ].map((project, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold text-pink-700">{project.title}</h3>
                    <p className="text-gray-700 mt-1">{project.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="skills">
            <Card>
              <CardContent className="p-4">
                <p className="text-gray-800">
                  <b>Languages:</b> Python, C, Java, JavaScript, HTML/CSS, SML, SQL<br />
                  <b>Technologies:</b> React, Angular, TensorFlow, Firebase, GCP, AWS, BigQuery, JUnit, GitHub<br />
                  <b>Certifications:</b> Python Developer, Java Developer, JS, Software Dev, Databases
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities">
            <div className="grid gap-6">
              {[
                "Jane Street Discovery Day (NCWIT Winner)",
                "CMU Quant Club – Member",
                "CMU ScottyLabs (CMU Maps) – Developer",
                "CMU Hindu Yuva – Outreach Head",
                "Speaker – Talks on Women in Tech and EdTech since 2020"
              ].map((act, i) => (
                <Card key={i}>
                  <CardContent className="p-4 text-gray-700">{act}</CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
