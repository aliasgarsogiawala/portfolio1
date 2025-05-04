"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { BriefcaseIcon, CalendarIcon } from "lucide-react"
import Image from "next/image"

// Define the experience data structure
interface Experience {
  title: string
  company: string
  location: string
  period: string
  description: string
  skills: string[]
  logo?: string // Make logo optional
}

// Sample experience data - replace with your actual work experience
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
    logo: "/Circular-Logo.png" // Add a placeholder or actual logo
  },
  
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="experience" className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div ref={ref} className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Work Experience</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              My professional journey and career highlights.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-border"></div>

            {/* Experience items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-primary border-4 border-background"></div>

                  {/* Content */}
                  <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pl-12" : "md:pr-12"} pl-10 md:pl-0`}>
                    <div className="bg-card p-6 rounded-lg shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4 mb-4">
                        {/* Company Logo */}
                        {exp.logo && (
                          <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-background/50 p-1 border border-border/50">
                            <Image 
                              src={exp.logo} 
                              alt={`${exp.company} logo`} 
                              width={64} 
                              height={64}
                              className="w-full h-full object-contain"
                            />
                          </div>
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
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}