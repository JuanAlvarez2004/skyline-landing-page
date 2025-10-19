import { Html, useProgress } from "@react-three/drei"

export default function Loader() {
  const { active, progress, errors } = useProgress()
  
  return active ? (
    <Html center>
      <div className="flex flex-col items-center justify-center p-4 bg-black/50 rounded-lg backdrop-blur-sm">
        <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-blue-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white text-sm font-medium">
          Cargando modelo: {Math.round(progress)}%
        </p>
        {errors.length > 0 && (
          <p className="text-red-400 text-xs mt-1">
            Error al cargar el modelo
          </p>
        )}
      </div>
    </Html>
  ) : null
}