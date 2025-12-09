"use client"

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState, useEffect } from 'react'

interface AboutSectionProps {
  personal: any
  skills: any
}

export default function AboutSection({ personal, skills }: AboutSectionProps) {
  const [randomSlogan, setRandomSlogan] = useState('')

  useEffect(() => {
    if (personal.slogans && personal.slogans.length > 0) {
      const randomIndex = Math.floor(Math.random() * personal.slogans.length)
      setRandomSlogan(personal.slogans[randomIndex])
    }
  }, [])
  return (
    <section id="about" className="min-h-screen py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold m-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          {personal.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-2"
        >
          {personal.title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl font-medium text-blue-400 mb-8 italic"
        >
          "{randomSlogan}"
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-8"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {personal.location}
          </div>
          {/* <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {personal.phone}
          </div> */}
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {personal.email}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-6 mb-12"
        >
          <a href={`https://github.com/${personal.github}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-400 transition-colors">
            <Github className="w-6 h-6" />
          </a>
          <a href={`https://linkedin.com/in/${personal.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-blue-400 transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
          <CardHeader className="text-center">
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{personal.about}</p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
            <CardHeader>
              <CardTitle>Programming Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.programmingLanguages.map((skill: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
            <CardHeader>
              <CardTitle>Quant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.quant.map((skill: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
            <CardHeader>
              <CardTitle>Data Science & ML</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.dataScience.map((skill: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
        >
          <Card className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
            <CardHeader>
              <CardTitle>Data Engineering</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.dataEngineering.map((skill: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}