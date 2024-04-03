import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Comet = () => {
    const [comets, setComets] = useState([]);

    const createComet = () => {
        const newComet = {
            id: Date.now(),
            initialX: Math.random() * window.innerWidth,
            initialY: Math.random() * window.innerHeight,
            finalX: Math.random() * window.innerWidth,
            finalY: Math.random() * window.innerHeight,
            transitionDuration: Math.random() * 4,
        };
        setComets((prevComets) => [...prevComets, newComet]);

        setTimeout(() => {
            setComets((prevComets) => prevComets.filter(comet => comet.id !== newComet.id));
        }, newComet.transitionDuration * 1000); 
    };

    useEffect(() => {
        const intervalId = setInterval(createComet, 2000);

        return () => {
            clearInterval(intervalId); 
        };
    }, []);

    return (
        <>
            {comets.map((comet) => (
                <motion.div
                    key={comet.id}
                    initial={{ x: comet.initialX, y: comet.initialY,  opacity: 0.1, scale: 0.8,  boxShadow:'0 0 10px 2px rgb(189, 204, 247)' }}
                    animate={{ x: comet.finalX, y: comet.finalY, opacity: [0.1, 1, 0.1], scale: [0.8, 1.4, 0.8] }}
                    transition={{ duration: comet.transitionDuration }}
                    style={{
                        position: 'absolute',
                        width: '2px',
                        height: '2px',
                        borderRadius: '50%',
                        backgroundColor: 'white',
                    }}
                />
            ))}
        </>
    );
};

export default Comet;
