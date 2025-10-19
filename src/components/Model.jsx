import { useGLTF } from "@react-three/drei"

export default function Model() {
  const { scene } = useGLTF('/skyline.glb')
  return <primitive object={scene} />
}