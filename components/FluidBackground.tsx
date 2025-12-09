"use client"

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
}

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const initParticles = () => {
      particlesRef.current = []
      // Increased particle count for denser, more luxurious feel
      for (let i = 0; i < 120; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.25, // Slower, more gentle movement
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 2.5 + 0.5, // Varied sizes
          opacity: Math.random() * 0.4 + 0.2,
          hue: 175 + Math.random() * 20 // Soft teal-cyan range
        })
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }
    resize()
    window.addEventListener('resize', resize)

    const drawHexagon = (x: number, y: number, size: number, mouseX: number, mouseY: number, time: number) => {
      const distance = Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2)
      const intensity = Math.max(0, 1 - distance / 200) // Wider interaction radius
      const pulse = Math.sin(time * 0.0015 + distance * 0.008) * 0.25 + 0.75 // Gentler pulse
      const isDark = document.documentElement.classList.contains('dark')

      // Softer, more subtle hexagons
      const baseOpacity = isDark ? 0.12 : 0.15
      const hoverOpacity = isDark ? 0.35 : 0.25

      // SOFT AQUA-TEAL: Desaturated for modern look - rgb(100, 200, 210)
      const finalOpacity = (baseOpacity + intensity * hoverOpacity) * pulse
      ctx.strokeStyle = `rgba(100, 200, 210, ${finalOpacity})`
      ctx.lineWidth = intensity * 1.5 + 0.5 // Thinner lines for elegance

      // Add subtle glow on hover
      if (intensity > 0.3) {
        ctx.shadowBlur = intensity * 15
        ctx.shadowColor = `rgba(100, 200, 210, ${intensity * 0.4})`
      }

      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const px = x + size * Math.cos(angle)
        const py = y + size * Math.sin(angle)
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.stroke()
      
      ctx.shadowBlur = 0 // Reset shadow
    }

    const drawParticles = () => {
      const isDark = document.documentElement.classList.contains('dark')

      particlesRef.current.forEach(particle => {
        // Gentle floating movement
        particle.x += particle.vx
        particle.y += particle.vy

        // Soft bounce
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.y = particle.y < 0 ? canvas.height : 0
        }

        const mouseDistance = Math.sqrt((particle.x - mouseRef.current.x) ** 2 + (particle.y - mouseRef.current.y) ** 2)
        const mouseEffect = Math.max(0, 1 - mouseDistance / 150)
        const finalOpacity = particle.opacity + mouseEffect * 0.3

        // Draw particle with soft glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        
        // SOFT GRADIENT: Create subtle color variation
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        )
        gradient.addColorStop(0, `hsla(${particle.hue}, 55%, 65%, ${finalOpacity * (isDark ? 0.5 : 0.25)})`)
        gradient.addColorStop(1, `hsla(${particle.hue}, 55%, 65%, 0)`)
        
        ctx.fillStyle = gradient
        ctx.fill()

        // Add subtle glow on mouse proximity
        if (mouseEffect > 0.2) {
          ctx.shadowBlur = mouseEffect * 8
          ctx.shadowColor = `hsla(${particle.hue}, 55%, 65%, ${mouseEffect * 0.3})`
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })
    }

    // Connection lines between nearby particles
    const drawConnections = () => {
      const isDark = document.documentElement.classList.contains('dark')
      const maxDistance = 120

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[j]
          const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.15
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(100, 200, 210, ${opacity * (isDark ? 1 : 0.8)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      timeRef.current += 16
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const hexSize = 20
      const hexWidth = hexSize * 2
      const hexHeight = hexSize * Math.sqrt(3)

      // Draw hexagon grid
      for (let row = 0; row * hexHeight * 0.75 < canvas.height + hexHeight; row++) {
        for (let col = 0; col * hexWidth * 0.75 < canvas.width + hexWidth; col++) {
          const x = col * hexWidth * 0.75 + (row % 2) * hexWidth * 0.375
          const y = row * hexHeight * 0.75
          drawHexagon(x, y, hexSize, mouseRef.current.x, mouseRef.current.y, timeRef.current)
        }
      }

      drawConnections() // Draw first so particles appear on top
      drawParticles()
      requestAnimationFrame(animate)
    }
    animate()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />
}