import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { ArrowRight, TrendingUp, Lock, Zap, DollarSign, Users, BarChart } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundAnimation = useAnimation();

  useEffect(() => {
    setIsVisible(true);
    animateBackground();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const animateBackground = async () => {
    while (true) {
      await backgroundAnimation.start({
        background: [
          'linear-gradient(45deg, #000000, #001a1a)',
          'linear-gradient(45deg, #001a1a, #003333)',
          'linear-gradient(45deg, #003333, #004d4d)',
          'linear-gradient(45deg, #004d4d, #006666)',
          'linear-gradient(45deg, #006666, #004d4d)',
          'linear-gradient(45deg, #004d4d, #003333)',
          'linear-gradient(45deg, #003333, #001a1a)',
          'linear-gradient(45deg, #001a1a, #000000)',
        ],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        },
      });
    }
  };

  return (
    <motion.div 
      className="text-[#e0ffff] flex flex-col relative overflow-hidden"
      animate={backgroundAnimation}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,255,255,0.2) 0%, rgba(0,255,255,0) 50%)`,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
      />

      <header className="py-6 px-8 z-10">
        <nav className="flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            CryptoStocks
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-x-6"
          >
            <button className="text-xl hover:text-[#00ffff] transition-colors">About</button>
            <button className="text-xl hover:text-[#00ffff] transition-colors">Features</button>
            <button className="text-xl hover:text-[#00ffff] transition-colors">IPOs</button>
            <button className="text-xl hover:text-[#00ffff] transition-colors">Contact</button>
          </motion.div>
        </nav>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center px-8 py-16 z-10">
        <AnimatePresence>
          {isVisible && (
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="text-7xl font-bold text-center mb-8"
            >
              Revolutionize Stock Trading with NFTs
            </motion.h2>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-2xl text-center mb-12 max-w-3xl"
        >
          Welcome to the future of decentralized stock trading. Buy, sell, and trade company stocks as unique NFTs on our cutting-edge Web3 platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex space-x-6"
        >
          <motion.button 
            className="bg-[#00ffff] text-black text-xl font-bold py-4 px-8 rounded-full hover:bg-[#00cccc] transition-colors flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
            <ArrowRight className="ml-2" />
          </motion.button>
          <motion.button 
            className="border-2 border-[#00ffff] text-[#00ffff] text-xl font-bold py-4 px-8 rounded-full hover:bg-[#00ffff] hover:text-black transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl"
        >
          <FeatureCard
            icon={<TrendingUp size={48} />}
            title="Real-time Trading"
            description="Experience lightning-fast transactions and real-time market updates powered by blockchain technology."
          />
          <FeatureCard
            icon={<Lock size={48} />}
            title="Secure Ownership"
            description="Own your stocks as unique NFTs, ensuring true ownership and easy transferability."
          />
          <FeatureCard
            icon={<Zap size={48} />}
            title="Instant Liquidity"
            description="Access a global pool of investors and trade your stock NFTs 24/7 without intermediaries."
          />
        </motion.div>
      </main>

      <section className="min-h-screen flex flex-col justify-center items-center px-8 py-16 z-10 bg-gradient-to-b from-[#001a1a] to-[#000000]">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-bold text-center mb-8"
        >
          Introducing IPOs on CryptoStocks
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-2xl text-center mb-12 max-w-3xl"
        >
          Launch your company into the future of finance. List your IPO on our decentralized stock exchange and connect with a global network of investors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl mb-16"
        >
          <IPOFeatureCard
            icon={<DollarSign size={48} />}
            title="Seamless Fundraising"
            description="Raise capital efficiently through our blockchain-powered platform, reducing costs and intermediaries."
          />
          <IPOFeatureCard
            icon={<Users size={48} />}
            title="Global Investor Access"
            description="Tap into a worldwide pool of investors, from retail to institutional, all on one platform."
          />
          <IPOFeatureCard
            icon={<BarChart size={48} />}
            title="Real-time Market Data"
            description="Access comprehensive analytics and market sentiment data to make informed decisions."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex space-x-6"
        >
          <motion.button 
            className="bg-[#00ffff] text-black text-xl font-bold py-4 px-8 rounded-full hover:bg-[#00cccc] transition-colors flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            List Your IPO
            <ArrowRight className="ml-2" />
          </motion.button>
          <motion.button 
            className="border-2 border-[#00ffff] text-[#00ffff] text-xl font-bold py-4 px-8 rounded-full hover:bg-[#00ffff] hover:text-black transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore IPOs
          </motion.button>
        </motion.div>
      </section>

      <footer className="py-6 px-8 text-center z-10 bg-[#000000]">
        <p>&copy; 2024 CryptoStocks. All rights reserved.</p>
      </footer>
    </motion.div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-[#001a1a] p-6 rounded-lg text-center"
  >
    <motion.div 
      className="text-[#00ffff] mb-4"
      initial={{ rotateY: 0 }}
      whileHover={{ rotateY: 360 }}
      transition={{ duration: 0.6 }}
    >
      {icon}
    </motion.div>
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-lg">{description}</p>
  </motion.div>
);

const IPOFeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-[#002626] p-6 rounded-lg text-center"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <motion.div 
      className="text-[#00ffff] mb-4"
      initial={{ rotateY: 0 }}
      whileHover={{ rotateY: 360 }}
      transition={{ duration: 0.6 }}
    >
      {icon}
    </motion.div>
    <h3 className="text-2xl font-bold mb-2">{title}</h3>
    <p className="text-lg">{description}</p>
  </motion.div>
);

export default LandingPage;