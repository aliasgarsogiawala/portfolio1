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

    const particlesContainer = particlesRef.current
    if (particlesContainer) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        particle.className = "absolute rounded-full bg-cyan-200/40"

        const size = Math.random() * 16 + 4
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`

        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`

        particlesContainer.appendChild(particle)

        gsap.to(particle, {
          x: Math.random() * 200 - 100,
          y: Math.random() * 200 - 100,
          opacity: 0,
          duration: Math.random() * 10 + 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 5,
        })
      }
    }

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

    const techIconsContainer = document.createElement("div")
    techIconsContainer.className = "absolute inset-0 pointer-events-none"
    heroRef.current?.appendChild(techIconsContainer)

    const techIcons = [
      "react", "nextdotjs", "typescript", "tailwindcss",
      "git", "framer", "canva", "figma", "javascript", "python",
      "docker", "postgresql", "firebase", "vercel",
      "huggingface", "openai", "supabase" , "python"
    ]

    techIcons.forEach((icon, index) => {
      const iconElement = document.createElement("div")
      iconElement.className = "absolute opacity-20"
      iconElement.innerHTML = `<img src="https://cdn.simpleicons.org/${icon}" alt="${icon}" class="w-12 h-12 drop-shadow" />`

      iconElement.style.left = `${Math.random() * 80 + 10}%`
      iconElement.style.top = `${Math.random() * 80 + 10}%`

      techIconsContainer.appendChild(iconElement)

      gsap.to(iconElement, {
        y: Math.random() * 100 - 50,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: Math.random() * 15 + 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.5,
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.8,
      },
    },
  }

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-sky-100 via-cyan-50 to-blue-100 text-slate-800"
      style={{
        backgroundSize: "200% 200%",
        backgroundPosition: "0% 0%",
      }}
    >
      <div className="absolute inset-0 z-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-slate-400/[0.1] bg-[length:40px_40px]" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(6 182 212 / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(6 182 212 / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Particles */}
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />
        
        {/* Floating Orbs */}
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-200/20 rounded-full blur-3xl z-0" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 -left-20 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-200/40 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="container px-4 md:px-6 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-6"
        >
          <motion.div 
            variants={itemVariants}
            className="mb-6 overflow-hidden rounded-full border-4 border-cyan-300/50"
          >
            <img 
              src="/about.jpeg" 
              alt="Aliasgar Sogiawala" 
              className="w-32 h-32 md:w-40 md:h-40 object-cover"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight">
              <motion.span 
                variants={itemVariants}
                className="text-slate-800"
              >
                Hello, I&apos;m{" "}
              </motion.span>
              <motion.span
                variants={itemVariants}
                className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600"
              >
                Aliasgar Sogiawala
              </motion.span>
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="max-w-[700px] text-slate-700 md:text-xl"
          >
            I create dope, functional, and accessible web experiences with modern technologies.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8">
            <Link
              href="#about"
              className="inline-flex items-center justify-center rounded-full bg-slate-800 text-white px-8 py-3 text-lg font-medium hover:bg-slate-700 transition-colors shadow-lg"
            >
              Get to know me
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex space-x-4 mt-6">
            <a href="https://github.com/aliasgarsogiawala" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-800 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/aliasgar-sogiawala-09b24a1b8/" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-800 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://instagram.com/aliasgar.sogiawala" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-800 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="mailto:itsaliasgar@gmail.com" className="text-slate-600 hover:text-slate-800 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          repeatDelay: 0.2,
        }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <ArrowDown className="h-8 w-8 text-slate-600" />
        </motion.div>
      </motion.div>
    </section>
  )
}
