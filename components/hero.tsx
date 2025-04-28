"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import gsap from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLSpanElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(TextPlugin, ScrollTrigger)

    // Create particles
    const particlesContainer = particlesRef.current
    if (particlesContainer) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        particle.className = "absolute rounded-full bg-primary/20"

        // Random size between 4px and 20px
        const size = Math.random() * 16 + 4
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`

        // Random position
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`

        // Add to container
        particlesContainer.appendChild(particle)

        // Animate with GSAP
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

    // Text animation timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
    })

    tl.to(
      nameRef.current,
      {
        duration: 1.5,
        text: { value: "Aliasgar Sogiawala", delimiter: "" },
        ease: "none",
      },
      "-=0.5",
    )

    tl.from(
      descriptionRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 0.8,
      },
      "-=0.3",
    )
    
    tl.from(
      aboutRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 0.8,
      },
      "-=0.1",
    )

    // Scroll animation
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

    return () => {
      // Clean up animations
      if (particlesRef.current) {
        gsap.killTweensOf(particlesRef.current.children)
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
      },
    },
  }

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)",
        backgroundSize: "200% 200%",
        backgroundPosition: "0% 0%",
      }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 2 }}
          className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="container px-4 md:px-6 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-6"
        >
          <motion.div variants={itemVariants} ref={textRef} className="overflow-hidden">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
              <span className="text-primary">Hello, I&apos;m </span>
              <span
                ref={nameRef}
                className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"
              ></span>
            </h1>
          </motion.div>

          <motion.p
            variants={itemVariants}
            ref={descriptionRef}
            className="max-w-[700px] text-muted-foreground md:text-xl"
          >
            I create beautiful, functional, and accessible web experiences with modern technologies.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            ref={aboutRef}
            className="max-w-[800px] text-foreground/80 md:text-lg mt-6 bg-background/30 p-6 rounded-lg backdrop-blur-sm border border-border/20"
          >
            <p className="mb-4">
              I'm a passionate full-stack developer with expertise in React, Next.js, and modern JavaScript frameworks. 
              With 5+ years of experience building web applications, I focus on creating performant, accessible, and 
              visually appealing digital experiences.
            </p>
            <p>
              My approach combines technical excellence with creative problem-solving. I'm dedicated to writing clean, 
              maintainable code and staying current with the latest web technologies and best practices.
            </p>
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
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <ArrowDown className="h-8 w-8 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  )
}
