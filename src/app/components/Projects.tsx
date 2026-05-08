import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { ExternalLink, Github } from "lucide-react";

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      title: "Сайт Окуу-китеби",
      description: "Разработала образовательную платформу с интеграцией интерактивных карт и анимированных национальных элементов, обеспечив удобный доступ к цифровым учебникам и отчетности через модульную архитектуру на React",
      tech: ["React", "TypeScript", "Redux"],
      gradient: "from-blue-500 to-cyan-500",
   // твоя ссылка
      github: "#",
      demo: "https://okuukitebi.edu.kg/",
    },
    {
      title: "Demon",
      description: "Проект представляет собой интерактивное веб-приложение на чистом JavaScript, демонстрирующее навыки работы асинхронными данными, валидацией через регулярные выражения и сложной анимацией на HTML5 Canvas.",
      tech: ["JavaScript", "HTML5", "SCSS"],
      gradient: "from-purple-500 to-pink-500",
      github: "https://github.com/1rayazh/demon.git", // твоя ссылка
      demo: "#", // твоя ссылка

    }
  ];

  return (
    <section id="projects" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Мои проекты
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="h-full bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl p-6 backdrop-blur-sm border border-purple-500/30 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <motion.div
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`}
                />

                <div className="relative z-10">
                  {/* Project number */}
                  <motion.div
                    animate={{
                      scale: hoveredIndex === index ? 1.2 : 1,
                    }}
                    className="text-6xl font-bold text-purple-500/20 mb-4"
                  >
                    0{index + 1}
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 mb-4 min-h-[60px]">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300 border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
                    >
                      <Github size={20} />
                      <span>Code</span>
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
                    >
                      <ExternalLink size={20} />
                      <span>Demo</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
