"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

// Define skills with their corresponding icons
const skills = [
  { name: "HTML", icon: "html5" },
  { name: "CSS", icon: "css3" },
  { name: "JavaScript", icon: "javascript" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextdotjs" }, // fixed
  { name: "TypeScript", icon: "typescript" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "Python", icon: "python" },
  { name: "Flask", icon: "flask" },
  { name: "Bootstrap", icon: "bootstrap" },
  { name: "Django", icon: "django" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  // { name: "Shadcn UI", icon: "shadcnui" }, // removed, not available
  { name: "Figma", icon: "figma" },
  { name: "Canva", icon: "canva" },
  { name: "Framer Motion", icon: "framer" }, // fixed
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "SQL", icon: "sqlite" }, // Using sqlite as a general SQL icon
  { name: "MongoDB", icon: "mongodb" },
  { name: "Vercel", icon: "vercel" },
  { name: "AWS", icon: "amazon" },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-gray-900">
      <div className="container px-4 md:px-6">
        <div ref={ref} className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Skills</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Technologies and tools I work with to bring ideas to life.
            </p>
          </motion.div>

          {/* Skills grid */}
          {isClient && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8"
            >
              {skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  className="flex flex-col items-center justify-center"
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                >
                  <div className="w-20 h-20 mb-4 flex items-center justify-center">
                    <img
                      src={`https://cdn.simpleicons.org/${skill.icon}/currentColor`}
                      alt={skill.name}
                      className="w-16 h-16 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-sm font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
