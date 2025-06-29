"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

// Add missing UI components
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
)

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
)

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
)

const CardDescription = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>
    {children}
  </p>
)

const CardFooter = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>
    {children}
  </div>
)

const Badge = ({ children, variant = "default", className = "" }: { 
  children: React.ReactNode; 
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}) => {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    outline: "border border-input"
  }
  return (
    <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}

const Button = ({ children, size = "default", variant = "default", className = "", asChild = false, ...props }: {
  children: React.ReactNode;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "secondary" | "outline";
  className?: string;
  asChild?: boolean;
  [key: string]: any;
}) => {
  const sizes = {
    sm: "h-9 px-3 text-sm",
    default: "h-10 px-4 py-2",
    lg: "h-11 px-8"
  }
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
  }
  
  if (asChild) {
    return (
      <div className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
        {children}
      </div>
    )
  }
  
  return (
    <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

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
    description: "A website for tourists to avoid getting scammed including features like emergency sos, cab fare estimation, chatroom, etc.",
    image: "/ts.png?height=400&width=600",
    tags: ["Next.js", "Tailwind CSS", "Clerk", "TypeScript"],
    demoLink: "https://toursafe.in",
    githubLink: "https://github.com/aliasgarsogiawala/toursafe",
  },
  {
    id: 3,
    title: "Tech Horizons Club",
    description: "Co-Founder and Web Dev of THC. A club for all tech enthusiasts to learn and grow together.",
    image: "/thc.png?height=400&width=600",
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    demoLink: "https://techhorizonsclub.com",
    githubLink: "https://aliasgar.vercel.app/private-repo",
  },
  {
    id: 4,
    title: "ParaDoc",
    description: "A Parallel Reality Simulation for Medical Decision-Making. Hackathon winning project.",
    image: "/paradoc.png?height=400&width=600",
    tags: ["Next.js", "Tailwind CSS", "Clerk", "JavaScript", "Gemini API"],
    demoLink: "https://paradocc.vercel.app/",
    githubLink: "https://github.com/aliasgarsogiawala/ParaDoc-dreamhacks",
  },
  {
    id: 5,
    title: "GitHub Punchcard",
    description: "Visualize the hours and days you commit the most. Plug it into your readme",
    image: "/punch.png?height=400&width=600",
    tags: ["Vercel Edge API", "GitHub API", "Next.js", "Tailwind CSS"],
    demoLink: "https://punchcardwidget.vercel.app/",
    githubLink: "https://github.com/aliasgarsogiawala/punchcard-widget",
  },
  {
    id: 6,
    title: "GitHub Last 3 Commits",
    description: "A place where you can fetch your or anyone's last 3 public repo commits and it also provides you with a markdown code for you to embed it in your README.md.",
    image: "/l3.png?height=400&width=600",
    tags: ["Vercel Edge API", "GitHub API", "Next.js", "Tailwind CSS"],
    demoLink: "https://last-3-commits.vercel.app/",
    githubLink: "https://github.com/aliasgarsogiawala/last-3-commits",
  },
  {
    id: 7,
    title: "Mini Python Projects",
    description: "Python Mini Projects and Mini Games including web scraping utilities and automation scripts.",
    image: "/python.png?height=400&width=600",
    tags: ["Python", "BeautifulSoup", "Web Scraping"],
    demoLink: "https://github.com/aliasgarsogiawala/Codes",
    githubLink: "https://github.com/aliasgarsogiawala/Codes"
  },
  {
    id: 8,
    title: "Purchase Order Generator",
    description: "A Purchase Order Generator using JavaScript, React.js making use of JsPDF for document generation.",
    image: "/po.png?height=400&width=600",
    tags: ["React.js", "CSS", "jsPDF", "JavaScript"],
    demoLink: "https://purchase-order-gen.vercel.app/",
    githubLink: "https://github.com/aliasgarsogiawala/purchase-order",
  },
  {
    id: 9,
    title: "Multipurpose Website - React",
    description: "React Web App with features: Weather Update, JS Code Editor, Currency Converter and Voice Translation.",
    image: "/react.png?height=400&width=600",
    tags: ["React.js", "CSS", "HTML", "JavaScript"],
    demoLink: "https://react-multipurpose.vercel.app/",
    githubLink: "https://github.com/aliasgarsogiawala/React_Multipurpose",
  },
]

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const ref = useRef(null)
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

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-50">
      <div className="container mx-auto px-6">
        <div ref={ref} className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              My Projects
            </h2>
            <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl">
              A selection of my recent work and personal projects showcasing my skills and creativity.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
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
                    </motion.div>
                    <AnimatePresence>
                      {hoveredProject === project.id && (
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
                    <CardTitle className="text-xl font-bold text-slate-800">{project.title}</CardTitle>
                    <CardDescription className="text-base text-slate-600">{project.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-sm bg-cyan-100 text-cyan-800 hover:bg-cyan-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center pt-8"
          >
            <Link 
              href="https://github.com/aliasgarsogiawala" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg font-medium hover:scale-105 transform"
            >
              <Github className="mr-3 h-6 w-6" />
              View More on GitHub
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
