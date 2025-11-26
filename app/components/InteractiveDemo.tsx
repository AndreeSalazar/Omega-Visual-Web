'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Terminal, Settings2 } from 'lucide-react'
import { useI18n } from '@/lib/i18n-context'

interface Node {
  id: string
  x: number
  y: number
  label: string
  code: string
  connections: string[]
  isDragging?: boolean
}

const initialNodes: Node[] = [
  {
    id: 'hello_world',
    x: 200,
    y: 150,
    label: 'hello_world.asm',
    code: `; Hello World Bootloader
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
    x: 450,
    y: 150,
    label: 'kernel.asm',
    code: `; Kernel initialization
section .text
global kernel_main

kernel_main:
    mov esp, stack_top
    mov esi, welcome_msg
    call print_string
    jmp main_loop

print_string:
    mov edi, 0xB8000
    mov ah, 0x0F
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
    x: 700,
    y: 150,
    label: 'Output',
    code: `; Compiled output
; Binary: hello_world.bin
; Size: 512 bytes
; Status: Success

Execution result:
> Compiling hello_world.asm...
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
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [selectedNode, setSelectedNode] = useState<Node | null>(nodes[0])
  const [isRunning, setIsRunning] = useState(false)
  const [terminalOutput, setTerminalOutput] = useState('')
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
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
      nodes.forEach((node, nodeIndex) => {
        node.connections.forEach((targetId) => {
          const target = nodes.find((n) => n.id === targetId)
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

        if (particles.length < 10) {
          nodes.forEach((node, nodeIndex) => {
            node.connections.forEach(() => {
              if (Math.random() > 0.7) {
                particles.push({
                  x: node.x + 80,
                  y: node.y + 20,
                  progress: 0,
                  connectionIndex: nodeIndex,
                })
              }
            })
          })
        }

        particles.forEach((particle) => {
          const node = nodes[particle.connectionIndex]
          const target = nodes.find((n) => node.connections.includes(n.id))
          if (target) {
            const startX = node.x + 80
            const startY = node.y + 20
            const endX = target.x - 80
            const endY = target.y + 20

            const currentX = startX + (endX - startX) * particle.progress
            const currentY = startY + (endY - startY) * particle.progress

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
      nodes.forEach((node) => {
        drawNode(ctx, node, node === selectedNode)
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const x = (e.clientX - rect.left) * scaleX
      const y = (e.clientY - rect.top) * scaleY

      const clickedNode = nodes.find((node) => {
        const nodeX = node.x - 80
        const nodeY = node.y - 20
        return x >= nodeX && x <= nodeX + 160 && y >= nodeY && y <= nodeY + 80
      })

      if (clickedNode) {
        // Check if clicking on play button
        const playButtonX = clickedNode.x + 50
        const playButtonY = clickedNode.y - 10
        const playButtonSize = 20
        const distToPlay = Math.sqrt(
          Math.pow(x - playButtonX, 2) + Math.pow(y - playButtonY, 2)
        )

        if (distToPlay < playButtonSize) {
          // Clicked play button
          handleNodePlay(clickedNode.id)
          return
        }

        // Start dragging
        setDraggedNode(clickedNode.id)
        setDragOffset({
          x: x - clickedNode.x,
          y: y - clickedNode.y,
        })
        setSelectedNode(clickedNode)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const x = (e.clientX - rect.left) * scaleX
      const y = (e.clientY - rect.top) * scaleY

      if (draggedNode) {
        setNodes((prevNodes) =>
          prevNodes.map((node) =>
            node.id === draggedNode
              ? { ...node, x: x - dragOffset.x, y: y - dragOffset.y }
              : node
          )
        )
      } else {
        const hoveredNode = nodes.find((node) => {
          const nodeX = node.x - 80
          const nodeY = node.y - 20
          return x >= nodeX && x <= nodeX + 160 && y >= nodeY && y <= nodeY + 80
        })

        if (hoveredNode) {
          const playButtonX = hoveredNode.x + 50
          const playButtonY = hoveredNode.y - 10
          const playButtonSize = 20
          const distToPlay = Math.sqrt(
            Math.pow(x - playButtonX, 2) + Math.pow(y - playButtonY, 2)
          )

          canvas.style.cursor = distToPlay < playButtonSize ? 'pointer' : 'grab'
        } else {
          canvas.style.cursor = 'default'
        }
      }
    }

    const handleMouseUp = () => {
      setDraggedNode(null)
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', handleMouseUp)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mouseleave', handleMouseUp)
      cancelAnimationFrame(animationFrameId)
    }
  }, [nodes, selectedNode, isRunning, draggedNode, dragOffset])

  const handleNodePlay = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId)
    if (node && node.id === 'hello_world') {
      setIsRunning(true)
      setTerminalOutput('> Compiling hello_world.asm...\n> Linking...\n')
      setTimeout(() => {
        setTerminalOutput((prev) => prev + '> Success!\n> Hello, World!\n')
        setTimeout(() => setIsRunning(false), 2000)
      }, 1500)
    }
  }

  const drawConnection = (ctx: CanvasRenderingContext2D, from: Node, to: Node, index: number) => {
    const isActive = isRunning || (selectedNode && (selectedNode === from || selectedNode === to))
    
    const gradient = ctx.createLinearGradient(from.x + 80, from.y + 20, to.x - 80, to.y + 20)
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
    ctx.moveTo(from.x + 80, from.y + 20)
    ctx.bezierCurveTo(
      from.x + 120,
      from.y + 20,
      to.x - 120,
      to.y + 20,
      to.x - 80,
      to.y + 20
    )
    ctx.stroke()
    ctx.shadowBlur = 0
  }

  const drawNode = (ctx: CanvasRenderingContext2D, node: Node, isSelected: boolean) => {
    const x = node.x - 80
    const y = node.y - 20
    const width = 160
    const height = 80
    const radius = 8

    // Outer glow for selected nodes
    if (isSelected) {
      ctx.shadowBlur = 25
      ctx.shadowColor = 'rgba(255, 107, 53, 0.6)'
    }

    // Header (orange-brown gradient)
    const headerHeight = 30
    const headerGradient = ctx.createLinearGradient(x, y, x, y + headerHeight)
    headerGradient.addColorStop(0, 'rgba(139, 69, 19, 0.9)')
    headerGradient.addColorStop(1, 'rgba(101, 50, 14, 0.9)')

    ctx.fillStyle = headerGradient
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + headerHeight)
    ctx.lineTo(x, y + headerHeight)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
    ctx.fill()

    // Body (dark grey)
    const bodyGradient = ctx.createLinearGradient(x, y + headerHeight, x, y + height)
    bodyGradient.addColorStop(0, 'rgba(26, 31, 58, 0.95)')
    bodyGradient.addColorStop(1, 'rgba(10, 14, 39, 0.95)')

    ctx.fillStyle = bodyGradient
    ctx.beginPath()
    ctx.moveTo(x, y + headerHeight)
    ctx.lineTo(x + width, y + headerHeight)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.closePath()
    ctx.fill()

    // Border
    const borderGradient = ctx.createLinearGradient(x, y, x + width, y + height)
    if (isSelected) {
      borderGradient.addColorStop(0, '#FF6B35')
      borderGradient.addColorStop(0.5, '#00D9FF')
      borderGradient.addColorStop(1, '#FF6B35')
    } else {
      borderGradient.addColorStop(0, 'rgba(255, 107, 53, 0.5)')
      borderGradient.addColorStop(1, 'rgba(255, 107, 53, 0.3)')
    }
    
    ctx.strokeStyle = borderGradient
    ctx.lineWidth = isSelected ? 3 : 2
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
    ctx.stroke()
    ctx.shadowBlur = 0

    // Icon in header (left side)
    ctx.fillStyle = 'rgba(200, 200, 200, 0.8)'
    ctx.font = 'bold 12px Inter'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'middle'
    const iconX = x + 10
    const iconY = y + headerHeight / 2
    // Draw simple gear icon representation
    ctx.beginPath()
    ctx.arc(iconX, iconY, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = 'rgba(26, 31, 58, 0.9)'
    ctx.beginPath()
    ctx.arc(iconX, iconY, 3, 0, Math.PI * 2)
    ctx.fill()

    // Label in header
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 12px Inter'
    ctx.textAlign = 'left'
    ctx.fillText(node.label, x + 25, y + headerHeight / 2)

    // Play button in header (right side)
    const playButtonX = node.x + 50
    const playButtonY = node.y - 10
    const playButtonSize = 18
    
    // Play button background (orange-yellow)
    const playGradient = ctx.createRadialGradient(
      playButtonX, playButtonY, 0,
      playButtonX, playButtonY, playButtonSize
    )
    playGradient.addColorStop(0, 'rgba(255, 200, 0, 1)')
    playGradient.addColorStop(1, 'rgba(255, 140, 0, 1)')
    
    ctx.fillStyle = playGradient
    ctx.beginPath()
    ctx.arc(playButtonX, playButtonY, playButtonSize, 0, Math.PI * 2)
    ctx.fill()
    
    // Play button border
    ctx.strokeStyle = 'rgba(255, 200, 0, 0.8)'
    ctx.lineWidth = 2
    ctx.stroke()
    
    // Play triangle
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.moveTo(playButtonX - 4, playButtonY - 5)
    ctx.lineTo(playButtonX - 4, playButtonY + 5)
    ctx.lineTo(playButtonX + 6, playButtonY)
    ctx.closePath()
    ctx.fill()

    // Connection points
    const connectionColor = isSelected ? 'rgba(255, 107, 53, 0.9)' : 'rgba(0, 217, 255, 0.6)'
    
    // Left connection point (IN)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.beginPath()
    ctx.arc(x, node.y + 20, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = connectionColor
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.fillStyle = '#000000'
    ctx.font = 'bold 8px Inter'
    ctx.textAlign = 'center'
    ctx.fillText('IN', x, node.y + 20)
    
    // Right connection point (OUT)
    ctx.fillStyle = connectionColor
    ctx.beginPath()
    ctx.arc(x + width, node.y + 20, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 8px Inter'
    ctx.fillText('OUT', x + width, node.y + 20)
  }

  const handleRun = () => {
    setIsRunning(true)
    setTerminalOutput('> Compiling hello_world.asm...\n> Compiling kernel.asm...\n> Linking...\n')

    setTimeout(() => {
      setTerminalOutput((prev) => prev + '> Success!\n> Hello, World!\n> Kernel loaded!\n')
      setTimeout(() => setIsRunning(false), 2000)
    }, 1500)
  }

  return (
    <section id="demo" className="py-24 bg-gradient-to-b from-background via-surface/30 to-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,217,255,0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-black mb-4 text-gradient"
          >
            {t.demo.title}
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Canvas Section */}
          <div className="lg:col-span-3">
            <div className="glass-effect rounded-2xl p-6 border-2 border-text/20 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-text">{t.demo.canvasTitle}</h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRun}
                  disabled={isRunning}
                  className="px-6 py-3 bg-gradient-primary rounded-lg text-white flex items-center gap-2 disabled:opacity-50 relative overflow-hidden group shadow-lg"
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
                        <Play size={18} />
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

              <div className="relative bg-background rounded-lg overflow-hidden border-2 border-text/20">
                <canvas
                  ref={canvasRef}
                  width={900}
                  height={400}
                  className="w-full h-auto cursor-grab active:cursor-grabbing"
                />
                {!isRunning && (
                  <div className="absolute top-4 left-4 text-xs text-text/50 font-mono bg-background/80 px-2 py-1 rounded">
                    {t.demo.clickNodes || 'Click nodes to view code • Drag to move'}
                  </div>
                )}
              </div>

              {/* Terminal Output */}
              <div className="mt-4 glass-effect rounded-lg p-4 border border-text/20">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal size={18} className="text-secondary" />
                  <span className="text-sm font-semibold text-text">{t.demo.terminalOutput}</span>
                </div>
                <pre className="text-sm text-text/80 font-mono whitespace-pre-wrap min-h-[80px]">
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

          {/* Code Panel */}
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-2xl p-6 border-2 border-text/20 shadow-2xl h-full">
              <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                <Settings2 size={20} className="text-primary" />
                {selectedNode?.label || t.demo.selectNode}
              </h3>
              <div className="bg-background rounded-lg p-4 overflow-auto max-h-[600px] border border-text/20">
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
