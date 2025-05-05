"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40"
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-full bg-primary w-8 h-8 text-primary-foreground font-bold">
            A
          </div>
          <span className="font-bold text-lg">Aliasgar's Portfolio</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
            Projects
          </Link>
          <Link href="#skills" className="text-sm font-medium hover:text-primary transition-colors">
            Skills
          </Link>
          <Link href="#experience" className="text-sm font-medium hover:text-primary transition-colors">
            Experience
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <a 
            href="/aliasgar_resume_.pdf"
            download
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full hidden md:flex bg-primary text-black"
            >
              Download CV
            </Button>
          </a>
         
        </div>
      </div>
    </motion.header>
  )
}