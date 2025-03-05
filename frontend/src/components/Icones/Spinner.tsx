import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <div className="flex justify-center">
      <motion.div
      className="w-4 h-4 border-3 border-white border-t-transparent rounded-full"
      animate={{ rotate: 360 }} // Rotates the spinner 360 degrees
      transition={{
        repeat: Infinity, // Repeats the animation infinitely
        ease: "linear", // Ensures smooth rotation without easing
        duration: 1, // Sets the duration of one full rotation (1 second)
      }}
      />
    </div>
  
  );
};

export default Spinner;
