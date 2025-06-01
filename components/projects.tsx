"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

const projects = [
  {
    id: 1,
    title: "Zillionite: Wealth Creation Platform",
    description:
      "Zillionite is a comprehensive wealth creation and management platform designed to guide users on their journey to financial prosperity.",
    image: "/zil.png?height=400&width=600",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Razorpay"],
    demoLink: "https://zillionite.com",
    githubLink: "https://aliasgar.vercel.app/private-repo",
  },
  {
    id: 2,
    title: "Tourist Safety Website",
    description: "A website for tourists to avoid getting scammed including features like emergency sos , cab fare estimation , chatroom , etc.",
    image: "/ts.png?height=400&width=600",
    tags: ["Next.js", "Tailwind css", "Clerk", "Typescript"],
    demoLink: "https://toursafe.in",
    githubLink: "https://github.com/aliasgarsogiawala/toursafe",
  },
  {
    id: 3,
    title: "Tech Horizons Club",
    description: "Co-Founder and Web Dev of THC. A club for all tech enthusiasts to learn and grow together.",
    image: "/thc.png?height=400&width=600",
    tags: ["Next.js", "Tailwind Css", "Typescript"],
    demoLink: "https://techhorizonsclub.com",
    githubLink: "https://aliasgar.vercel.app/private-repo",
  },
  {
    id: 4,
    title: "ParaDoc",
    description: "A Parallel Reality Simulation for Medical Decision-Making. Hackathon winning.",
    image: "/paradoc.png?height=400&width=600",
    tags: ["Next.js", "Tailwind Css", "Clerk", "Javascript","Gemini API"],
    demoLink: "https://paradocc.vercel.app/",
    githubLink: "https://github.com/aliasgarsogiawala/ParaDoc-dreamhacks",
  },
  {
    id: 5,
    title: "Purchase Order Generator",
    description: "A Purchase Order Generator using Javascript , React.js making use of JsPDF.",
    image: "/po.png?height=400&width=600",
    tags: ["React.js", "Css", "jsPDF", "Javascript"],
    demoLink: "https://purchase-order-gen.vercel.app/",
    githubLink: "https://github.com/aliasgarsogiawala/purchase-order",
  },
  {
    id: 6,
    title: "GitHub Punchcard",
    description: "Visualize the hours and days you commit the most. Plug it into your readme",
    image: "/punch.png?height=400&width=600",
    tags: ["Vercel Edge API","GitHub API","Next.js", "Tailwind Css"],
    demoLink: "https://punchcardwidget.vercel.app/",
    githubLink: "https://github.com/aliasgarsogiawala/punchcard-widget",
  },
  {
    id: 7,
    title: "GitHub Last 3 Commits",
    description: "A place where you can fetch your or anyones last 3 public repo commits and it also provides you with a md code for you to embed it in your README.md.",
    image: "/l3.png?height=400&width=600",
    tags: ["Vercel Edge API","GitHub API","Next.js", "Tailwind Css"],
    demoLink: "https://last-3-commits.vercel.app/",
    githubLink: "https://github.com/aliasgarsogiawala/last-3-commits",
  },
  {
    id: 8,
    title: "Multipurpose Website - React ",
    description: "React Web App with features : Weather Update , JS Code Editor , Currency Converter and Voice Translation.",
    image: "/react.png?height=400&width=600",
    tags: ["React.js", "Css", "Html", "Javascript"],
    demoLink: "https://react-multipurpose.vercel.app/",
    githubLink: "https://github.com/aliasgarsogiawala/React_Multipurpose",
  },
  {
    id: 9,
    title: "Mini Python Projects",
    description: "Python Mini Projects and Mini Games.",
    image: "/python.png?height=400&width=600",
    tags: ["Python" , "BeautifulSoup","Web Scrapping"],
    demoLink:"https://github.com/aliasgarsogiawala/Codes",
    githubLink: "https://github.com/aliasgarsogiawala/Codes"
  },
  {
    id: 10,
    title: "90 Days",
    description: "A comprehensive habit tracking app that helps users build consistency over 90 days, with progress visualization and accountability features.",
    image: "/peng.png?height=400&width=600",
    tags: ["Next js", "Typescript"],
    demoLink: "https://aliasgar.vercel.app",
    githubLink: "https://github.com/aliasgarsogiawala",
    comingSoon: false
  },
  {
    id: 11,
    title: "Planify - Smart Task Management",
    description: "An AI-powered task management platform that helps prioritize tasks, schedule efficiently, and increase productivity through smart suggestions.",
    image: "/peng.png?height=400&width=600",
    tags: ["Next.js", "TypeScript", "OpenAI API", "Convex"],
    demoLink: "https://aliasgar.vercel.app",
    githubLink: "https://github.com/aliasgarsogiawala",
    comingSoon: false
  }
]

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const ref = useRef(null)
  // Change this line
  
  // To this
  const isInView = useInView(ref, { once: true, amount: 0.04, threshold: 0 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  // Function to determine if a project is a major project
  const isMajorProject = (id: number) => id <= 3

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-50">
      <div className="container px-4 md:px-6">
        <div ref={ref} className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Projects</h2>
            <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl">
              A selection of my recent work and personal projects.
            </p>
          </motion.div>

          {/* Featured Projects (1-3) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.slice(0, 3).map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                className="relative"
              >
                <Card className="h-full overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300 border-2 border-cyan-200/50 bg-white/80 backdrop-blur-sm">
                  <div className="relative overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="aspect-video overflow-hidden"
                    >
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="object-cover w-full h-full transition-transform"
                      />
                      {project.comingSoon && (
                        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                          <Badge variant="destructive" className="text-lg px-4 py-2 bg-primary/80 hover:bg-primary">
                            Coming Soon
                          </Badge>
                        </div>
                      )}
                    </motion.div>
                    <AnimatePresence>
                      {hoveredProject === project.id && !project.comingSoon && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center"
                        >
                          <div className="flex gap-4">
                            <Button size="sm" variant="secondary" asChild>
                              <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Demo
                              </a>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                Code
                              </a>
                            </Button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                    <CardDescription className="text-base">{project.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Other Projects (4-9) */}
          <div className="mt-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl font-semibold mb-6 text-center"
            >
              Other Projects
            </motion.h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {projects.slice(3).map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className="relative"
                >
                  <Card className="h-full overflow-hidden group shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className="relative overflow-hidden">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="aspect-video overflow-hidden"
                      >
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="object-cover w-full h-full transition-transform"
                        />
                        {project.comingSoon && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                            <Badge variant="destructive" className="text-sm px-3 py-1 bg-primary/80 hover:bg-primary">
                              Coming Soon
                            </Badge>
                          </div>
                        )}
                      </motion.div>
                      <AnimatePresence>
                        {hoveredProject === project.id && !project.comingSoon && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-black/60 flex items-center justify-center"
                          >
                            <div className="flex gap-3">
                              <Button size="sm" variant="secondary" className="text-xs" asChild>
                                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-1 h-3 w-3" />
                                  Demo
                                </a>
                              </Button>
                              <Button size="sm" variant="outline" className="text-xs" asChild>
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                  <Github className="mr-1 h-3 w-3" />
                                  Code
                                </a>
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg font-medium">{project.title}</CardTitle>
                      <CardDescription className="text-sm">{project.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0">
                      <div className="flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs px-2 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center"
          >
            <Link 
              href="https://github.com/aliasgarsogiawala" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Github className="mr-2 h-5 w-5" />
              View All Projects
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
