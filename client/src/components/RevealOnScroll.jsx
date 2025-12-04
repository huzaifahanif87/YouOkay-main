// components/RevealOnScroll.jsx
import { motion, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"

export const RevealOnScroll = ({ children, delay = 0, duration = 2 }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  )
}
