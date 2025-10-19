import { forwardRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei'
import Model from '@/components/Model'

// Componente interno que maneja la lógica dentro del Canvas
function ModelGroup({ modelRef, onModelReady }) {
  // Efecto que se ejecuta cuando el modelo está completamente cargado
  useEffect(() => {
    if (modelRef?.current && onModelReady) {
      // Pequeño delay para asegurar que todo esté renderizado
      const timer = setTimeout(() => {
        onModelReady(modelRef.current)
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [modelRef, onModelReady])

  return (
    <Center bottom>
      <group 
        ref={modelRef}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}  
      >
        <Model />
      </group>
    </Center>
  )
}

const CanvasModel = forwardRef(({ onModelReady }, ref) => {
  return (
    <div className='fixed w-full h-full -z-10' >
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [-9, 1, 8], fov: 18 }}
        performance={{ min: 0.5 }}
        frameloop="always"
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
      >
        {/* Sistema de iluminación profesional para automóviles */}

        {/* Luz principal (Key Light) - ilumina el frente del carro */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />

        {/* Luz trasera (Back Light) - resalta los bordes y crea profundidad */}
        <directionalLight
          position={[0, 5, -8]}
          intensity={1.2}
          color="#b8d4ff"
        />

        {/* Environment map para reflejos realistas en la pintura */}
        <Environment
          preset="park"
          background={false}
        />
        
        {/* Modelo 3D - Posicionado en el centro inferior con Suspense */}
        <Suspense fallback={null}>
          <ModelGroup modelRef={ref} onModelReady={onModelReady} />
        </Suspense>
      </Canvas>
    </div>
  )
})

CanvasModel.displayName = 'CanvasModel'

export default CanvasModel