import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import emailjs from '@emailjs/browser';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const serviceId = 'service_bsmswme'; 
  const templateId = 'template_a5gk9vi'; 
  const publicKey = 'mFwU8HdI7nbSMcBo0';

  const templateParams = {
    // ВАЖНО: эти ключи должны быть такими же, как в шаблоне (from_name, message)
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_name: 'Rayana', 
  };

  emailjs.send(serviceId, templateId, templateParams, publicKey)
    .then(() => {
      alert('Ура! Сообщение отправлено на твой Gmail.');
      setFormData({ name: '', email: '', message: '' }); 
    })
    .catch((err: any) => { // Добавляем : any
      console.error('FAILED...', err);
      alert('Произошла ошибка. Попробуйте еще раз или свяжитесь со мной напрямую.');
    });
};

  const contactInfo = [
    { icon: Mail, label: "Email", value: "rayanajung123@gmail.com" },
    { icon: Phone, label: "Телефон", value: "+996 (702) 47 83 31" },
    { icon: MapPin, label: "Локация", value: "Бишкек, Кыргызстан" },
  ];

  return (
    <section id="contact" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Свяжитесь со мной
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">
            Открыт для новых проектов и возможностей
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Давайте работать вместе
              </h3>
              <p className="text-gray-300 mb-8">
                Если у вас есть проект или идея, которую вы хотите воплотить в жизнь,
                я буду рад помочь. Свяжитесь со мной любым удобным способом.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map(({ icon: Icon, label, value }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30 backdrop-blur-sm"
                >
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <Icon className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">{label}</div>
                    <div className="text-white font-semibold">{value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white mb-2">Имя</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors backdrop-blur-sm"
                  placeholder="Ваше имя"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Email</label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors backdrop-blur-sm"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Сообщение</label>
                <motion.textarea
                  whileFocus={{ scale: 1.02 }}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors backdrop-blur-sm resize-none"
                  placeholder="Расскажите о вашем проекте..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-shadow"
              >
                <Send size={20} />
                Отправить сообщение
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 pt-8 border-t border-purple-500/30 text-center"
        >
          <p className="text-gray-400">
            © 2026 RAYA Frontend Developer Portfolio. Создано с ❤️ и React
          </p>
        </motion.div>
      </div>
    </section>
  );
}
