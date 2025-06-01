"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-md border-b border-cyan-200/50" 
          : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center rounded-full bg-cyan-600 w-8 h-8 text-white font-bold transition-transform group-hover:scale-110">
            A
          </div>
          <span className="font-bold text-lg relative overflow-hidden">
            <span className="inline-block transition-transform duration-300 group-hover:translate-y-[-100%]">
              Aliasgar's Portfolio
            </span>
            <span className="absolute top-0 left-0 inline-block translate-y-[100%] transition-transform duration-300 group-hover:translate-y-0 text-cyan-600">
              Aliasgar's Portfolio
            </span>
          </span>
        </Link>
        
        <nav className="hidden md:flex gap-6">
          {navItems.map((item, index) => (
            <Link 
              key={item.name}
              href={item.href} 
              className="text-sm font-medium relative group"
            >
              <span className="block transition-colors group-hover:text-cyan-600">
                {item.name}
              </span>
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <a 
            href="/aliasgar_resume_.pdf"
            download
            className="hidden md:block"
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full bg-cyan-600 text-white border-cyan-600 hover:bg-cyan-700 hover:scale-105 transition-all"
            >
              <span className="relative overflow-hidden inline-block">
                <span className="inline-block transition-transform duration-300 hover:translate-y-[-100%]">
                  Download CV
                </span>
                <span className="absolute top-0 left-0 inline-block translate-y-[100%] transition-transform duration-300 hover:translate-y-0">
                  Get Resume
                </span>
              </span>
            </Button>
          </a>
          
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-cyan-100 text-slate-700 hover:bg-cyan-200 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      <motion.div 
        className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[400px] border-b border-cyan-200/50' : 'max-h-0'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container px-4 py-4 flex flex-col space-y-4">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                href={item.href} 
                className="text-sm font-medium block py-2 hover:text-cyan-600 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: navItems.length * 0.1 }}
          >
            <a 
              href="/aliasgar_resume_.pdf"
              download
              className="block py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full bg-cyan-600 text-white border-cyan-600 w-full"
              >
                Download CV
              </Button>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  )
}