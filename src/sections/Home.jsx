export default function Home() {
  return (
    <div id="home" className="relative h-dvh w-full grid place-content-center">
      <div id="flower-right-home" className="absolute right-0 -z-30 w-xl">
        <img src="/1.png" className="object-cover w-full h-full" />
      </div>
      <div id="flower-left-home" className="absolute left-0 -z-30 w-xl scale-x-[-1]">
        <img src="/1.png" className="object-cover w-full h-full" />
      </div>
      <div className="absolute top-0 left-0 right-0 bottom-1/2 -z-30 bg-gradient-to-b from-gray-500 to-brand-light-green/1"></div>
      <div id="sun" className="absolute rounded-t-full bg-linear-to-t bg-brand-gold/60 from-5% to-white bottom-1/4 top-3/12 right-4/12 left-4/12 -z-30"></div>
      <div id="title-container-home" className="mb-20 -z-20">
        <h1 className="text-8xl font-bold font-bbh text-brand-coral uppercase">nissan</h1>
        <h2 className=" text-7xl font-bold font-bbh text-brand-dark uppercase">スカイライン</h2>
      </div>
    </div>
  )
}