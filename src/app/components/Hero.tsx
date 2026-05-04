// 1. Исправляем импорт (из 'framer-motion' вместо 'motion/react' для стабильности типов)
import { motion, Variants } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
  // 2. Добавляем тип Variants. Это уберет ошибку с staggerChildren
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // 3. Добавляем тип Variants здесь. Это исправит ошибку "ease: string"
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" // Теперь TS понимает, что это валидный тип Easing
      }
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Анимированный фон */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-500/10"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 border border-purple-500/30">
            Доступен для работы
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-white mb-4"
        >
          Привет, я{' '}
          <motion.span
            className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
          >
            Rayana Frontend
          </motion.span>
          <br />
          Разработчик
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Создаю современные веб-приложения с фокусом на UX/UI и производительность
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4 mb-12"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold"
          >
            Связаться
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-purple-500 rounded-full text-white font-semibold hover:bg-purple-500/10"
          >
            Мои проекты
          </motion.a>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center gap-6">
          {[
            { Icon: Github, href: '#' },
            { Icon: Linkedin, href: '#' },
            { Icon: Mail, href: '#contact' },
          ].map(({ Icon, href }, index) => (
            <motion.a
              key={index}
              href={href}
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <Icon size={28} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="text-purple-400" size={40} />
      </motion.div>
    </section>
  );
}