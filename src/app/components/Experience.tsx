import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const experiences = [
    {
      type: "work",
      title: "Frontend Developer",
      company: "Geeks",
      period: "2026 - Настоящее время",
      description: "Разработка сайта Окуу-китеби, где я являлась тимлидом, отвечая за полную реализацию проекта.",
      achievements: [
        "Внедрение modern CI/CD pipeline",
        "Руководство командой из 4 разработчиков",
         "Успешный запуск проекта, где получила диплом и сертификат с отличием",
      ],
    },
    {
      type: "education",
      title: "Frontend Developer",
      company: "Geeks",
      period: "2024 - 2025",
      description: "Учеба на курсе Frontend разработчика, освоение React, TypeScript и современных инструментов разработки.",
      achievements: [
        "Успешная реализация проектов",
        "Отличные оценки и отзывы от преподавателей",
        "Получение сертификата с отличием",
      ],
    },
    {
      type: "education",
      title: "Бакалавр Инфокоммуникационных Технологий",
      company: "Технический Университет",
      period: "2022 - 2026",
      description: "Специализация создании ",
      achievements: [
        "Диплом с отличием",
        "Олимпиада по математике, учеба в Питере по программе акадеического обмена",
        "Завышенная стипендия за академические успехи",
      ],
    },
  ];

  return (
    <section id="experience" className="min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Опыт работы
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <motion.div
                  whileHover={{ scale: 1.5 }}
                  className="absolute left-8 md:left-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-slate-950 z-10 transform -translate-x-1/2"
                />

                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-16 md:pl-0`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl p-6 backdrop-blur-sm border border-purple-500/30"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${
                        exp.type === 'work'
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-pink-500/20 text-pink-400'
                      }`}>
                        {exp.type === 'work' ? <Briefcase size={24} /> : <GraduationCap size={24} />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {exp.title}
                        </h3>
                        <div className="text-purple-400 font-semibold mb-1">
                          {exp.company}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {exp.period}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">
                      {exp.description}
                    </p>

                    <div className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: index * 0.2 + i * 0.1 }}
                          className="flex items-start gap-2 text-gray-300"
                        >
                          <span className="text-purple-400 mt-1">→</span>
                          <span>{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
