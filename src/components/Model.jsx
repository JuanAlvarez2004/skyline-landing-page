import { useGLTF } from "@react-three/drei"
import { memo, useMemo } from "react"
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js"

function Model() {
  const { scene } = useGLTF('/skyline.glb')
  
  // Clonamos la escena para evitar problemas de instancias múltiples
  const clonedScene = useMemo(() => {
    const cloned = clone(scene)
    
    // Optimizaciones del modelo
    cloned.traverse((child) => {
      if (child.isMesh) {
        // Habilitar frustum culling para mejor performance
        child.frustumCulled = true
        
        // Optimizar materiales si existen
        if (child.material) {
          // Configurar niveles de detalle si es necesario
          child.material.precision = "mediump"
          
          // Deshabilitar actualizaciones innecesarias del material
          child.material.needsUpdate = false
        }
        
        // Configurar shadows de manera más eficiente
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    
    return cloned
  }, [scene])
  
  return <primitive object={clonedScene} dispose={null} />
}

// Memoizar el componente para evitar re-renders innecesarios
export default memo(Model)

// Precargar el modelo con configuraciones optimizadas
useGLTF.preload('/skyline.glb')