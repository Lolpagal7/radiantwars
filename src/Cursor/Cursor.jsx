import React, {useEffect} from "react";
import "./Cursor.css";
import  {motion} from "framer-motion";
import number from "leva/src/components/Number/index.js";


const Cursor = () => {
    const [mousePosition, setMousePosition] = React.useState({
        x: 0,
        y: 0
    });
    console.log("mousePosition", mousePosition);

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
            y:  mousePosition.y-15
        }
    }
    return(
        <div className="cursor" variants={variants} animate="default" >
        </div>
    )
};

export default Cursor;