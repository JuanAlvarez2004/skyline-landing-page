import CanvasModel from "@/components/CanvasModel"
import { Home, Back, Front, FrontLeft } from "@/sections"

function App() {
  return (
    <div className="flex flex-col w-full bg-brand-light-green/8">
      <CanvasModel />
      <Home />
      <Back />
      <Front />
      <FrontLeft />
    </div>
  )
}

export default App
