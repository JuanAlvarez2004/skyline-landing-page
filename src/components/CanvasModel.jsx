import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment, Center } from '@react-three/drei'
import Model from '@/components/Model'
import Loader from '@/components/Loader'

// Precargar el modelo para mejor rendimiento
useGLTF.preload('/skyline.glb')

export default function CanvasModel() {
  return (
    <div className='fixed w-full h-full -z-10' >
      <Canvas  
        dpr={[1, 2]}
        camera={{ position: [-9, 1, 8], fov: 18 }}
      >
        <Suspense fallback={<Loader />}>
          {/* Sistema de iluminación profesional para automóviles */}
          
          {/* Luz ambiental suave para iluminación base */}
          <ambientLight intensity={0.3} />
          
          {/* Luz principal (Key Light) - ilumina el frente del carro */}
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={1.5}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          
          {/* Luz de relleno (Fill Light) - suaviza sombras del lado opuesto */}
          <directionalLight 
            position={[-5, 3, -5]} 
            intensity={0.8}
            color="#ffffff"
          />
          
          {/* Luz trasera (Back Light) - resalta los bordes y crea profundidad */}
          <directionalLight 
            position={[0, 5, -8]} 
            intensity={1.2}
            color="#b8d4ff"
          />
          
          {/* Luces laterales para iluminar rines y detalles */}
          <spotLight 
            position={[8, 2, 0]} 
            angle={0.5}
            penumbra={0.5}
            intensity={1}
            castShadow
          />
          <spotLight 
            position={[-8, 2, 0]} 
            angle={0.5}
            penumbra={0.5}
            intensity={1}
          />
          
          {/* Luz inferior para iluminar el chasis y parte baja */}
          <pointLight position={[0, -1, 0]} intensity={0.5} distance={10} />
          
          {/* Environment map para reflejos realistas en la pintura */}
          <Environment 
            preset="park"
            background={false}
          />
          
          {/* Modelo 3D - Posicionado en el centro inferior */}
          <Center bottom>
            <Model />
          </Center>
        </Suspense>
      </Canvas>
    </div>
  )
}