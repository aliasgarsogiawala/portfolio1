"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Instagram } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Particles animation
    const particlesContainer = particlesRef.current
    if (particlesContainer) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        particle.className = "absolute rounded-full bg-cyan-300/30"

        const size = Math.random() * 8 + 3
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`

        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`

        particlesContainer.appendChild(particle)

        gsap.to(particle, {
          y: Math.random() * 100 - 50,
          x: Math.random() * 100 - 50,
          opacity: Math.random() * 0.7 + 0.3,
          duration: Math.random() * 12 + 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 3,
        })
      }
    }

    // Background gradient animation
    gsap.to(heroRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      backgroundPosition: "0% 100%",
      ease: "none",
    })

    // Tech stack icons floating animation
    const techIconsContainer = document.createElement("div")
    techIconsContainer.className = "absolute inset-0 pointer-events-none opacity-40"
    heroRef.current?.appendChild(techIconsContainer)

    const techIcons = [
      "react", "nextdotjs", "typescript", "tailwindcss",
      "javascript", "python", "git", "figma"
    ]

    techIcons.forEach((icon, index) => {
      const iconElement = document.createElement("div")
      iconElement.className = "absolute opacity-20"
      iconElement.innerHTML = `<img src="https://cdn.simpleicons.org/${icon}" alt="${icon}" class="w-8 h-8 drop-shadow-lg" />`

      iconElement.style.left = `${Math.random() * 100}%`
      iconElement.style.top = `${Math.random() * 100}%`

      techIconsContainer.appendChild(iconElement)

      gsap.to(iconElement, {
        y: Math.random() * 60 - 30,
        x: Math.random() * 60 - 30,
        rotation: Math.random() * 180,
        duration: Math.random() * 20 + 15,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.8,
      })
    })

    return () => {
      if (particlesRef.current) {
        gsap.killTweensOf(particlesRef.current.children)
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      if (techIconsContainer) {
        gsap.killTweensOf(techIconsContainer.children)
        techIconsContainer.remove()
      }
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 1,
      },
    },
  }

  const rightSideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 1.2,
        delay: 0.5,
      },
    },
  }

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center overflow-hidden bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-100"
      style={{
        backgroundSize: "200% 200%",
        backgroundPosition: "0% 0%",
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-slate-400/[0.1] bg-[length:60px_60px]" />
        
        {/* Particles */}
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-200/60 to-blue-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-br from-sky-200/50 to-cyan-200/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: "1s"}} />
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          {/* Left Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 text-left"
          >
            <motion.div variants={itemVariants} className="space-y-2">
              <motion.span 
                variants={itemVariants}
                className="text-cyan-600 font-medium text-lg"
              >
                👋 Hello, I'm
              </motion.span>
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
              >
                <span className="text-slate-800">Aliasgar</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                  Sogiawala
                </span>
              </motion.h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-700 max-w-lg leading-relaxed"
            >
              A passionate <span className="font-semibold text-cyan-700">BSc IT student</span> crafting innovative web solutions and bringing ideas to life through clean, efficient code.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#about"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 text-lg font-medium hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get to know me
              </Link>
              <Link
                href="#projects"
                className="inline-flex items-center justify-center rounded-full border-2 border-slate-300 text-slate-700 px-8 py-4 text-lg font-medium hover:border-cyan-500 hover:text-cyan-700 transition-all duration-300"
              >
                View my work
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex space-x-6">
              {[
                { href: "https://github.com/aliasgarsogiawala", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/aliasgar-sogiawala-09b24a1b8/", icon: Linkedin, label: "LinkedIn" },
                { href: "https://instagram.com/aliasgar.sogiawala", icon: Instagram, label: "Instagram" },
                { href: "mailto:itsaliasgar18@gmail.com", icon: Mail, label: "Email" }
              ].map(({ href, icon: Icon, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm border border-cyan-200 rounded-xl text-slate-600 hover:text-cyan-600 hover:border-cyan-400 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Animated Cobweb */}
          <motion.div
            variants={rightSideVariants}
            initial="hidden"
            animate="visible"
            className="relative h-full flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg h-96 lg:h-[500px]">
              {/* Animated Cobweb */}
              <motion.svg 
                width="400" 
                height="400" 
                viewBox="0 0 400 400"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 2 }}
              >
                {/* Radial lines */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
                  <motion.line
                    key={`radial-${angle}`}
                    x1="200"
                    y1="200"
                    x2={200 + Math.cos((angle * Math.PI) / 180) * 150}
                    y2={200 + Math.sin((angle * Math.PI) / 180) * 150}
                    stroke="url(#cobwebGradient)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: index * 0.2 }}
                  />
                ))}
                
                {/* Concentric web circles */}
                {[30, 60, 90, 120, 150].map((radius, index) => (
                  <motion.circle
                    key={`circle-${radius}`}
                    cx="200"
                    cy="200"
                    r={radius}
                    fill="none"
                    stroke="url(#cobwebGradient)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, rotate: 0 }}
                    animate={{ 
                      pathLength: 1,
                      rotate: 360
                    }}
                    transition={{ 
                      pathLength: { duration: 1.5, delay: index * 0.3 },
                      rotate: { duration: 20 + index * 5, repeat: Infinity, ease: "linear" }
                    }}
                  />
                ))}

                {/* Floating sparkles */}
                {[...Array(6)].map((_, index) => (
                  <motion.circle
                    key={`sparkle-${index}`}
                    cx={150 + Math.random() * 100}
                    cy={150 + Math.random() * 100}
                    r="2"
                    fill="#06b6d4"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      y: [-10, 10, -10]
                    }}
                    transition={{
                      duration: 3 + index * 0.5,
                      repeat: Infinity,
                      delay: index * 0.8
                    }}
                  />
                ))}

                <defs>
                  <linearGradient id="cobwebGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#1e40af" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Center glowing orb */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-lg"
                animate={{ 
                  scale: [1, 1.3, 1],
                  boxShadow: [
                    "0 0 10px #06b6d4",
                    "0 0 20px #06b6d4, 0 0 30px #06b6d4",
                    "0 0 10px #06b6d4"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 2,
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-slate-500 text-sm">Scroll down</span>
          <ArrowDown className="h-6 w-6 text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
