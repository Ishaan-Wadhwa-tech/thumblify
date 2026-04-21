import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EnvelopeIcon, ChatBubbleLeftRightIcon, MapPinIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID  = "service_jgn80vc";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_b3769f3";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "cFUdlizI7s5m6KYGz";   // e.g. "AbCdEfGhIjKlMnOp"

type Status = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [status, setStatus] = useState<Status>("idle");

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim())                          e.name    = "Name is required.";
    if (!form.email.trim())                         e.email   = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                                    e.email   = "Enter a valid email.";
    if (!form.message.trim())                       e.message = "Message cannot be empty.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
          to_email:   form.email,   // sends confirmation to the user's own inbox
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setErrors({});

      // Reset back to idle after 5 s
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const inputBase =
    "w-full bg-black/40 border rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 transition-all";
  const inputNormal  = `${inputBase} border-white/10 focus:ring-pink-500/50 focus:border-pink-500/30`;
  const inputInvalid = `${inputBase} border-red-500/60 focus:ring-red-500/50`;

  return (
    <section
      className="relative py-24 bg-black text-white overflow-hidden"
      id="contact"
    >
      {/* Subtle Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-pink-500 font-medium tracking-widest uppercase text-xs mb-3">
            Get in Touch
          </h2>
          <h3 className="text-4xl font-bold tracking-tight">
            How can we help?
          </h3>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
            Have questions about your AI generations? Our team is here to help
            you create the perfect thumbnail.
          </p>
        </motion.div>

        {/* ── Info Cards ─────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <EnvelopeIcon className="w-6 h-6" />,
              label: "Email",
              value: "support@thumblify.ai",
              href: "mailto:support@thumblify.ai",
            },
            {
              icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
              label: "Community",
              value: "Discord Server",
              href: "#",
            },
            {
              icon: <MapPinIcon className="w-6 h-6" />,
              label: "Office",
              value: "Rewari, Haryana",
              href: "#",
            },
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
              <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
                {item.label}
              </p>
              <p className="text-zinc-200 font-medium">{item.value}</p>
            </motion.a>
          ))}
        </div>

        {/* ── Contact Form ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 max-w-2xl mx-auto p-8 rounded-3xl bg-zinc-900/20 border border-white/5"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className={errors.name ? inputInvalid : inputNormal}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? inputInvalid : inputNormal}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <textarea
              rows={4}
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className={`${errors.message ? inputInvalid : inputNormal} resize-none`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-400">{errors.message}</p>
            )}
          </div>

          {/* Submit Button + Feedback */}
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 font-semibold"
              >
                <CheckCircleIcon className="w-5 h-5" />
                Message sent! Check your inbox.
              </motion.div>
            ) : status === "error" ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 font-semibold"
              >
                <ExclamationCircleIcon className="w-5 h-5" />
                Something went wrong. Please try again.
              </motion.div>
            ) : (
              <motion.button
                key="button"
                onClick={handleSubmit}
                disabled={status === "loading"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ scale: status === "loading" ? 1 : 1.01 }}
                whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                className="relative w-full bg-pink-600 hover:bg-pink-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-colors shadow-lg shadow-pink-600/20 overflow-hidden"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3V4a10 10 0 100 20v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                      />
                    </svg>
                    Sending…
                  </span>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;