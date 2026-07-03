import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen w-full bg-[#fcfcfc] text-black flex flex-col justify-center px-[5vw] py-20">
      
      {/* 
         The Hero content is now just pure, high-impact typography.
         The tagline is the focus. 
      */}
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-[1400px] mx-auto w-full"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[clamp(4rem,14vw,16rem)] font-bold leading-[0.9] tracking-[-0.04em] uppercase"
        >
          THE END OF <br />
          <span className="opacity-30">MESSY NOTES.</span>
        </motion.h1>

        <div className="mt-16 md:mt-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl max-w-lg font-light leading-snug"
          >
            StudyMate turns your heavy, unstructured documents into precision knowledge. 
            AI that respects the intelligence of the student.
          </motion.p>

          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-lg md:text-xl underline underline-offset-8 decoration-2 hover:opacity-50 transition-opacity uppercase tracking-widest"
          >
            Start Learning →
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}