export default function FrontLeft() {
  return (
    <div id="front-left" className="h-[70dvh] md:h-dvh relative">
      <div className="absolute -top-10 md:-top-60 -right-10 w-50 md:w-sm -z-30 opacity-60">
        <img className="object-cover w-full h-full" src="/godzilla-2.png" />
      </div>
      <div className="absolute left-0 -bottom-10 w-xs md:w-2xl scale-x-[-1] scale-y-[-1] -z-30 opacity-60">
        <img className="object-cover w-full h-full" src="/1.png" />
      </div>
      <div className="absolute top-20 md:top-30 left-0 right-4/12 pl-5">
        <p className="text-4xl md:text-9xl font-bold text-brand-coral font-bbh -z-30">GT-R</p>
        <p className="text-3xl md:text-9xl font-bold text-brand-dark font-bbh -z-30">日本製</p>
        <p className="text-xs max-w-lg md:pl-4 pt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat beatae animi, voluptatibus tempora esse itaque, temporibus dolores perferendis reprehenderit error harum alias, maxime recusandae! Qui quo expedita perspiciatis quisquam suscipit?</p>
      </div>
    </div>
  )
}