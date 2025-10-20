import { useRef, useState, useCallback } from "react"
import { useEffect } from "react"
import CanvasModel from "@/components/CanvasModel"
import { Home, Back, Front, FrontLeft } from "@/sections"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ReactLenis } from 'lenis/react'

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

function App() {
  const modelRef = useRef()
  const [modelLoaded, setModelLoaded] = useState(false)
  const lenisRef = useRef()

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }

    gsap.ticker.add(update)

    return () => gsap.ticker.remove(update)
  }, [])

  // Callback optimizado que se ejecuta cuando el modelo está listo
  const handleModelReady = useCallback((modelGroup) => {

    // Asegurar que el ref esté correctamente asignado
    if (modelGroup && !modelRef.current) {
      modelRef.current = modelGroup
    }

    // Set state para trigger useGSAP
    setModelLoaded(true)
  }, []) // Sin dependencias ya que solo cambia el estado

  useGSAP(() => {
    if (!modelLoaded || !modelRef.current) return

    // Forzar refresh de ScrollTrigger después de que el modelo esté listo
    ScrollTrigger.refresh()

    // const timelineIntro = gsap.timeline({ duration: 1.5, ease: "power3.out" })

    // Animación inicial de entrada 
    gsap.fromTo(modelRef.current.position, {
      x: 1,
      z: 1
    }, {
      x: 0,
      z: 0,
      duration: 1.5, 
      ease: "power3.out"
    })
    gsap.from("#flower-left-home", {
      x: -50,
      duration: 1.5, 
      ease: "power3.out"
    }, "<")
    gsap.from("#flower-right-home", {
      x: 50,
      duration: 1.5, 
      ease: "power3.out"
    }, "<")
    gsap.from("#sun", {
      alpha: 0,
      duration: 1.5, 
      ease: "power3.out"
    }, "<")
    gsap.from("#title-container-home", {
      alpha: 0,
      duration: 1.5, 
      ease: "power3.out"
    }, "<")

    // Pequeño delay para asegurar que la animación inicial termine
    const setupScrollAnimations = () => {
      // Timeline principal para todas las animaciones del scroll
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#app",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      })

      masterTimeline
        // FASE 1: Sección Home -> Back (0% - 33% del scroll total)
        .to(modelRef.current.rotation, {
          x: .05,
          y: 2.8,
          z: 0,
          duration: 1,
          ease: "none"
        }, 0)
        .to(modelRef.current.scale, {
          x: 1.5,
          y: 1.5,
          z: 1.5,
          duration: 1,
          ease: "none"
        }, 0)
        .to(modelRef.current.position, {
          y: .5,
          duration: 1,
          ease: "none"
        }, 0)
        .to("#sun", {
          height: "120%",
          duration: 1,
        }, 0)

        // FASE 2: Sección Back -> FrontLeft (33% - 66% del scroll total)
        .to(modelRef.current.rotation, {
          y: 1,
          duration: 1,
          ease: "none"
        }, 1)
        .to(modelRef.current.position, {
          y: .4,
          z: 3.3,
          duration: 1,
          ease: "none"
        }, 1)
        .to("#sun", {
          height: "+=120%",
          duration: 1,
        }, 1)

        // FASE 3: Sección FrontLeft -> Front (66% - 100% del scroll total)
        .to(modelRef.current.rotation, {
          y: 2.3,
          z: -.05,
          duration: 1,
          ease: "none"
        }, 2)
        .to(modelRef.current.position, {
          x: -2,
          y: 1,
          duration: 1,
          ease: "none"
        }, 2)
        .to(modelRef.current.scale, {
          x: 1.3,
          y: 1.3,
          z: 1.3,
          duration: 1,
          ease: "none"
        }, 2)
        .to("#sun", {
          height: "+=160%",
          duration: 1,
        }, 2)

    }

    setupScrollAnimations()
    // Cleanup function para remover ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }

  }, [modelLoaded])

  return (
    <div id="app" className="flex flex-col w-full bg-brand-light-green/8">
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />

      {/* Loader personalizado mientras el modelo no está listo */}
      {!modelLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-brand-green/30 border-t-brand-green rounded-full animate-spin"></div>
            <div className="text-brand-green font-bbh text-xl">Setting Skyline GT-R...</div>
          </div>
        </div>
      )}

      <CanvasModel ref={modelRef} onModelReady={handleModelReady} />
      <Home />
      <Back />
      <FrontLeft />
      <Front />
    </div>
  )
}

export default App
