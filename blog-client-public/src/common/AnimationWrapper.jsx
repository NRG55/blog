import { AnimatePresence, motion } from "framer-motion";

const AnimationWrapper = (
    { 
        children, 
        initial = { opacity: 0 }, 
        animate = { opacity: 1 },
        transition = { duration: .5 },
        className = "flex-1 flex" 
    }
) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={initial}
                animate={animate}
                transition={transition}
                className={className}
            >
                { children }
            </motion.div>
        </AnimatePresence>        
    )
};

export default AnimationWrapper;