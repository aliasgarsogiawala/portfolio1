"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { BriefcaseIcon, CalendarIcon } from "lucide-react"

// Define the experience data structure
interface Experience {
  title: string
  company: string
  location: string
  period: string
  description: string
  skills: string[]
}

// Sample experience data - replace with your actual work experience
const experiences: Experience[] = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "Mumbai, India",
    period: "Jan 2022 - Present",
    description: "Leading the frontend development team in building responsive and accessible web applications. Implemented modern UI/UX designs and improved performance metrics by 40%.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"]
  },
  {
    title: "Web Developer",
    company: "Digital Creations",
    location: "Mumbai, India",
    period: "Jun 2020 - Dec 2021",
    description: "Developed and maintained client websites using modern JavaScript frameworks. Collaborated with designers to implement responsive designs and interactive features.",
    skills: ["JavaScript", "React", "CSS", "Node.js"]
  },
  {
    title: "Junior Developer",
    company: "StartUp Innovations",
    location: "Pune, India",
    period: "Jan 2019 - May 2020",
    description: "Assisted in developing web applications and implementing UI components. Participated in code reviews and testing procedures.",
    skills: ["HTML", "CSS", "JavaScript", "jQuery"]
  }
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
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          <CalendarIcon className="mr-1 h-3 w-3" />
                          {exp.period}
                        </Badge>
                      </div>
                      <div className="flex items-center text-muted-foreground mb-4">
                        <BriefcaseIcon className="mr-2 h-4 w-4" />
                        <span className="font-medium">{exp.company}</span>
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