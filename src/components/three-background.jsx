"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ThreeBackground() {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const cameraRef = useRef(null)
  const particlesRef = useRef([])
  const bloodCellsRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef(0)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    rendererRef.current = renderer
    mountRef.current.appendChild(renderer.domElement)

    // Create medical particles
    const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8)
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0x4fc3f7,
      transparent: true,
      opacity: 0.6,
    })

    // Create blood cells
    const bloodCellGeometry = new THREE.SphereGeometry(0.05, 12, 12)
    const redBloodCellMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6b6b,
      transparent: true,
      opacity: 0.4,
    })

    const whiteBloodCellMaterial = new THREE.MeshBasicMaterial({
      color: 0x81c784,
      transparent: true,
      opacity: 0.3,
    })

    const plateletMaterial = new THREE.MeshBasicMaterial({
      color: 0xffd54f,
      transparent: true,
      opacity: 0.5,
    })

    // Create particle system
    const particles = []
    for (let i = 0; i < 100; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial)
      particle.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10)
      particle.userData = {
        originalPosition: particle.position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
        ),
        phase: Math.random() * Math.PI * 2,
      }
      particles.push(particle)
      scene.add(particle)
    }
    particlesRef.current = particles

    // Create blood cells
    const bloodCells = []

    // Red blood cells
    for (let i = 0; i < 30; i++) {
      const cell = new THREE.Mesh(bloodCellGeometry, redBloodCellMaterial)
      cell.position.set((Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 15)
      cell.userData = {
        type: "red",
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
        ),
        rotationSpeed: new THREE.Vector3(Math.random() * 0.02, Math.random() * 0.02, Math.random() * 0.02),
      }
      bloodCells.push(cell)
      scene.add(cell)
    }

    // White blood cells
    for (let i = 0; i < 15; i++) {
      const cell = new THREE.Mesh(bloodCellGeometry, whiteBloodCellMaterial)
      cell.position.set((Math.random() - 0.5) * 25, (Math.random() - 0.5) * 25, (Math.random() - 0.5) * 15)
      cell.userData = {
        type: "white",
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.025,
          (Math.random() - 0.5) * 0.025,
          (Math.random() - 0.5) * 0.025,
        ),
        rotationSpeed: new THREE.Vector3(Math.random() * 0.015, Math.random() * 0.015, Math.random() * 0.015),
      }
      bloodCells.push(cell)
      scene.add(cell)
    }

    // Platelets
    for (let i = 0; i < 50; i++) {
      const platelet = new THREE.Mesh(new THREE.SphereGeometry(0.02, 6, 6), plateletMaterial)
      platelet.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 20)
      platelet.userData = {
        type: "platelet",
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04,
          (Math.random() - 0.5) * 0.04,
        ),
        rotationSpeed: new THREE.Vector3(Math.random() * 0.03, Math.random() * 0.03, Math.random() * 0.03),
      }
      bloodCells.push(platelet)
      scene.add(platelet)
    }

    bloodCellsRef.current = bloodCells

    // Add DNA helix
    const helixGeometry = new THREE.CylinderGeometry(0.01, 0.01, 0.1, 8)
    const helixMaterial = new THREE.MeshBasicMaterial({
      color: 0x4caf50,
      transparent: true,
      opacity: 0.7,
    })

    for (let i = 0; i < 20; i++) {
      const helix = new THREE.Mesh(helixGeometry, helixMaterial)
      helix.position.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10)
      helix.userData = {
        type: "helix",
        velocity: new THREE.Vector3(0, 0.01, 0),
        rotationSpeed: 0.02,
      }
      scene.add(helix)
    }

    // Mouse move handler
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    // Resize handler
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight
        cameraRef.current.updateProjectionMatrix()
        rendererRef.current.setSize(window.innerWidth, window.innerHeight)
      }
    }

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      // Update particles
      particlesRef.current.forEach((particle, index) => {
        // Base movement
        particle.position.add(particle.userData.velocity)

        // Mouse influence
        const mouseInfluence = 0.02
        particle.position.x += mouseRef.current.x * mouseInfluence * 0.1
        particle.position.y += mouseRef.current.y * mouseInfluence * 0.1

        // Floating effect
        particle.userData.phase += 0.02
        particle.position.y += Math.sin(particle.userData.phase) * 0.001

        // Boundary check
        if (particle.position.x > 10 || particle.position.x < -10) {
          particle.userData.velocity.x *= -1
        }
        if (particle.position.y > 10 || particle.position.y < -10) {
          particle.userData.velocity.y *= -1
        }
        if (particle.position.z > 5 || particle.position.z < -5) {
          particle.userData.velocity.z *= -1
        }

        // Twinkle effect
        particle.material.opacity = 0.3 + Math.sin(Date.now() * 0.01 + index) * 0.3
      })

      // Update blood cells
      bloodCellsRef.current.forEach((cell, index) => {
        // Base movement
        cell.position.add(cell.userData.velocity)

        // Mouse influence based on cell type
        const mouseInfluence = cell.userData.type === "red" ? 0.03 : cell.userData.type === "white" ? 0.025 : 0.04

        cell.position.x += mouseRef.current.x * mouseInfluence * 0.1
        cell.position.y += mouseRef.current.y * mouseInfluence * 0.1

        // Rotation
        cell.rotation.x += cell.userData.rotationSpeed.x
        cell.rotation.y += cell.userData.rotationSpeed.y
        cell.rotation.z += cell.userData.rotationSpeed.z

        // Boundary check and wrap around
        if (cell.position.x > 12) cell.position.x = -12
        if (cell.position.x < -12) cell.position.x = 12
        if (cell.position.y > 12) cell.position.y = -12
        if (cell.position.y < -12) cell.position.y = 12
        if (cell.position.z > 7) cell.position.z = -7
        if (cell.position.z < -7) cell.position.z = 7

        // Pulsing effect for different cell types
        if (cell.userData.type === "red") {
          cell.material.opacity = 0.2 + Math.sin(Date.now() * 0.005 + index) * 0.2
        } else if (cell.userData.type === "white") {
          cell.material.opacity = 0.1 + Math.sin(Date.now() * 0.003 + index) * 0.2
        } else if (cell.userData.type === "platelet") {
          cell.material.opacity = 0.3 + Math.sin(Date.now() * 0.008 + index) * 0.2
        }
      })

      // Camera slight movement based on mouse
      if (cameraRef.current) {
        cameraRef.current.position.x += (mouseRef.current.x * 0.5 - cameraRef.current.position.x) * 0.05
        cameraRef.current.position.y += (mouseRef.current.y * 0.5 - cameraRef.current.position.y) * 0.05
        cameraRef.current.lookAt(0, 0, 0)
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }

      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }

      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "linear-gradient(135deg, #023e8a 0%, #0353a4 50%, #023e8a 100%)" }}
    />
  )
}
