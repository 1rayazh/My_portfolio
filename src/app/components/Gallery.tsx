import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Upload, X, Award, Image as ImageIcon, Download } from "lucide-react";
import MyImg from '../../assets/image.png';
import Certificate from '../../assets/Certificate.png'
import selfie from '../../assets/selfie.png'

interface GalleryItem {
  id: string;
  url: string;
  title: string;
  type: 'certificate' | 'photo';
}

export function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    {
      id: '1',
      url: MyImg,
      title: 'My photo',
      type: 'photo',
    },
    {
      id: '2',
      url: Certificate,
      title: 'Certificate',
      type: 'certificate',
    },
    {
      id: '3',
      url: selfie,
      title: 'Me in Saint Petersburg',
      type: 'photo',
    },
  ]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [uploadType, setUploadType] = useState<'certificate' | 'photo'>('photo');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItem: GalleryItem = {
          id: Date.now().toString(),
          url: reader.result as string,
          title: file.name,
          type: uploadType,
        };
        setGalleryItems([...galleryItems, newItem]);
        setIsModalOpen(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    setGalleryItems(galleryItems.filter(item => item.id !== id));
    setSelectedItem(null);
  };

  return (
    <section id="gallery" className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Галерея и Сертификаты
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>

          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold flex items-center gap-2 mx-auto"
          >
            <Upload size={20} />
            Загрузить файл
          </motion.button>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedItem(item)}
              className="relative group cursor-pointer rounded-2xl overflow-hidden"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm border border-purple-500/30">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      {item.type === 'certificate' ? (
                        <Award className="text-yellow-400" size={20} />
                      ) : (
                        <ImageIcon className="text-purple-400" size={20} />
                      )}
                      <span className="text-white font-semibold">{item.title}</span>
                    </div>
                    <span className="text-gray-300 text-sm capitalize">
                      {item.type === 'certificate' ? 'Сертификат' : 'Фото'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upload Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-slate-900 to-purple-900/50 rounded-2xl p-8 max-w-md w-full border border-purple-500/30"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Загрузить файл</h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Type Selection */}
                <div className="mb-6">
                  <label className="block text-white mb-3">Тип файла</label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setUploadType('photo')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        uploadType === 'photo'
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-purple-500/30 bg-transparent'
                      }`}
                    >
                      <ImageIcon className="mx-auto mb-2 text-purple-400" size={32} />
                      <div className="text-white font-semibold">Фото</div>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setUploadType('certificate')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        uploadType === 'certificate'
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-purple-500/30 bg-transparent'
                      }`}
                    >
                      <Award className="mx-auto mb-2 text-yellow-400" size={32} />
                      <div className="text-white font-semibold">Сертификат</div>
                    </motion.button>
                  </div>
                </div>

                {/* File Upload */}
                <label className="block">
                  <div className="border-2 border-dashed border-purple-500/50 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 transition-colors">
                    <Upload className="mx-auto mb-3 text-purple-400" size={48} />
                    <p className="text-white mb-1">Нажмите для выбора файла</p>
                    <p className="text-gray-400 text-sm">PNG, JPG или JPEG</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Image Preview Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl w-full"
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute -top-12 right-0 text-white hover:text-purple-400 transition-colors"
                >
                  <X size={32} />
                </button>

                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="w-full h-auto rounded-2xl border border-purple-500/30"
                />

                <div className="mt-4 flex items-center justify-between bg-slate-900/80 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    {selectedItem.type === 'certificate' ? (
                      <Award className="text-yellow-400" size={24} />
                    ) : (
                      <ImageIcon className="text-purple-400" size={24} />
                    )}
                    <div>
                      <h4 className="text-white font-semibold">{selectedItem.title}</h4>
                      <p className="text-gray-400 text-sm capitalize">
                        {selectedItem.type === 'certificate' ? 'Сертификат' : 'Фото'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.a
                      href={selectedItem.url}
                      download
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-colors"
                    >
                      <Download size={20} />
                    </motion.a>
                    <motion.button
                      onClick={() => handleDelete(selectedItem.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      <X size={20} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
