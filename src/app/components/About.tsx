import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Code2, Rocket, Users, Award } from "lucide-react";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    { icon: Code2, value: "10+", label: "Проектов" },
    { icon: Rocket, value: "1+", label: "Лет опыта" },
    { icon: Users, value: "10+", label: "Клиентов" },
    { icon: Award, value: "3+", label: "Наград" },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-20 px-4">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            О себе
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              Я Rayana увлеченный Frontend разработчик с опытом создания современных и
              отзывчивых веб-сайтов. Моя специализация включает React, TypeScript,
              и современные CSS фреймворки.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Я стремлюсь к созданию не просто красивых интерфейсов, но и
              высокопроизводительных приложений с превосходным пользовательским опытом.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Постоянно изучаю новые технологии и подходы к разработке, чтобы
              создавать решения, которые действительно работают для пользователей.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/30">
              <h3 className="text-2xl font-bold text-white mb-6">Основные навыки</h3>
              <ul className="space-y-3">
                {[
                  'React & Next.js',
                  'TypeScript & JavaScript',
                  'Tailwind CSS & Styled Components',
                  'State Management (Redux, Zustand)',
                  'REST API & GraphQL',
                  'Git & CI/CD',
                ].map((skill, index) => (
                  <motion.li
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center text-gray-300"
                  >
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-xl p-6 text-center border border-purple-500/30 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="inline-block mb-3"
              >
                <Icon className="text-purple-400" size={32} />
              </motion.div>
              <div className="text-3xl font-bold text-white mb-1">{value}</div>
              <div className="text-gray-400">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
