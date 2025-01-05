import Header from "@/components/common/Header";

export default function Home() {
  return (
    <div className="pt-16 sm:pt-20">
      <Header />
      <div className=" mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-4 min-h-[85vh]">
          <div className="flex flex-col justify-center">
            <div className="text-4xl md:text-6xl px-6 py-10 font-extrabold tracking-tight leading-tight">
              Discover all
              <span className="text-7xl text-green-400"> top</span>
              <br />
              <span className="text-7xl text-green-400">Developers </span>
              around
              <br />
              the <span className="text-rose-400">World</span>, track your
              <span className="text-7xl text-cyan-300"> Developer </span>
              journey and
              <span className="text-fuchsia-500"> rise through</span>
              <span className="text-fuchsia-500"> Ranks! 😈</span>
            </div>
          </div>
          <div className="bg-[#2A2A2A] rounded-sm px-0 flex justify-center items-center">
            <div className="text-black text-9xl">⁉️</div>
          </div>
        </div>
        <div>Hello</div>
      </div>
    </div>
  );
}
