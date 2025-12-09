"use client"

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface CertificationsSectionProps {
  certifications: any[]
} 

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="min-h-screen py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        Certifications
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group" onClick={() => window.open(cert.link, '_blank')}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-white/10 rounded-lg backdrop-blur-sm">
                    <img 
                      src={cert.logo} 
                      alt={cert.organization}
                      className="w-5 h-5 object-contain logo-icon"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-relaxed">
                      {cert.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {cert.organization} • {cert.year}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}