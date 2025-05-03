import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import About from "@/components/about"
import Contact from "@/components/contact"
import Header from "@/components/header"
import SplashScreen from "@/components/splash-screen"
import Experience from "@/components/experience"

export default function Home() {
  return (
    <main className="min-h-screen">
      <SplashScreen />
      <Header />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <About />
      <Contact />
    </main>
  )
}
