import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  HomeIcon, 
  UserIcon, 
  BriefcaseIcon, 
  AcademicCapIcon, 
  EnvelopeIcon 
} from '@heroicons/react/24/outline';
import { TypeAnimation } from 'react-type-animation';

function App() {
  const { scrollY } = useScroll();
  const [isZoomed, setIsZoomed] = useState(false);

  // Smooth scroll progress
  const scrollProgress = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform scroll position to various values
  const heroScale = useTransform(scrollProgress, [0, 300], [1, 1.2]);
  const heroOpacity = useTransform(scrollProgress, [0, 300], [1, 0]);
  const heroY = useTransform(scrollProgress, [0, 300], [0, -100]);
  
  // About section animations
  const aboutOpacity = useTransform(scrollProgress, [100, 300], [0, 1]);
  const aboutY = useTransform(scrollProgress, [100, 300], [100, 0]);
  const aboutScale = useTransform(scrollProgress, [100, 300], [0.8, 1]);

  // Background elements parallax
  const bgParallax = useTransform(scrollProgress, [100, 300], [50, 0]);

  // Handle zoom effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsZoomed(true);
      } else {
        setIsZoomed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.user_name.value,
      email: e.target.user_email.value,
      message: e.target.message.value
    };

    try {
      console.log('Sending data to server:', formData);

      const response = await fetch('https://portfolio-backend-gz61.onrender.com/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(formData)
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      
      alert('Message sent successfully!');
      e.target.reset();
    } catch (error) {
      console.error('Error details:', error);
      alert(`Failed to send message: ${error.message || 'Please try again.'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Portfolio
              </h1>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  <HomeIcon className="h-5 w-5 mr-2" />
                  Home
                </a>
                <a href="#about" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  <UserIcon className="h-5 w-5 mr-2" />
                  About
                </a>
                <a href="#projects" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  <BriefcaseIcon className="h-5 w-5 mr-2" />
                  Projects
                </a>
                <a href="#education" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  <AcademicCapIcon className="h-5 w-5 mr-2" />
                  Education
                </a>
                <a href="#contact" className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  <EnvelopeIcon className="h-5 w-5 mr-2" />
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
        <motion.div 
          className="max-w-7xl mx-auto relative z-10 flex items-center justify-between"
          style={{ 
            scale: heroScale,
            opacity: heroOpacity,
            y: heroY
          }}
        >
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-left max-w-3xl"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Donald</span>
            </motion.h1>

            <motion.div 
              className="text-2xl md:text-4xl text-gray-300 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <TypeAnimation
                sequence={[
                  'Web Developer & Designer...',
                  1000,
                  'Frontend Developer...',
                  1000,
                  'UI/UX Designer...',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="inline-block"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex space-x-6"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-full font-medium hover:shadow-lg transition-all text-lg overflow-hidden group"
              >
                <span className="relative z-10">View My Work</span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative border-2 border-blue-500 text-white px-10 py-4 rounded-full font-medium hover:bg-blue-500/10 transition-all text-lg overflow-hidden group"
              >
                <span className="relative z-10">Let's Talk</span>
                <motion.div
                  className="absolute inset-0 bg-blue-500/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Elements */}
          <div className="hidden lg:block relative w-1/2 h-[600px]">
            {/* Option 1: Animated Gradient Orb */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
              animate={{
                background: [
                  "radial-gradient(circle, rgba(59,130,246,0.3) 0%, rgba(147,51,234,0.3) 100%)",
                  "radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(59,130,246,0.3) 100%)",
                ],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              {/* Inner Glow */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 60px rgba(59,130,246,0.3)",
                    "0 0 80px rgba(147,51,234,0.3)",
                    "0 0 60px rgba(59,130,246,0.3)",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </motion.div>

            {/* Option 2: Animated Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  x: [0, 50, 0],
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}

            {/* Option 3: Animated Rings */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`ring-${i}`}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-500/20"
                style={{
                  width: `${200 + i * 100}px`,
                  height: `${200 + i * 100}px`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            opacity: useTransform(scrollProgress, [0, 100], [1, 0])
          }}
        >
          Scroll to explore
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-800/50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          style={{
            opacity: aboutOpacity
          }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`bg-${i}`}
              className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                y: bgParallax
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </motion.div>

        <motion.div 
          className="max-w-7xl mx-auto relative z-10"
          style={{
            opacity: aboutOpacity,
            y: aboutY,
            scale: aboutScale
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16 max-w-3xl mx-auto"
          >
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Transforming Ideas into Digital Excellence
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              I don't just build websites I create digital experiences that captivate and convert. 
              With a passion for innovation and a keen eye for detail, I turn complex challenges into 
              elegant solutions that drive results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Profile and Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Profile Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-700/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-600/50"
              >
                <div className="flex items-center space-x-6 mb-6">
                  <motion.div
                    className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden">
                      <img 
                        src="/Profile.jpg" 
                        alt="Profile.jpg" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Donald Lumio</h3>
                    <p className="text-gray-300">Web Developer & Designer</p>
                  </div>
                </div>
                <motion.p
                  className="text-gray-300 text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Hi! I'm Donald, a dedicated student with a strong passion for web development and design. Although I'm still learning, I'm always eager to expand my knowledge and improve my skills in creating beautiful and functional websites. I enjoy exploring new technologies, experimenting with creative ideas, and turning concepts into interactive web experiences.
                  <br /><br />
                  My goal is to continuously grow as a developer and designer, and I'm excited to learn from every opportunity that comes my way. I believe that every project is a chance to discover something new and to challenge myself. Web development isn't just a skill for me it's my passion.
                </motion.p>
              </motion.div>

              {/* Key Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700/50 p-6 rounded-xl backdrop-blur-sm border border-gray-600/50"
                >
                  <div className="text-4xl font-bold text-blue-500 mb-2">1 Year</div>
                  <p className="text-gray-300">Freelance Experience</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700/50 p-6 rounded-xl backdrop-blur-sm border border-gray-600/50"
                >
                  <div className="text-4xl font-bold text-purple-500 mb-2">5</div>
                  <p className="text-gray-300">Projects Completed</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700/50 p-6 rounded-xl backdrop-blur-sm border border-gray-600/50"
                >
                  <div className="text-4xl font-bold text-pink-500 mb-2">100%</div>
                  <p className="text-gray-300">Client Satisfaction</p>
                </motion.div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gray-700/50 p-6 rounded-xl backdrop-blur-sm border border-gray-600/50 hover:border-blue-500/50 transition-colors"
                >
                  <motion.div
                    className="w-12 h-12 bg-blue-500/20 rounded-lg mb-4 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                  <motion.h3 
                    className="text-3xl font-bold text-blue-400 mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    >
                      1
                    </motion.span>
                  </motion.h3>
                  <p className="text-gray-300">Years Experience</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gray-700/50 p-6 rounded-xl backdrop-blur-sm border border-gray-600/50 hover:border-purple-500/50 transition-colors"
                >
                  <motion.div
                    className="w-12 h-12 bg-purple-500/20 rounded-lg mb-4 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </motion.div>
                  <motion.h3 
                    className="text-3xl font-bold text-purple-400 mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    >
                      5
                    </motion.span>
                  </motion.h3>
                  <p className="text-gray-300">Projects Completed</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Skills Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {/* Frontend Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gray-700/50 p-6 rounded-xl backdrop-blur-sm border border-gray-600/50 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Frontend Development</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">React</span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Vue</span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Angular</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Backend Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gray-700/50 p-6 rounded-xl backdrop-blur-sm border border-gray-600/50 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Backend Development</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Node.js</span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Python</span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">PHP</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Design Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gray-700/50 p-6 rounded-xl backdrop-blur-sm border border-gray-600/50 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">UI/UX Design</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Figma</span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Adobe XD</span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Sketch</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tools Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gray-700/50 p-6 rounded-xl backdrop-blur-sm border border-gray-600/50 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Development Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Git</span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Docker</span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">AWS</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    Ready to Start Your Project?
                  </h2>
                  <p className="text-xl text-gray-300 max-w-2xl">
                    Let's create something amazing together. I'm here to turn your vision into reality.
                  </p>
                </div>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-full font-medium hover:shadow-lg transition-all text-lg overflow-hidden group"
                >
                  <span className="relative z-10">Let's Talk</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">My Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project Card 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <span className="text-4xl">📱</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Portfolio Website</h3>
                <p className="text-gray-300 mb-4">
                  A modern and responsive portfolio website built with React and Tailwind CSS. Features smooth animations and a contact form.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">React</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">Tailwind CSS</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">Node.js</span>
                </div>
              </div>
            </motion.div>

            {/* Project Card 2 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="h-48 bg-gradient-to-br from-green-500/20 to-blue-500/20 flex items-center justify-center">
                <span className="text-4xl">🛒</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">E-Commerce Website</h3>
                <p className="text-gray-300 mb-4">
                  An online shopping platform with product listings, cart functionality, and user authentication.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">HTML</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">CSS</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">JavaScript</span>
                </div>
              </div>
            </motion.div>

            {/* Project Card 3 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="h-48 bg-gradient-to-br from-yellow-500/20 to-red-500/20 flex items-center justify-center">
                <span className="text-4xl">📝</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Task Management App</h3>
                <p className="text-gray-300 mb-4">
                  A simple task management application to help users organize their daily tasks and track progress.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">PHP</span>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">MySQL</span>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">Bootstrap</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Get In Touch</h2>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={sendEmail} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  name="user_name"
                  id="name"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  name="user_email"
                  id="email"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-md font-medium hover:shadow-lg transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>© 2024 Your Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App; 