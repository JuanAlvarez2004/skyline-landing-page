import { forwardRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei'
import Model from '@/components/Model'
import useMediaQuery from '@/hooks/useMediaQuery'

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
  const isMobile = useMediaQuery()
  
  let cameraProps = {
    fov: isMobile ? 40 : 18,
    position: isMobile ? [-9, 2, 8] : [-9, 1, 8]
  } 

  return (
    <div className='fixed w-full h-full -z-10' >
      <Canvas 
        dpr={isMobile ? [0.5, 1] : [1, 2]} // Reduce resolución en móvil
        camera={{ position: cameraProps.position, fov: cameraProps.fov }} 
        performance={{ min: 0.5 }}
        frameloop="always"
        gl={{ 
          antialias: !isMobile, // Desactiva antialiasing en móvil
          alpha: true,
          powerPreference: isMobile ? "low-power" : "high-performance",
          stencil: false,
          depth: true,
          ...(isMobile && { // Configuraciones adicionales para móvil
            precision: 'lowp',
            logarithmicDepthBuffer: false
          })
        }}
      >
        {/* Sistema de iluminación profesional para automóviles */}

        {/* Luz principal (Key Light) - ilumina el frente del carro */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          castShadow={!isMobile} // Desactiva sombras en móvil
          shadow-mapSize={isMobile ? [512, 512] : [2048, 2048]} // Reduce calidad de sombras
        />

        {/* Luz trasera (Back Light) - resalta los bordes y crea profundidad */}
        <directionalLight
          position={[0, 5, -8]}
          intensity={1.2}
          color="#b8d4ff"
        />

        {/* Environment map para reflejos realistas en la pintura */}
        <Environment
          preset="warehouse"
          background={false}
          resolution={isMobile ? 256 : 1024} // Reduce calidad de environment map en móvil
        />
        
        {/* Modelo 3D - Posicionado en el centro inferior con Suspense */}
        <Suspense fallback={null}>
          <ModelGroup isMobile={isMobile} modelRef={ref} onModelReady={onModelReady} />
        </Suspense>
      </Canvas>
    </div>
  )
})

CanvasModel.displayName = 'CanvasModel'

export default CanvasModel