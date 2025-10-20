export default function Front() {
  return (
    <div id="front" className="h-dvh flex items-center">
      <div className="flex flex-col gap-4 w-[60dvw] -z-30">
        <div className="text-center relative h-40">
          <div className="w-full h-40 absolute">
            <img className="w-full h-full object-cover" src="/1971.webp" />
          </div>
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-bbh text-brand-coral">1971</span>
        </div>
        <div className="text-center relative h-40">
          <div className="w-full h-40 absolute scale-x-[-1]">
            <img className="w-full h-full object-cover" src="/1999.webp" />
          </div>
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-bbh text-brand-coral">1999</span>
        </div>
        <div className="text-center relative h-40">
          <div className="w-full h-40 absolute">
            <img className="w-full h-full object-cover" src="/2007.webp" />
          </div>
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-bbh text-brand-coral">2007</span>
        </div>
      </div>
    </div>
  )
}