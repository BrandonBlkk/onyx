import { motion } from 'framer-motion'

const pageContentTransition = {
  duration: 0.22,
  ease: 'easeOut',
}

const PageContentTransition = ({ children, className = '' }) => (
  <motion.main
    initial={{ opacity: 0, x: 12 }}
    animate={{ opacity: 1, x: 0 }}
    transition={pageContentTransition}
    className={className}
  >
    {children}
  </motion.main>
)

export default PageContentTransition
