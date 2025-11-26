'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Terminal } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

interface Node {
  id: string
  x: number
  y: number
  label: string
  code: string
  connections: string[]
}

const initialNodes: Node[] = [
  {
    id: 'boot',
    x: 150,
    y: 200,
    label: 'boot.asm',
    code: `; Bootloader entry point
global _start
_start:
    mov ax, 0x07C0
    mov ds, ax
    mov si, msg
    call print
    hlt

print:
    lodsb
    or al, al
    jz done
    mov ah, 0x0E
    int 0x10
    jmp print
done:
    ret

msg db 'Hello, World!', 0`,
    connections: ['kernel'],
  },
  {
    id: 'kernel',
    x: 400,
    y: 200,
    label: 'kernel.asm',
    code: `; Kernel initialization
section .text
global kernel_main

kernel_main:
    ; Initialize stack
    mov esp, stack_top
    
    ; Print welcome message
    mov esi, welcome_msg
    call print_string
    
    ; Enter main loop
    jmp main_loop

print_string:
    mov edi, 0xB8000  ; VGA buffer
    mov ah, 0x0F      ; White on black
.loop:
    lodsb
    test al, al
    jz .done
    stosw
    jmp .loop
.done:
    ret

welcome_msg db 'Kernel loaded!', 0
stack_top:`,
    connections: ['output'],
  },
  {
    id: 'output',
    x: 650,
    y: 200,
    label: 'Output',
    code: `; Compiled output
; Binary: hello_world.bin
; Size: 512 bytes
; Status: Success

Execution result:
> Compiling boot.asm...
> Compiling kernel.asm...
> Linking...
> Success!
> Hello, World!
> Kernel loaded!`,
    connections: [],
  },
]

export default function InteractiveDemo() {
  const { t } = useI18n()
  const [selectedNode, setSelectedNode] = useState<Node | null>(initialNodes[0])
  const [isRunning, setIsRunning] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Array<{ x: number; y: number; progress: number; connectionIndex: number }> = []

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid background
      ctx.strokeStyle = 'rgba(224, 231, 255, 0.05)'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw connections
      initialNodes.forEach((node, nodeIndex) => {
        node.connections.forEach((targetId) => {
          const target = initialNodes.find((n) => n.id === targetId)
          if (target) {
            drawConnection(ctx, node, target, nodeIndex)
          }
        })
      })

      // Update and draw particles
      if (isRunning) {
        particles = particles.filter((p) => {
          p.progress += 0.02
          return p.progress < 1
        })

        // Add new particles
        if (particles.length < 10) {
          initialNodes.forEach((node, nodeIndex) => {
            node.connections.forEach(() => {
              if (Math.random() > 0.7) {
                particles.push({
                  x: node.x + 60,
                  y: node.y,
                  progress: 0,
                  connectionIndex: nodeIndex,
                })
              }
            })
          })
        }

        particles.forEach((particle) => {
          const node = initialNodes[particle.connectionIndex]
          const target = initialNodes.find((n) => node.connections.includes(n.id))
          if (target) {
            const startX = node.x + 60
            const startY = node.y
            const endX = target.x - 60
            const endY = target.y

            const currentX = startX + (endX - startX) * particle.progress
            const currentY = startY + (endY - startY) * particle.progress

            // Draw particle with glow
            const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 8)
            gradient.addColorStop(0, 'rgba(0, 217, 255, 1)')
            gradient.addColorStop(0.5, 'rgba(0, 217, 255, 0.5)')
            gradient.addColorStop(1, 'rgba(0, 217, 255, 0)')

            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(currentX, currentY, 8, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      }

      // Draw nodes
      initialNodes.forEach((node) => {
        drawNode(ctx, node, node === selectedNode)
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const x = (e.clientX - rect.left) * scaleX
      const y = (e.clientY - rect.top) * scaleY

      const clickedNode = initialNodes.find((node) => {
        const dx = x - node.x
        const dy = y - node.y
        return dx * dx + dy * dy < 60 * 60
      })

      if (clickedNode) {
        setSelectedNode(clickedNode)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const x = (e.clientX - rect.left) * scaleX
      const y = (e.clientY - rect.top) * scaleY

      const hoveredNode = initialNodes.find((node) => {
        const dx = x - node.x
        const dy = y - node.y
        return dx * dx + dy * dy < 60 * 60
      })

      canvas.style.cursor = hoveredNode ? 'pointer' : 'default'
    }

    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('mousemove', handleMouseMove)
    return () => {
      canvas.removeEventListener('click', handleClick)
      canvas.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [selectedNode, isRunning])

  const drawConnection = (ctx: CanvasRenderingContext2D, from: Node, to: Node, index: number) => {
    const isActive = isRunning || (selectedNode && (selectedNode === from || selectedNode === to))
    
    // Create gradient for connection
    const gradient = ctx.createLinearGradient(from.x + 60, from.y, to.x - 60, to.y)
    if (isRunning) {
      gradient.addColorStop(0, 'rgba(0, 217, 255, 0.8)')
      gradient.addColorStop(0.5, 'rgba(0, 217, 255, 1)')
      gradient.addColorStop(1, 'rgba(0, 217, 255, 0.8)')
    } else {
      gradient.addColorStop(0, isActive ? 'rgba(255, 107, 53, 0.6)' : 'rgba(255, 107, 53, 0.3)')
      gradient.addColorStop(1, isActive ? 'rgba(255, 107, 53, 0.6)' : 'rgba(255, 107, 53, 0.3)')
    }

    ctx.strokeStyle = gradient
    ctx.lineWidth = isActive ? 3 : 2
    ctx.shadowBlur = isRunning ? 10 : 0
    ctx.shadowColor = isRunning ? 'rgba(0, 217, 255, 0.5)' : 'transparent'
    
    ctx.beginPath()
    ctx.moveTo(from.x + 60, from.y)
    ctx.bezierCurveTo(
      from.x + 100,
      from.y,
      to.x - 100,
      to.y,
      to.x - 60,
      to.y
    )
    ctx.stroke()
    
    ctx.shadowBlur = 0
  }

  const drawNode = (ctx: CanvasRenderingContext2D, node: Node, isSelected: boolean) => {
    const x = node.x - 60
    const y = node.y - 30
    const width = 120
    const height = 60
    const radius = 12

    // Outer glow for selected nodes
    if (isSelected) {
      ctx.shadowBlur = 20
      ctx.shadowColor = 'rgba(255, 107, 53, 0.6)'
    }

    // Background gradient
    const bgGradient = ctx.createLinearGradient(x, y, x + width, y + height)
    if (isSelected) {
      bgGradient.addColorStop(0, 'rgba(255, 107, 53, 0.2)')
      bgGradient.addColorStop(0.5, 'rgba(0, 217, 255, 0.2)')
      bgGradient.addColorStop(1, 'rgba(255, 107, 53, 0.2)')
    } else {
      bgGradient.addColorStop(0, 'rgba(26, 31, 58, 0.9)')
      bgGradient.addColorStop(1, 'rgba(10, 14, 39, 0.9)')
    }

    // Draw rounded rectangle
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
    
    ctx.fillStyle = bgGradient
    ctx.fill()
    
    // Border gradient
    const borderGradient = ctx.createLinearGradient(x, y, x + width, y + height)
    if (isSelected) {
      borderGradient.addColorStop(0, '#FF6B35')
      borderGradient.addColorStop(0.5, '#00D9FF')
      borderGradient.addColorStop(1, '#FF6B35')
    } else {
      borderGradient.addColorStop(0, 'rgba(0, 217, 255, 0.4)')
      borderGradient.addColorStop(1, 'rgba(255, 107, 53, 0.4)')
    }
    
    ctx.strokeStyle = borderGradient
    ctx.lineWidth = isSelected ? 3 : 2
    ctx.stroke()
    ctx.shadowBlur = 0

    // Text with shadow
    ctx.fillStyle = isSelected ? '#FFFFFF' : '#E0E7FF'
    ctx.font = 'bold 14px Inter'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.shadowBlur = 4
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
    ctx.fillText(node.label, node.x, node.y)
    ctx.shadowBlur = 0

    // Connection points
    const connectionColor = isSelected ? 'rgba(255, 107, 53, 0.8)' : 'rgba(0, 217, 255, 0.5)'
    // Left connection point
    ctx.fillStyle = connectionColor
    ctx.beginPath()
    ctx.arc(x, node.y, 4, 0, Math.PI * 2)
    ctx.fill()
    // Right connection point
    ctx.beginPath()
    ctx.arc(x + width, node.y, 4, 0, Math.PI * 2)
    ctx.fill()
  }

  const handleRun = () => {
    setIsRunning(true)
    setTerminalOutput('> Compiling boot.asm...\n> Compiling kernel.asm...\n> Linking...\n')

    setTimeout(() => {
      setTerminalOutput((prev) => prev + '> Success!\n> Hello, World!\n> Kernel loaded!\n')
      setTimeout(() => setIsRunning(false), 2000)
    }, 1500)
  }

  return (
    <section id="demo" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center mb-16 text-gradient"
        >
          {t.demo.title}
        </motion.h2>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Canvas Section (60%) */}
          <div className="lg:col-span-3">
            <div className="bg-surface rounded-xl p-6 border border-text/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-text">{t.demo.canvasTitle}</h3>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 5px 20px rgba(255, 107, 53, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRun}
                  disabled={isRunning}
                  className="px-5 py-2.5 bg-gradient-primary rounded-lg text-white flex items-center gap-2 disabled:opacity-50 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {isRunning ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        {t.demo.running}
                      </>
                    ) : (
                      <>
                        <Play size={16} />
                        {t.demo.runDemo}
                      </>
                    )}
                  </span>
                  {!isRunning && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}
                </motion.button>
              </div>

              <div className="relative bg-background rounded-lg overflow-hidden border border-text/10">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={400}
                  className="w-full h-auto cursor-pointer"
                />
                {!isRunning && (
                  <div className="absolute top-4 left-4 text-xs text-text/40 font-mono">
                    Click nodes to view code
                  </div>
                )}
              </div>

              {/* Terminal Output */}
              <div className="mt-4 bg-background rounded-lg p-4 border border-text/10">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal size={16} className="text-secondary" />
                  <span className="text-sm text-text/60">{t.demo.terminalOutput}</span>
                </div>
                <pre className="text-sm text-text/80 font-mono whitespace-pre-wrap">
                  {terminalOutput ? (
                    terminalOutput.split('\n').map((line, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="block"
                      >
                        {line}
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-text/40">{t.demo.clickToRun}</span>
                  )}
                </pre>
              </div>
            </div>
          </div>

          {/* Code Panel (40%) */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-xl p-6 border border-text/10 h-full">
              <h3 className="text-xl font-bold text-text mb-4">
                {selectedNode?.label || t.demo.selectNode}
              </h3>
              <div className="bg-background rounded-lg p-4 overflow-auto max-h-[600px] border border-text/10">
                <pre className="text-sm text-text/90 font-mono leading-relaxed">
                  <code className="block">
                    {selectedNode?.code.split('\n').map((line, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.02 }}
                        className="block"
                      >
                        <span className="text-text/40 mr-4 select-none">{String(i + 1).padStart(3, ' ')}</span>
                        {line || '\u00A0'}
                      </motion.span>
                    )) || '// Select a node to view its code'}
                  </code>
                </pre>
              </div>
              <p className="text-sm text-text/60 mt-4">
                {t.demo.clickNodes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

