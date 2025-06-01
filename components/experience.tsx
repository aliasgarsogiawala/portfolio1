"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { BriefcaseIcon, CalendarIcon } from "lucide-react"
import Image from "next/image"

interface Experience {
  title: string
  company: string
  location: string
  period: string
  description: string
  skills: string[]
  logo?: string 
}

const experiences: Experience[] = [
  {
    title: "Backend , Web Developer & SEO",
    company: "Overtures Infotech.",
    location: "Mumbai, India",
    period: "May 2023 - July 2023",
    description: "Checked for and fixed bugs in websites , embedded websites in apps , made chatbots and did SEO through Google Search Console.",
    skills: ["Python", "SEO", "OpenAI", "Html/Css"],
    logo: "/oi.png"
  },
  {
    title: "Full Stack Developer",
    company: "Zillionite",
    location: "Mumbai, India",
    period: "Feb 2025 - April 2025",
    description: "Single Handedly developed , maintained the entire Zillionite website from scratch. Consisting of Frontend , Backend , Hosting , Database , Payment Integration",
    skills: ["Next.js", "Typescript", "Tailwind Css", "MongoDB", "Razorpay", "OpenAI","Google Search Console"],
    logo: "/Circular-Logo.png"
  },
  
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const timelineVariants = {
    hidden: { height: 0 },
    visible: { 
      height: "100%",
      transition: { 
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  }

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: (isEven) => ({ 
      x: isEven ? 50 : -50, 
      opacity: 0,
      rotateY: isEven ? 10 : -10
    }),
    visible: { 
      x: 0, 
      opacity: 1,
      rotateY: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: 0.4
      }
    }
  }

  const logoVariants = {
    hidden: { scale: 0, rotate: -30 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 10,
        delay: 0.6
      }
    }
  }

  const skillsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.8
      }
    }
  }

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 150 }
    }
  }

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-blue-100 via-sky-100 to-cyan-100">
      <div className="container px-4 md:px-6">
        <div ref={ref} className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Work Experience</h2>
            <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl">
              My professional journey and career highlights.
            </p>
          </motion.div>

          <div className="relative">
            <motion.div 
              className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-border origin-top"
              variants={timelineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            />

            <motion.div 
              className="space-y-12"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {experiences.map((exp, index) => {
                const isEven = index % 2 === 0;
                return (
                <motion.div
                  key={index}
                  custom={isEven}
                  variants={cardVariants}
                  className={`relative flex flex-col md:flex-row ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <motion.div 
                    className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background z-10"
                    variants={dotVariants}
                  />

                  <div className={`md:w-1/2 ${isEven ? "md:pl-12" : "md:pr-12"} pl-10 md:pl-0`}>
                    <div className="bg-card p-6 rounded-lg shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4 mb-4">
                        {exp.logo && (
                          <motion.div 
                            className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-background/50 p-1 border border-border/50"
                            variants={logoVariants}
                          >
                            <Image 
                              src={exp.logo} 
                              alt={`${exp.company} logo`} 
                              width={64} 
                              height={64}
                              className="w-full h-full object-contain"
                            />
                          </motion.div>
                        )}
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-bold">{exp.title}</h3>
                          <div className="flex items-center text-muted-foreground">
                            <BriefcaseIcon className="mr-2 h-4 w-4" />
                            <span className="font-medium">{exp.company}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-muted-foreground mb-4">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>{exp.period}</span>
                        <span className="mx-2">•</span>
                        <span>{exp.location}</span>
                      </div>
                      
                      <p className="mb-4 text-muted-foreground">{exp.description}</p>
                      
                      <motion.div 
                        className="flex flex-wrap gap-2"
                        variants={skillsVariants}
                      >
                        {exp.skills.map((skill) => (
                          <motion.div key={skill} variants={skillItemVariants}>
                            <Badge variant="secondary">
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )})}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}