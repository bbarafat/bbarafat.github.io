"use client"

import ThemeToggle from '@/components/ThemeToggle'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import AboutSection from '@/components/sections/AboutSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import EducationSection from '@/components/sections/EducationSection'
import CertificationsSection from '@/components/sections/CertificationsSection'
import profileData from '@/data/profile.json'

export default function Home() {
  const { personal, skills, experience, projects, education, certifications } = profileData

  return (
    <div className="min-h-screen">
      <ThemeToggle />
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <AboutSection personal={personal} skills={skills} />
        <ExperienceSection experience={experience} />
        <ProjectsSection projects={projects} />
        <EducationSection education={education} />
        <CertificationsSection certifications={certifications} />
      </div>
      <Footer />
    </div>
  )
}