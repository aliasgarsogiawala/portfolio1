"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Instagram } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { Typewriter } from 'react-simple-typewriter'

// ASCII Art and Fun Data
const asciiArt = `
 ▄▄▄       ██▓     ██▓ ▄▄▄        ██████   ▄████  ▄▄▄       ██▀███  
▒████▄    ▓██▒    ▓██▒▒████▄    ▒██    ▒  ██▒ ▀█▒▒████▄    ▓██ ▒ ██▒
▒██  ▀█▄  ▒██░    ▒██▒▒██  ▀█▄  ░ ▓██▄   ▒██░▄▄▄░▒██  ▀█▄  ▓██ ░▄█ ▒
░██▄▄▄▄██ ▒██░    ░██░░██▄▄▄▄██   ▒   ██▒░▓█  ██▓░██▄▄▄▄██ ▒██▀▀█▄  
 ▓█   ▓██▒░██████▒░██░ ▓█   ▓██▒▒██████▒▒░▒▓███▀▒ ▓█   ▓██▒░██▓ ▒██▒
 ▒▒   ▓▒█░░ ▒░▓  ░░▓   ▒▒   ▓▒█░▒ ▒▓▒ ▒ ░ ░▒   ▒  ▒▒   ▓▒█░░ ▒▓ ░▒▓░
  ▒   ▒▒ ░░ ░ ▒  ░ ▒ ░  ▒   ▒▒ ░░ ░▒  ░ ░  ░   ░   ▒   ▒▒ ░  ░▒ ░ ▒░
  ░   ▒     ░ ░    ▒ ░  ░   ▒   ░  ░  ░  ░ ░   ░   ░   ▒     ░░   ░ 
      ░  ░    ░  ░ ░        ░  ░      ░        ░       ░  ░   ░     
                    PORTFOLIO TERMINAL v3.0 🚀
`

const neofetchInfo = `
╭─────────────────────────────────────────────╮
│ User        Aliasgar Sogiawala              │
│ OS          Mumbai, India 🇮🇳              │
│ Host        BSc IT Student, Developer       │
│ Kernel      Next.js 14.0.3                 │
│ Uptime      5+ years coding journey         │
│ Experience  3+ years professional work     │
│ Packages    TypeScript, React, Node.js      │
│ Shell       zsh 5.8.1                       │
│ Terminal    Interactive Portfolio v4.0      │
│ CPU         Full-Stack Problem Solver       │
│ GPU         Creative Design Engine          │
│ Memory      Always learning new tech        │
│ Projects    Zillionite, TourSafe, ParaDoc  │
╰─────────────────────────────────────────────╯
`

const matrixChars = ['0', '1', 'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク']

// Matrix Rain Component
const MatrixRain = () => {
  const matrixRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = matrixRef.current
    if (!container) return

    const createMatrixRain = () => {
      const columns = Math.floor(container.offsetWidth / 20)
      const drops: number[] = []
      
      for (let i = 0; i < columns; i++) {
        drops[i] = 1
      }

      const draw = () => {
        // Create canvas-like effect with divs
        container.innerHTML = ''
        
        for (let i = 0; i < drops.length; i++) {
          const char = matrixChars[Math.floor(Math.random() * matrixChars.length)]
          const charElement = document.createElement('div')
          charElement.textContent = char
          charElement.style.cssText = `
            position: absolute;
            left: ${i * 20}px;
            top: ${drops[i] * 20}px;
            color: #00ff41;
            font-family: monospace;
            font-size: 14px;
            text-shadow: 0 0 3px #00ff41;
            opacity: ${Math.random() * 0.8 + 0.2};
          `
          container.appendChild(charElement)
          
          if (drops[i] * 20 > container.offsetHeight && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i]++
        }
      }

      const interval = setInterval(draw, 100)
      return () => clearInterval(interval)
    }

    return createMatrixRain()
  }, [])

  return (
    <div 
      ref={matrixRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    />
  )
}

const fortuneQuotes = [
  "Code is poetry written in logic. 💫",
  "Every bug is just an undocumented feature waiting to happen. 🐛",
  "The best way to predict the future is to code it. 🚀",
  "Debugging is like being a detective in a crime movie... where you're also the murderer. 🔍",
  "Coffee: A programmer's liquid motivation. ☕",
  "Code never lies, comments sometimes do. 📝",
  "Programming is 10% writing code and 90% figuring out why it doesn't work. 🤔"
]

gsap.registerPlugin(ScrollTrigger)

const MiniTerminal = () => {
  const [currentCommand, setCurrentCommand] = useState(0)
  const [isInteractive, setIsInteractive] = useState(false)
  const [commandHistory, setCommandHistory] = useState<Array<{command: string, output: string}>>([])
  const [currentInput, setCurrentInput] = useState("")
  const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Skip login for demo
  const [matrixActive, setMatrixActive] = useState(false)
  const [theme, setTheme] = useState("default")
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser] = useState("aliasgar")
  const [terminalLines, setTerminalLines] = useState<Array<{type: string, content: string, timestamp?: string}>>([])
  
  const inputRef = useRef<HTMLInputElement>(null)

  // Demo commands that auto-play
  const demoCommands = [
    {
      command: "whoami",
      output: "aliasgar@developer"
    },
    {
      command: "neofetch",
      output: neofetchInfo
    },
    {
      command: "skills --list",
      output: `🚀 Frontend: [ "React", "Next.js", "TypeScript", "Tailwind" ]
🔧 Backend: [ "Node.js", "Express", "MongoDB", "PostgreSQL" ]
☁️ DevOps: [ "Docker", "Vercel", "Firebase", "Git" ]
🎨 Design: [ "Figma", "Canva", "UI/UX" ]`
    },
    {
      command: "fortune",
      output: `"${fortuneQuotes[Math.floor(Math.random() * fortuneQuotes.length)]}"`
    }
  ]

  // Interactive command processing
  const processCommand = (cmd: string): string => {
    const command = cmd.toLowerCase().trim()
    
    switch(command) {
      case "help":
        return `Available commands:
  help          - Show this help message
  whoami        - Display current user
  neofetch      - Show system information
  skills        - Display technical skills
  projects      - List recent projects
  github        - Browse GitHub repositories  
  contact       - Show contact information
  resume        - Download resume
  ascii         - Display ASCII art
  fortune       - Random developer quote
  matrix        - Toggle matrix effect
  clear         - Clear terminal
  theme [name]  - Change terminal theme
  sudo hire-me  - Special command 😉
  exit          - Switch to demo mode
  
Type any command to get started! 🚀`
      
      case "whoami":
        return `${currentUser}@developer
Full Name: Aliasgar Sogiawala  
Role: Full-Stack Developer & BSc IT Student
Age: 19 years old
Location: Mumbai, India 🇮🇳
Experience: 5+ years coding, 3+ years professional
Status: Building amazing web experiences ✨
Focus: Problem-solving, functional & user-friendly applications

Current Projects:
- 🏦 Zillionite (Wealth Platform)
- 🏆 Award-winning hackathon projects
- 📚 BSc IT studies & continuous learning`
      
      case "neofetch":
        return neofetchInfo
      
      case "skills":
      case "skills --list":
        return `🚀 Frontend Technologies:
   React.js, Next.js, TypeScript, JavaScript
   Tailwind CSS, HTML5, CSS3, ShadCN UI, Vite
   
🔧 Backend Technologies:
   Node.js, Python, Flask, Django
   MongoDB, PostgreSQL, MySQL, tRPC, Java
   
🎨 Design & UI/UX:
   Figma, Canva, Framer Motion, Lottie
   Adobe Creative Suite, Responsive Design
   
☁️ DevOps & Tools:
   Docker, Git & GitHub, Vercel, AWS
   Firebase, Supabase, Railway, GitHub Actions
   
🤖 AI/ML & Data:
   NumPy, Pandas, Matplotlib, Scikit-learn
   PyTorch, OpenCV, Hugging Face, Jupyter
   
🔐 Auth & APIs:
   Clerk, Auth.js, JWT, OAuth, REST APIs
   Postman, Convex, SuperTokens
   
🛠️ Other Technologies:
   Chrome Extensions, Raspberry Pi, RStudio
   Tauri, Prisma, Cloudflare
   
🎯 Currently Learning:
   Docker containerization, Advanced React patterns
   System design, Cloud architecture`
      
      case "projects":
        return `📂 Recent Projects:

1. 🏦 Zillionite Wealth Platform
   Tech: Next.js, TypeScript, MongoDB, Razorpay
   Status: ✅ Live Production
   URL: https://zillionite.com
   
2. �️ Tourist Safety Website  
   Tech: Next.js, Tailwind CSS, Clerk, TypeScript
   Status: ✅ Completed
   URL: https://toursafe.in
   
3. � ParaDoc (Hackathon Winner)
   Tech: Next.js, Gemini API, Tailwind CSS
   Status: ✅ Award Winning Project
   URL: https://paradocc.vercel.app
   
4. 📊 GitHub Punchcard Widget
   Tech: Vercel Edge API, GitHub API, Next.js
   Status: ✅ Open Source Tool
   URL: https://punchcardwidget.vercel.app

Type 'github' to explore more projects!`
      
      case "contact":
        return `📧 Contact Information:

📮 Email: itsaliasgar18@gmail.com
🔗 LinkedIn: linkedin.com/in/aliasgar-sogiawala-09b24a1b8
🐙 GitHub: github.com/aliasgarsogiawala  
📱 Instagram: @aliasgar.sogiawala

💬 Let's connect and build something amazing together!
   Or just send a message to say hi! 👋`
      
      case "resume":
        window.open("/aliasgar_resume_.pdf", "_blank")
        return `📄 Resume download initiated...
✅ Opening resume in new tab!

Pro tip: Right-click → 'Save As' to download locally 💾`
      
      case "ascii":
        return asciiArt
      
      case "fortune":
        const randomQuote = fortuneQuotes[Math.floor(Math.random() * fortuneQuotes.length)]
        return `🔮 Developer Fortune:

"${randomQuote}"

Want another? Just type 'fortune' again! ✨`
      
      case "theanswer":
        return `🤖 Deep Thought says:

The Answer to the Ultimate Question of
Life, the Universe, and Everything is...

                    42

Don't panic! 🚀`
      
      case "matrix":
        setMatrixActive(!matrixActive)
        return matrixActive ? 
          `🔴 Matrix effect disabled. Welcome back to reality.
          
"You take the blue pill... the story ends." - Morpheus` :
          `🟢 Matrix effect activated. Follow the white rabbit... 🐰

"This is your last chance. After this, there is no going back." 
"You take the blue pill—the story ends, you wake up in your bed and believe whatever you want to believe. You take the red pill—you stay in Wonderland, and I show you how deep the rabbit hole goes."

- Morpheus, The Matrix

🌟 Look around... can you see the falling code?`
      
      case "github":
        return `🐙 GitHub Profile: aliasgarsogiawala

📂 Public Repositories:
┌─────────────────────────────────────────────────┐
│ 🏦 zillionite           Next.js, TypeScript     │
│ 🛡️ toursafe             Next.js, Clerk Auth     │  
│ 🏆 ParaDoc-dreamhacks   Hackathon Winner        │
│ 📊 punchcard-widget     Vercel Edge API         │
│ 📋 last-3-commits       GitHub API Tool         │
│ 🐍 Codes                Python Mini Projects    │
│ 📝 purchase-order       React PDF Generator     │
│ 🌐 React_Multipurpose   Multi-feature Web App   │
└─────────────────────────────────────────────────┘

🌟 GitHub Stats:
• 📈 20+ Public Repositories
• ⭐ Building meaningful projects since 2019
• 🔧 Languages: JavaScript, TypeScript, Python, Java
• 🚀 Frameworks: Next.js, React, Django, Flask

Visit: https://github.com/aliasgarsogiawala
Connect and explore my open-source contributions! 🤝`
      
      case "clear":
        setTerminalLines([])
        setCommandHistory([])
        return ""
      
      case "sudo hire-me":
        return `🚨 ALERT: SUDO ACCESS GRANTED 🚨

Executing hire_aliasgar.sh...
✅ Checking qualifications... PASSED
✅ Analyzing code quality... EXCELLENT  
✅ Testing problem-solving skills... OUTSTANDING
✅ Verifying passion for development... CONFIRMED

💼 Job offer generation in progress...
📧 Sending interview invitation...
🎉 SUCCESS! You won't regret this decision!

Warning: This developer may cause significant
improvements to your codebase and team productivity! ⚡`
      
      case "exit":
        setIsInteractive(false)
        return "👋 Switching back to demo mode..."
      
      default:
        if (command.startsWith("theme ")) {
          const themeName = command.split(" ")[1]
          setTheme(themeName)
          return `🎨 Theme changed to: ${themeName}
Available themes: default, cyberpunk, matrix, retro`
        }
        
        if (command.startsWith("ssh ")) {
          setIsLoading(true)
          setTimeout(() => setIsLoading(false), 2000)
          return `🔐 Connecting to ${command.split(" ")[1]}...
🖥️  Connected to Aliasgar's Portfolio Server
⚡ Connection established successfully!`
        }
        
        return `bash: ${cmd}: command not found
Type 'help' to see available commands 🤔`
    }
  }

  const handleCommandSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentInput.trim()) {
      const output = processCommand(currentInput)
      const newEntry = { command: currentInput, output }
      
      setCommandHistory(prev => [...prev, newEntry])
      setTerminalLines(prev => [...prev, 
        { type: "command", content: currentInput, timestamp: new Date().toLocaleTimeString() },
        { type: "output", content: output }
      ])
      
      setCurrentInput("")
      setCommandHistoryIndex(-1)
      
      // Auto-scroll to bottom
      setTimeout(() => {
        const terminal = document.getElementById("terminal-body")
        if (terminal) terminal.scrollTop = terminal.scrollHeight
      }, 100)
    }
    
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistoryIndex < commandHistory.length - 1) {
        const newIndex = commandHistoryIndex + 1
        setCommandHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex].command)
      }
    }
    
    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (commandHistoryIndex > 0) {
        const newIndex = commandHistoryIndex - 1
        setCommandHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex].command)
      } else if (commandHistoryIndex === 0) {
        setCommandHistoryIndex(-1)
        setCurrentInput("")
      }
    }
    
    if (e.key === "Tab") {
      e.preventDefault()
      const commands = ["help", "whoami", "neofetch", "skills", "projects", "contact", "resume", "ascii", "fortune", "clear", "matrix", "theme", "exit"]
      const matches = commands.filter(cmd => cmd.startsWith(currentInput.toLowerCase()))
      if (matches.length === 1) {
        setCurrentInput(matches[0])
      }
    }
  }

  // Auto-demo mode
  useEffect(() => {
    if (!isInteractive) {
      const timer = setInterval(() => {
        setCurrentCommand((prev) => (prev + 1) % demoCommands.length)
      }, 6000)
      return () => clearInterval(timer)
    }
  }, [isInteractive])

  // Matrix effect
  useEffect(() => {
    if (matrixActive) {
      const matrix = setInterval(() => {
        const chars = matrixChars[Math.floor(Math.random() * matrixChars.length)]
        // Matrix effect implementation would go here
      }, 100)
      return () => clearInterval(matrix)
    }
  }, [matrixActive])

  const getThemeClass = () => {
    switch(theme) {
      case "cyberpunk":
        return "from-purple-900 via-pink-800 to-purple-900 border-pink-500"
      case "matrix":
        return "from-green-900 via-black to-green-900 border-green-400"
      case "retro":
        return "from-orange-900 via-yellow-800 to-orange-900 border-orange-400"
      default:
        return "from-gray-900 via-gray-800 to-black border-gray-700"
    }
  }

  return (
    <div className="relative w-full h-full">
      <div className={`absolute inset-0 bg-gradient-to-br ${getThemeClass()} rounded-xl overflow-hidden shadow-2xl border-2`}>
        {/* Matrix Effect Overlay */}
        {matrixActive && <MatrixRain />}

        {/* Terminal Header */}
        <div className="flex items-center justify-between p-4 bg-black/20 border-b border-gray-600 backdrop-blur-sm">
          <div className="flex space-x-2">
            <div 
              className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors cursor-pointer hover:scale-110 transform"
              onClick={() => setIsInteractive(false)}
              title="Close"
            />
            <div 
              className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors cursor-pointer hover:scale-110 transform"
              title="Minimize"
            />
            <div 
              className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors cursor-pointer hover:scale-110 transform"
              onClick={() => setIsInteractive(true)}
              title="Maximize / Interactive Mode"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-sm font-mono">
              {isInteractive ? "🟢 INTERACTIVE" : "🔄 DEMO MODE"}
            </span>
            <span className="text-gray-400 text-xs font-mono">
              terminal@portfolio:~
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsInteractive(!isInteractive)}
              className="text-cyan-400 hover:text-cyan-300 text-xs font-mono px-2 py-1 border border-cyan-400/30 rounded hover:bg-cyan-400/10 transition-all"
            >
              {isInteractive ? "DEMO" : "LIVE"}
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          id="terminal-body"
          className="p-6 h-[calc(100%-4rem)] font-mono text-sm leading-relaxed overflow-y-auto"
          style={{scrollbarWidth: 'thin', scrollbarColor: '#4B5563 transparent'}}
        >
          {/* Boot Message */}
          <div className="mb-6 text-gray-300">
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              className="text-cyan-400"
            >
              🚀 Portfolio Terminal v3.0 - {new Date().toLocaleDateString()}
            </motion.div>
            <div className="mt-2 text-gray-400">
              Welcome to Aliasgar's Interactive Developer Terminal
            </div>
            <div className="text-gray-500 text-xs mt-1 flex items-center space-x-4">
              <span>💡 Click green button for interactive mode</span>
              <span>📖 Type 'help' for commands</span>
              <span>⌨️ Use Tab for autocomplete</span>
            </div>
          </div>

          {!isInteractive ? (
            // Demo Mode - Auto-playing commands
            <>
              {/* Previous Demo Commands */}
              {demoCommands.slice(0, currentCommand).map((cmd, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="mb-4"
                >
                  <div className="flex items-center text-gray-300">
                    <span className="text-cyan-400 mr-2">aliasgar@portfolio</span>
                    <span className="text-white mr-2">:</span>
                    <span className="text-blue-400 mr-2">~</span>
                    <span className="text-white mr-2">$</span>
                    <span className="text-green-400">{cmd.command}</span>
                  </div>
                  <div className="mt-1 text-gray-200 ml-0 pl-0 whitespace-pre-line">
                    {cmd.output}
                  </div>
                </motion.div>
              ))}

              {/* Current Typing Command */}
              <motion.div
                key={currentCommand}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4"
              >
                <div className="flex items-center text-gray-300">
                  <span className="text-cyan-400 mr-2">aliasgar@portfolio</span>
                  <span className="text-white mr-2">:</span>
                  <span className="text-blue-400 mr-2">~</span>
                  <span className="text-white mr-2">$</span>
                  <span className="text-green-400">
                    <Typewriter
                      words={[demoCommands[currentCommand].command]}
                      loop={1}
                      cursor={false}
                      typeSpeed={100}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                    <span className="text-white animate-pulse ml-1">|</span>
                  </span>
                </div>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ delay: 2, duration: 0.5 }}
                  className="mt-1 text-gray-200 ml-0 pl-0 overflow-hidden whitespace-pre-line"
                >
                  <Typewriter
                    words={[demoCommands[currentCommand].output]}
                    loop={1}
                    cursor={false}
                    typeSpeed={30}
                    deleteSpeed={20}
                    delaySpeed={2500}
                  />
                </motion.div>
              </motion.div>
            </>
          ) : (
            // Interactive Mode
            <>
              {/* Command History */}
              {terminalLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-2"
                >
                  {line.type === "command" ? (
                    <div className="flex items-center text-gray-300">
                      <span className="text-cyan-400 mr-2">aliasgar@portfolio</span>
                      <span className="text-white mr-2">:</span>
                      <span className="text-blue-400 mr-2">~</span>
                      <span className="text-white mr-2">$</span>
                      <span className="text-green-400">{line.content}</span>
                      {line.timestamp && (
                        <span className="text-gray-500 text-xs ml-4">
                          [{line.timestamp}]
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-200 ml-0 pl-0 whitespace-pre-line">
                      {line.content}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-center text-cyan-400 mb-4">
                  <span className="animate-spin mr-2">⚡</span>
                  <span>Processing...</span>
                </div>
              )}

              {/* Active Input Prompt */}
              <div className="flex items-center text-gray-300">
                <span className="text-cyan-400 mr-2">aliasgar@portfolio</span>
                <span className="text-white mr-2">:</span>
                <span className="text-blue-400 mr-2">~</span>
                <span className="text-white mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleCommandSubmit}
                  className="bg-transparent text-green-400 outline-none flex-1 font-mono caret-green-400"
                  placeholder="Type a command... (try 'help')"
                  autoFocus
                  spellCheck={false}
                />
              </div>
            </>
          )}
          
          {/* Bottom spacing */}
          <div className="h-4"></div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

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

    const techIconsContainer = document.createElement("div")
    techIconsContainer.className = "absolute inset-0 pointer-events-none"
    heroRef.current?.appendChild(techIconsContainer)

    const techIcons = [
      "react", "nextdotjs", "typescript", "tailwindcss",
      "git", "framer", "canva", "figma", "javascript", "python",
      "docker", "postgresql", "firebase", "vercel",
      "huggingface", "openai", "supabase", "python"
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

          {/* Right Side - Mini Terminal */}
          <motion.div
            variants={rightSideVariants}
            initial="hidden"
            animate="visible"
            className="relative h-full flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg h-96 lg:h-[500px]">
              <MiniTerminal />
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
