'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
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
  status?: 'idle' | 'processing' | 'executing' | 'completed'
}

const initialNodes: Node[] = [
  {
    id: 'hello_world',
    x: 200,
    y: 150,
    label: 'hello_world.asm',
    status: 'idle',
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
    status: 'idle',
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
    status: 'idle',
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
  const [animationTime, setAnimationTime] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseDownPosRef = useRef({ x: 0, y: 0 })
  const isDraggingRef = useRef(false)

  // Update animation time for continuous animations
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTime(Date.now() * 0.001)
    }, 16) // ~60fps
    return () => clearInterval(interval)
  }, [])

  const handleNodePlay = useCallback((nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId)
    if (node && node.id === 'hello_world') {
      setIsRunning(true)
      
      // Reset all nodes
      setNodes((prev) => prev.map((n) => ({ ...n, status: 'idle' as const })))
      
      // Step 1: First node executing
      setTimeout(() => {
        setNodes((prev) => prev.map((n) => 
          n.id === 'hello_world' ? { ...n, status: 'executing' as const } : n
        ))
        setTerminalOutput('> Compiling hello_world.asm...\n')
      }, 300)
      
      // Step 2: First node completes, second node processing
      setTimeout(() => {
        setNodes((prev) => prev.map((n) => 
          n.id === 'hello_world' ? { ...n, status: 'completed' as const } :
          n.id === 'kernel' ? { ...n, status: 'processing' as const } : n
        ))
        setTerminalOutput((prev) => prev + '> Linking...\n> Processing kernel.asm...\n')
      }, 1200)
      
      // Step 3: Second node executing
      setTimeout(() => {
        setNodes((prev) => prev.map((n) => 
          n.id === 'kernel' ? { ...n, status: 'executing' as const } : n
        ))
        setTerminalOutput((prev) => prev + '> Executing kernel...\n')
      }, 2000)
      
      // Step 4: Second node completes, third node executing
      setTimeout(() => {
        setNodes((prev) => prev.map((n) => 
          n.id === 'kernel' ? { ...n, status: 'completed' as const } :
          n.id === 'output' ? { ...n, status: 'executing' as const } : n
        ))
        setTerminalOutput((prev) => prev + '> Success!\n> Hello, World!\n> Kernel loaded!\n')
      }, 2800)
      
      // Step 5: All complete
      setTimeout(() => {
        setNodes((prev) => prev.map((n) => ({ ...n, status: 'completed' as const })))
        setTimeout(() => {
          setIsRunning(false)
          setNodes((prev) => prev.map((n) => ({ ...n, status: 'idle' as const })))
        }, 2000)
      }, 3500)
    }
  }, [nodes])

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

      // Draw nodes with continuous animation
      nodes.forEach((node) => {
        drawNode(ctx, node, node === selectedNode, animationTime)
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    const dragThreshold = 5 // pixels

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const x = (e.clientX - rect.left) * scaleX
      const y = (e.clientY - rect.top) * scaleY

      mouseDownPosRef.current = { x, y }
      isDraggingRef.current = false

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
          // Clicked play button - don't drag
          handleNodePlay(clickedNode.id)
          setSelectedNode(clickedNode)
          return
        }

        // Select the node immediately (for viewing code)
        setSelectedNode(clickedNode)
        
        // Store drag offset and prepare for potential drag
        setDragOffset({
          x: x - clickedNode.x,
          y: y - clickedNode.y,
        })
        // Set draggedNode so we can track it in mousemove
        setDraggedNode(clickedNode.id)
      } else {
        // Clicked outside - deselect
        setSelectedNode(null)
        setDraggedNode(null)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height
      const x = (e.clientX - rect.left) * scaleX
      const y = (e.clientY - rect.top) * scaleY

      // Check if we should start dragging (mouse moved enough from initial click)
      if (draggedNode && !isDraggingRef.current) {
        const dx = x - mouseDownPosRef.current.x
        const dy = y - mouseDownPosRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance > dragThreshold) {
          // Start dragging
          isDraggingRef.current = true
        }
      }

      if (draggedNode && isDraggingRef.current) {
        // Actually dragging - move the node
        setNodes((prevNodes) =>
          prevNodes.map((node) =>
            node.id === draggedNode
              ? { ...node, x: x - dragOffset.x, y: y - dragOffset.y }
              : node
          )
        )
        canvas.style.cursor = 'grabbing'
      } else if (draggedNode && !isDraggingRef.current) {
        // Node selected but not dragging yet
        canvas.style.cursor = 'grab'
      } else {
        // Not dragging - check for hover
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
      // Reset drag state
      setDraggedNode(null)
      isDraggingRef.current = false
      mouseDownPosRef.current = { x: 0, y: 0 }
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
  }, [nodes, selectedNode, isRunning, draggedNode, dragOffset, animationTime, handleNodePlay])

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

  const drawNode = (ctx: CanvasRenderingContext2D, node: Node, isSelected: boolean, time: number) => {
    const x = node.x - 80
    const y = node.y - 20
    const width = 160
    const height = 80
    const radius = 8

    // Status-based glow and colors
    let statusGlow = { blur: 0, color: 'transparent', intensity: 0 }
    let statusBorderColor = 'rgba(255, 107, 53, 0.5)'
    
    if (node.status === 'executing') {
      statusGlow = {
        blur: 30 + Math.sin(time * 5) * 10,
        color: 'rgba(0, 217, 255, 0.8)',
        intensity: 0.8 + Math.sin(time * 5) * 0.2
      }
      statusBorderColor = 'rgba(0, 217, 255, 0.9)'
    } else if (node.status === 'processing') {
      statusGlow = {
        blur: 25 + Math.sin(time * 3) * 8,
        color: 'rgba(255, 200, 0, 0.7)',
        intensity: 0.7 + Math.sin(time * 3) * 0.2
      }
      statusBorderColor = 'rgba(255, 200, 0, 0.8)'
    } else if (node.status === 'completed') {
      statusGlow = {
        blur: 20,
        color: 'rgba(0, 255, 150, 0.6)',
        intensity: 0.6
      }
      statusBorderColor = 'rgba(0, 255, 150, 0.7)'
    } else if (isSelected) {
      statusGlow = {
        blur: 25,
        color: 'rgba(255, 107, 53, 0.6)',
        intensity: 0.6
      }
      statusBorderColor = 'rgba(255, 107, 53, 0.8)'
    }

    // Outer glow
    if (statusGlow.blur > 0) {
      ctx.shadowBlur = statusGlow.blur
      ctx.shadowColor = statusGlow.color
    }

    // Header (orange-brown gradient with status animation)
    const headerHeight = 30
    let headerGradient = ctx.createLinearGradient(x, y, x, y + headerHeight)
    
    if (node.status === 'executing') {
      const pulse = Math.sin(time * 5) * 0.2 + 0.8
      headerGradient.addColorStop(0, `rgba(${139 * pulse}, ${69 * pulse}, ${19 * pulse}, 0.95)`)
      headerGradient.addColorStop(1, `rgba(${101 * pulse}, ${50 * pulse}, ${14 * pulse}, 0.95)`)
    } else if (node.status === 'processing') {
      const pulse = Math.sin(time * 3) * 0.15 + 0.85
      headerGradient.addColorStop(0, `rgba(${255 * pulse}, ${200 * pulse}, ${0}, 0.9)`)
      headerGradient.addColorStop(1, `rgba(${255 * pulse * 0.8}, ${140 * pulse}, ${0}, 0.9)`)
    } else {
      headerGradient.addColorStop(0, 'rgba(139, 69, 19, 0.9)')
      headerGradient.addColorStop(1, 'rgba(101, 50, 14, 0.9)')
    }

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

    // Body (dark grey with status animation)
    let bodyGradient = ctx.createLinearGradient(x, y + headerHeight, x, y + height)
    
    if (node.status === 'executing') {
      const pulse = Math.sin(time * 5) * 0.1
      bodyGradient.addColorStop(0, `rgba(${26 + pulse * 10}, ${31 + pulse * 10}, ${58 + pulse * 20}, 0.98)`)
      bodyGradient.addColorStop(1, `rgba(${10 + pulse * 5}, ${14 + pulse * 5}, ${39 + pulse * 10}, 0.98)`)
    } else if (node.status === 'processing') {
      const pulse = Math.sin(time * 3) * 0.08
      bodyGradient.addColorStop(0, `rgba(${30 + pulse * 15}, ${35 + pulse * 15}, ${65 + pulse * 25}, 0.95)`)
      bodyGradient.addColorStop(1, `rgba(${15 + pulse * 8}, ${20 + pulse * 8}, ${45 + pulse * 15}, 0.95)`)
    } else {
      bodyGradient.addColorStop(0, 'rgba(26, 31, 58, 0.95)')
      bodyGradient.addColorStop(1, 'rgba(10, 14, 39, 0.95)')
    }

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

    // Border with status colors
    ctx.strokeStyle = statusBorderColor
    ctx.lineWidth = (node.status !== 'idle' || isSelected) ? 3 : 2
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

    // Play button in header (right side) with status animation
    const playButtonX = node.x + 50
    const playButtonY = node.y - 10
    const playButtonSize = 18
    
    // Animated play button based on status
    let playButtonColor = { start: 'rgba(255, 200, 0, 1)', end: 'rgba(255, 140, 0, 1)' }
    let playButtonGlow = 0
    
    if (node.status === 'executing') {
      const pulse = Math.sin(time * 8) * 0.3 + 0.7
      playButtonColor = {
        start: `rgba(${0 * pulse}, ${217 * pulse}, ${255 * pulse}, 1)`,
        end: `rgba(${0 * pulse * 0.7}, ${140 * pulse}, ${255 * pulse}, 1)`
      }
      playButtonGlow = 15 + Math.sin(time * 8) * 5
    } else if (node.status === 'processing') {
      const pulse = Math.sin(time * 4) * 0.2 + 0.8
      playButtonColor = {
        start: `rgba(${255 * pulse}, ${200 * pulse}, ${0}, 1)`,
        end: `rgba(${255 * pulse * 0.8}, ${140 * pulse}, ${0}, 1)`
      }
      playButtonGlow = 10 + Math.sin(time * 4) * 3
    } else if (node.status === 'completed') {
      playButtonColor = {
        start: 'rgba(0, 255, 150, 1)',
        end: 'rgba(0, 200, 120, 1)'
      }
      playButtonGlow = 8
    }
    
    // Play button glow
    if (playButtonGlow > 0) {
      ctx.shadowBlur = playButtonGlow
      ctx.shadowColor = playButtonColor.start
    }
    
    // Play button background
    const playGradient = ctx.createRadialGradient(
      playButtonX, playButtonY, 0,
      playButtonX, playButtonY, playButtonSize
    )
    playGradient.addColorStop(0, playButtonColor.start)
    playGradient.addColorStop(1, playButtonColor.end)
    
    ctx.fillStyle = playGradient
    ctx.beginPath()
    ctx.arc(playButtonX, playButtonY, playButtonSize, 0, Math.PI * 2)
    ctx.fill()
    
    // Play button border
    ctx.strokeStyle = playButtonColor.start
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.shadowBlur = 0
    
    // Play triangle or checkmark based on status
    ctx.fillStyle = '#000000'
    if (node.status === 'completed') {
      // Draw checkmark
      ctx.beginPath()
      ctx.moveTo(playButtonX - 6, playButtonY)
      ctx.lineTo(playButtonX - 2, playButtonY + 4)
      ctx.lineTo(playButtonX + 6, playButtonY - 4)
      ctx.lineWidth = 2.5
      ctx.strokeStyle = '#000000'
      ctx.stroke()
    } else {
      // Draw play triangle
      ctx.beginPath()
      ctx.moveTo(playButtonX - 4, playButtonY - 5)
      ctx.lineTo(playButtonX - 4, playButtonY + 5)
      ctx.lineTo(playButtonX + 6, playButtonY)
      ctx.closePath()
      ctx.fill()
    }

    // Connection points with status animation
    let connectionColor = 'rgba(0, 217, 255, 0.6)'
    if (node.status === 'executing') {
      const pulse = Math.sin(time * 5) * 0.3 + 0.7
      connectionColor = `rgba(0, 217, 255, ${0.6 + pulse * 0.4})`
    } else if (node.status === 'processing') {
      const pulse = Math.sin(time * 3) * 0.2 + 0.8
      connectionColor = `rgba(255, 200, 0, ${0.6 + pulse * 0.4})`
    } else if (node.status === 'completed') {
      connectionColor = 'rgba(0, 255, 150, 0.8)'
    } else if (isSelected) {
      connectionColor = 'rgba(255, 107, 53, 0.9)'
    }
    
    // Left connection point (IN) with glow
    if (node.status === 'processing' || node.status === 'executing') {
      ctx.shadowBlur = 8
      ctx.shadowColor = connectionColor
    }
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
    ctx.beginPath()
    ctx.arc(x, node.y + 20, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = connectionColor
    ctx.lineWidth = 2
    ctx.stroke()
    ctx.shadowBlur = 0
    ctx.fillStyle = '#000000'
    ctx.font = 'bold 8px Inter'
    ctx.textAlign = 'center'
    ctx.fillText('IN', x, node.y + 20)
    
    // Right connection point (OUT) with glow
    if (node.status === 'executing' || node.status === 'completed') {
      ctx.shadowBlur = 10
      ctx.shadowColor = connectionColor
    }
    ctx.fillStyle = connectionColor
    ctx.beginPath()
    ctx.arc(x + width, node.y + 20, 6, 0, Math.PI * 2)
    ctx.fill()
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.lineWidth = 1
    ctx.stroke()
    ctx.shadowBlur = 0
    ctx.fillStyle = '#FFFFFF'
    ctx.font = 'bold 8px Inter'
    ctx.fillText('OUT', x + width, node.y + 20)
    
    // Status indicator text
    if (node.status !== 'idle') {
      const statusText = 
        node.status === 'executing' ? 'Executing...' :
        node.status === 'processing' ? 'Processing...' :
        node.status === 'completed' ? 'Done' : ''
      
      ctx.fillStyle = node.status === 'completed' ? 'rgba(0, 255, 150, 0.9)' :
                      node.status === 'executing' ? 'rgba(0, 217, 255, 0.9)' :
                      'rgba(255, 200, 0, 0.9)'
      ctx.font = 'bold 9px Inter'
      ctx.textAlign = 'center'
      ctx.fillText(statusText, node.x, node.y + 55)
    }
  }

  const handleRun = () => {
    setIsRunning(true)
    setTerminalOutput('')
    
    // Reset all nodes
    setNodes((prev) => prev.map((n) => ({ ...n, status: 'idle' as const })))
    
    // Step 1: First node executing
    setTimeout(() => {
      setNodes((prev) => prev.map((n) => 
        n.id === 'hello_world' ? { ...n, status: 'executing' as const } : n
      ))
      setTerminalOutput('> Compiling hello_world.asm...\n')
    }, 300)
    
    // Step 2: First node completes, second node processing
    setTimeout(() => {
      setNodes((prev) => prev.map((n) => 
        n.id === 'hello_world' ? { ...n, status: 'completed' as const } :
        n.id === 'kernel' ? { ...n, status: 'processing' as const } : n
      ))
      setTerminalOutput((prev) => prev + '> Linking...\n> Processing kernel.asm...\n')
    }, 1500)
    
    // Step 3: Second node executing
    setTimeout(() => {
      setNodes((prev) => prev.map((n) => 
        n.id === 'kernel' ? { ...n, status: 'executing' as const } : n
      ))
      setTerminalOutput((prev) => prev + '> Executing kernel...\n')
    }, 2500)
    
    // Step 4: Second node completes, third node executing
    setTimeout(() => {
      setNodes((prev) => prev.map((n) => 
        n.id === 'kernel' ? { ...n, status: 'completed' as const } :
        n.id === 'output' ? { ...n, status: 'executing' as const } : n
      ))
      setTerminalOutput((prev) => prev + '> Success!\n> Hello, World!\n> Kernel loaded!\n')
    }, 3500)
    
    // Step 5: All complete
    setTimeout(() => {
      setNodes((prev) => prev.map((n) => ({ ...n, status: 'completed' as const })))
      setTimeout(() => {
        setIsRunning(false)
        setNodes((prev) => prev.map((n) => ({ ...n, status: 'idle' as const })))
        setTerminalOutput('')
      }, 2000)
    }, 4500)
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
