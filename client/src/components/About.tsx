import { motion } from "framer-motion";
import { SparklesIcon, BoltIcon, PhotoIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";

const AboutSection = () => {
  const features = [
    {
      title: "AI-Powered Precision",
      desc: "Our advanced neural networks understand your content's context to generate high-CTR designs.",
      icon: <SparklesIcon className="w-6 h-6 text-pink-500" />,
    },
    {
      title: "Lightning Fast",
      desc: "Get professional-grade thumbnails in under 10 seconds, not hours of manual editing.",
      icon: <BoltIcon className="w-6 h-6 text-pink-500" />,
    },
    {
      title: "Brand Consistency",
      desc: "Maintain your unique style across every video with customizable color schemes.",
      icon: <PhotoIcon className="w-6 h-6 text-pink-500" />,
    },
  ];

  return (
    <section className="relative py-24 bg-black overflow-hidden" id="about">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-900/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-pink-500 font-semibold tracking-wide uppercase text-sm mb-4">
              Behind the Magic
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Revolutionizing Content <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600">
                Creation for Everyone.
              </span>
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Thumblify was born from a simple observation: YouTubers spend more time designing thumbnails than actually filming. We built an AI that thinks like a designer but works at the speed of light.
            </p>
            
            <div className="space-y-4">
              {["No design experience required", "Optimized for YouTube algorithms", "Full commercial usage rights"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-300">
                  <CheckBadgeIcon className="w-5 h-5 text-pink-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Feature Grid */}
          <div className="grid gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                className="group p-6 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-pink-500/30 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(236,72,153,0.15)]"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;