function GooeyTitle({ text }) {
    try {
        const containerRef = React.useRef(null);
        const lettersRef = React.useRef([]);
        const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
        const letters = text.split('');

        React.useEffect(() => {
            const container = containerRef.current;
            if (!container) return;

            const handleMouseMove = (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setMousePosition({ x, y });

                lettersRef.current.forEach((letter, index) => {
                    if (!letter) return;
                    const letterRect = letter.getBoundingClientRect();
                    const letterX = letterRect.left - rect.left + letterRect.width / 2;
                    const letterY = letterRect.top - rect.top + letterRect.height / 2;

                    const distance = Math.sqrt(
                        Math.pow(x - letterX, 2) + Math.pow(y - letterY, 2)
                    );

                    const maxDistance = 200;
                    const maxMove = 30;

                    if (distance < maxDistance) {
                        const angle = Math.atan2(y - letterY, x - letterX);
                        const force = (maxDistance - distance) / maxDistance;
                        const moveX = Math.cos(angle) * maxMove * force;
                        const moveY = Math.sin(angle) * maxMove * force;

                        letter.style.transform = `translate(${moveX}px, ${moveY}px)`;
                        letter.classList.add('active');
                    } else {
                        letter.style.transform = 'translate(0, 0)';
                        letter.classList.remove('active');
                    }
                });
            };

            const handleMouseLeave = () => {
                lettersRef.current.forEach(letter => {
                    if (letter) {
                        letter.style.transform = 'translate(0, 0)';
                        letter.classList.remove('active');
                    }
                });
            };

            container.addEventListener('mousemove', handleMouseMove);
            container.addEventListener('mouseleave', handleMouseLeave);
            
            return () => {
                container.removeEventListener('mousemove', handleMouseMove);
                container.removeEventListener('mouseleave', handleMouseLeave);
            };
        }, []);

        return (
            <div className="magnetic-area" ref={containerRef} data-name="gooey-title">
                <h1 className="gooey-title text-4xl font-bold text-gray-800 mb-3">
                    {letters.map((letter, index) => (
                        <span
                            key={index}
                            ref={el => lettersRef.current[index] = el}
                            className="gooey-letter"
                            data-name="gooey-letter"
                        >
                            {letter}
                        </span>
                    ))}
                </h1>
                <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                    <defs>
                        <filter id="gooey">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                                result="gooey"
                            />
                        </filter>
                    </defs>
                </svg>
            </div>
        );
    } catch (error) {
        console.error('GooeyTitle component error:', error);
        reportError(error);
        return null;
    }
}
