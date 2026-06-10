import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { motion } from "framer-motion";

export function WhatsAppButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", damping: 15 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      <div className="absolute -inset-2 bg-[#25D366]/20 blur-xl rounded-full animate-pulse -z-10" />
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all hover:scale-105 hover:bg-[#1ebe5b] active:scale-95"
      >
        <div className="absolute -inset-1 blur-md bg-[#25D366]/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <MessageCircle className="relative h-6 w-6 fill-current animate-bounce-slow" />
        <div className="flex flex-col items-start leading-none pr-1">
          <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Live Support</span>
          <span className="text-sm font-black tracking-tight font-display italic">Expert Desk</span>
        </div>
      </a>
    </motion.div>
  );
}
