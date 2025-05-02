"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Typewriter effect hook
const useTypewriter = (text: string, speed: number = 100, startTyping: boolean = true) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (!startTyping) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      
      return () => clearTimeout(timeout)
    } else {
      setIsDone(true)
    }
  }, [currentIndex, speed, text, startTyping])

  return { displayText, isDone }
}

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const { displayText: nameText, isDone: nameIsDone } = useTypewriter("Aliasgar Sogiawala", 80, isMounted)
  const { displayText: roleText, isDone: roleIsDone } = useTypewriter("Full Stack Developer", 80, nameIsDone)

  // Use refs to store window dimensions
  const windowSize = useRef({ width: 1200, height: 800 })

  useEffect(() => {
    // Set isMounted to true when component mounts in browser
    setIsMounted(true)
    
    // Update window dimensions
    windowSize.current = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  // Generate random positions safely
  const getRandomPosition = (index: number) => {
    // Use deterministic values based on index for server rendering
    const baseX = (index * 100) % windowSize.current.width
    const baseY = (index * 150) % windowSize.current.height
    
    if (!isMounted) {
      return { x: baseX, y: baseY }
    }
    
    return {
      x: Math.random() * windowSize.current.width,
      y: Math.random() * windowSize.current.height
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Floating tech logos */}
            
          <motion.div
            className="flex flex-col items-center z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-4xl font-bold mb-4"
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 1.5,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 0.5
              }}
            >
              A
            </motion.div>
            
            {/* Terminal-like container */}
            <motion.div 
              className="bg-black/80 rounded-md p-4 min-w-[300px] border border-primary/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* Terminal header */}
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <div className="text-xs text-gray-400 ml-2">portfolio.sh</div>
              </div>
              
              {/* Command line */}
              <div className="font-mono text-green-400 text-sm">
                <span className="text-blue-400">$ </span>
                <span className="text-yellow-400">init </span>
                <span>{nameText}</span>
                {!nameIsDone && (
                  <motion.span
                    animate={{ opacity: [0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-4 bg-white ml-1"
                  ></motion.span>
                )}
              </div>
              
              <div className="font-mono text-green-400 text-sm mt-1">
                <span className="text-blue-400">$ </span>
                <span className="text-yellow-400">role </span>
                <span>{roleText}</span>
                {nameIsDone && (
                  <motion.span
                    animate={{ opacity: [0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-4 bg-white ml-1"
                  ></motion.span>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}