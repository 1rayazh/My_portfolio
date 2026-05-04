import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "HTML5 & SCSS", level: 85 },
        { name: "Адаптивная верстка", level: 92 },
      ],
    },
    {
      category: "State Management",
      skills: [
        { name: "Redux", level: 88 },
        { name: "Zustand", level: 85 },
        { name: "React Query", level: 82 },
        { name: "React Hook Form", level: 90 },
      ],
    },
    {
      category: "Tools & Others",
      skills: [
        { name: "Git & GitHub/GitLab", level: 90 },
        { name: "REST API & Axios", level: 80 },
        { name: "Vite", level: 88 },
        { name: "JWT & Auth", level: 75 },
      ],
    },
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Технические навыки
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
              className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl p-6 backdrop-blur-sm border border-purple-500/30"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                {category.category}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-purple-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.2 + skillIndex * 0.1,
                          ease: "easeOut",
                        }}
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Технологический стек
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              'React', 'TypeScript', 'Next.js', 'Redux',
              'JavaScropt', 'Zustand', 'Git', 'Vite', 'Scss', 'React Query'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1 + index * 0.05 }}
                whileHover={{
                  scale: 1.2,
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 },
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full border border-purple-500/30 text-white backdrop-blur-sm cursor-pointer"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
