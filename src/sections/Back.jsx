export default function Back() {
  return (
    <div id="back" className="h-dvh grid place-content-center relative">
      <div className="absolute bottom-0 left-0 w-5xl -z-30 opacity-60 mask-b-from-65% to-100%">
        <img className="object-cover w-full h-full" src="/godzilla.png" />
      </div>
      <h3 className="text-[20rem] font-bold text-brand-coral font-bbh -z-30">ゴジラ</h3>
    </div>
  )
}