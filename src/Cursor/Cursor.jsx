import React, {useEffect} from "react";
import "./Cursor.css";
import { motion, useMotionValue, useSpring } from "framer-motion";


const Cursor = () => {
    const [mousePosition, setMousePosition] = React.useState({
        x: 0,
        y: 0
    });
    const [isPressed, setIsPressed] = React.useState(false);
    const [origin,  setOrigin] = React.useState({
        x: 0,
        y: 0,
    });
    const springConfig = { stiffness: 300, damping: 15};
    const radius= 100;

    console.log("mousePosition", mousePosition);




    useEffect(() => {
        const mouseMove = e => {
            if (isPressed) {
            }
            setMousePosition({x:e.clientX, y:e.clientY});
        }

        const mouseDown = (e) => {
            setIsPressed(true);
            setOrigin({ x: e.clientX, y: e.clientY });
        };

        const  mouseUp = () => {
            setIsPressed(false);
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mousedown", mouseDown);
        window.addEventListener("mouseup", mouseUp);

        return () => {
            window.removeEventListener("mousemove", mouseMove)
            window.removeEventListener("mousedown", mouseDown);
            window.removeEventListener("mouseup", mouseUp);
        }
    }, [isPressed, origin]);

    const variants = {
        default: {
            x: mousePosition.x - 15,
            y: mousePosition.y - 15,
            scale: isPressed ? 0.6 : 1,
            transition: {
                x: { type: "tween", duration: 0.000001 },
                y: { type: "tween", duration: 0.000001},
                scale: { type: "spring", ...springConfig }
            }
        }
    }

    const backgroundVariants = {
        default: {
            x: origin.x - radius,
            y: origin.y - radius,
            opacity: isPressed ? 0.05 : 0,
            scale: isPressed ? 1 : 0,
            transition: {
                x: { type: "tween", duration: 0.05 },
                y: { type: "tween", duration: 0.05 },
                scale: { type: "spring", ...springConfig }
            }
        },
    };

    return(
        <>
        <motion.div
            className="cursor-background"
            variants={backgroundVariants}
            animate="default"

        />
        <motion.div className="cursor" variants={variants} animate="default" style={{
            backgroundColor: isPressed ? "white" : "transparent",
            border: isPressed ? "none" : "2px solid white",
        }} >
        </motion.div>
        </>
    )
};

export default Cursor;