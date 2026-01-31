import { motion } from "framer-motion";
import { EnvelopeIcon, ChatBubbleLeftRightIcon, MapPinIcon } from "@heroicons/react/24/outline";

const Contact = () => {
  return (
    <section className="relative py-24 bg-black text-white overflow-hidden" id="contact">
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-pink-500 font-medium tracking-widest uppercase text-xs mb-3">Get in Touch</h2>
          <h3 className="text-4xl font-bold tracking-tight">How can we help?</h3>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            Have questions about your AI generations? Our team is here to help you create the perfect thumbnail.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <EnvelopeIcon className="w-6 h-6" />, 
              label: "Email", 
              value: "support@thumblify.ai",
              href: "mailto:support@thumblify.ai" 
            },
            { 
              icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />, 
              label: "Community", 
              value: "Discord Server",
              href: "#" 
            },
            { 
              icon: <MapPinIcon className="w-6 h-6" />, 
              label: "Office", 
              value: "Rewari, Haryana",
              href: "#" 
            }
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-pink-500/40 transition-all duration-300 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-500/10 text-pink-500 mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-zinc-200 font-medium">{item.value}</p>
            </motion.a>
          ))}
        </div>

        {/* Simple Form (Optional) */}
        <motion.form 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-2xl mx-auto p-8 rounded-3xl bg-zinc-900/20 border border-white/5"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <input type="text" placeholder="Name" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all" />
            <input type="email" placeholder="Email" className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all" />
          </div>
          <textarea rows={4} placeholder="Your Message" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition-all mb-6" />
          <button className="w-full bg-pink-600 hover:bg-pink-500 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg shadow-pink-600/20">
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;