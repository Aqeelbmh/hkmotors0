import { motion } from "framer-motion";
import heroPartsImg from "@/assets/hero-parts.jpg";

export function HeroParts() {
    return (
        <div className="absolute inset-0 z-0 opacity-60 lg:opacity-100 flex items-center justify-center lg:justify-end overflow-hidden">
            <div className="relative w-full h-full max-w-[800px] lg:mr-[-10%] flex items-center justify-center">
                {/* Glow behind the parts */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/20 blur-[120px] rounded-full animate-pulse" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative"
                >
                    <img
                        src={heroPartsImg}
                        alt="Premium Spare Parts"
                        className="w-full h-auto object-contain drop-shadow-[0_0_50px_rgba(249,115,22,0.3)] mask-image-gradient"
                        style={{
                            maskImage: 'radial-gradient(circle, black 40%, transparent 80%)',
                            WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 80%)'
                        }}
                    />

                    {/* Decorative bits */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-10 -right-10 w-24 h-24 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl hidden lg:block"
                    />
                    <motion.div
                        animate={{ y: [0, 20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/5 border border-accent/10 backdrop-blur-xl rounded-full hidden lg:block"
                    />
                </motion.div>
            </div>
        </div>
    );
}
