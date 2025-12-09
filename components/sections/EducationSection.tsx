"use client"

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface EducationSectionProps {
  education: any[]
}
 
export default function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="min-h-screen py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        Education
      </motion.h2>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group" onClick={() => window.open(edu.link, '_blank')}>
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-white/10 rounded-lg backdrop-blur-sm">
                    <img 
                      src={edu.logo} 
                      alt={edu.institution}
                      className="w-5 h-5 object-contain logo-icon"
                    />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="flex items-center justify-between">
                      {edu.degree}
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <CardDescription>
                      {edu.institution} • {edu.duration}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{edu.details}</p>
                {edu.grade && <p className="text-sm font-medium text-green-400">{edu.grade}</p>}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}