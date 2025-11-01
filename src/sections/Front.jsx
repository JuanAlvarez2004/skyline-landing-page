const CarDetail = ({ carsDetails }) => {
  return (
    <div className="flex flex-col gap-4 w-[60dvw] -z-30">
      { carsDetails.map((car, index) => (
          <div key={index} className="text-center relative h-20 md:h-40" >
            <div className={`w-full h-20 md:h-40 absolute ${car?.flip ? 'scale-x-[-1]' : ''}`}>
              <img className="w-full h-full object-cover" src={car.imgSrc} />
            </div>
            <span className="absolute inset-0 flex items-center justify-center text-3xl font-bbh text-brand-coral">{car.year}</span>
          </div >
        ))
      }
    </div>
  )
}

export default function Front() {
  const carsDetails = [
    { year: 1971, imgSrc: "/1971.webp" },
    { year: 1999, imgSrc: "/1999.webp", flip: true },
    { year: 2007, imgSrc: "/2007.webp" }
  ]

  return (
    <div id="front" className="h-[80dvh] md:h-dvh flex items-center">
      <CarDetail carsDetails={carsDetails} />
    </div>
  )
}