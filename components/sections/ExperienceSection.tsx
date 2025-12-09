"use client"

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ExperienceSectionProps {
  experience: any[]
}
 
export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="min-h-screen py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        Experience
      </motion.h2>
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-[#1A1A1A] rounded-lg">
                    <img 
                      src={exp.logo} 
                      alt={exp.company}
                      className="w-5 h-5 object-contain logo-icon"
                    />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="flex items-center justify-between">
                      {exp.title}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <CardDescription>
                      {exp.company} • {exp.duration} • {exp.location}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                <div className="text-sm">
                  <strong>Tools:</strong> {exp.tools}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}