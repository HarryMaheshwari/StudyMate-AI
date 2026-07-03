export default function Footer() {
  return (
    <footer className="bg-[#1e3a8a] text-[#f5f5dc] py-20 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
        <div>
          <h2 className="text-[clamp(3rem,6vw,5rem)] font-black uppercase leading-[0.8] tracking-tighter">
            Study<br />Mate
          </h2>
          <p className="mt-6 font-mono text-sm opacity-60">© 2026 STUDYMATE AI. ALL RIGHTS RESERVED.</p>
        </div>
        
        <div className="flex gap-12 font-mono uppercase text-sm">
          <div className="flex flex-col gap-2">
            <a href="#" className="hover:underline">Twitter</a>
            <a href="#" className="hover:underline">GitHub</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
          <div className="flex flex-col gap-2">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}