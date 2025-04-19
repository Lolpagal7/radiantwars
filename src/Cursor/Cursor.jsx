import React, {useEffect} from "react";
import "./Cursor.css";
import { motion, useMotionValue, useSpring } from "framer-motion";


const Cursor = () => {
    const [mousePosition, setMousePosition] = React.useState({
        x: 0,
        y: 0
    });
    console.log("mousePosition", mousePosition);

    const springConfig = { stiffness: 100, damping: 100000 };


    useEffect(() => {
        const mouseMove = e => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        }

        window.addEventListener("mousemove", mouseMove)

        return () => {
            window.removeEventListener("mousemove", mouseMove)
        }
    }, []);

    const variants ={
        default: {
            x:  mousePosition.x-15,
            y:  mousePosition.y-15,
            transition: { type: "spring", ...springConfig }
        }
    }
    return(
        <motion.div className="cursor" variants={variants} animate="default" >
        </motion.div>
    )
};

export default Cursor;