import { useEffect, useRef, useState } from "react";

const TableOfContents = ({ routes, defaultHidden = [], defaultActiveIndex = 0, children }) => {
    const [tableOfContentsIndex, setTableOfContentsIndex] = useState(defaultActiveIndex);
    
    const containerRef = useRef();
    const activeTabLineRef = useRef();

    const updateTabLine = (index) => {
        const buttons = containerRef.current.querySelectorAll('button');
        const targetButton = buttons[index];

        if (targetButton && activeTabLineRef.current) {
            const { offsetWidth, offsetLeft } = targetButton;

            activeTabLineRef.current.style.width = offsetWidth + 'px';
            activeTabLineRef.current.style.left = offsetLeft + 'px';
        };
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                const currentRoute = routes[tableOfContentsIndex];

                if (defaultHidden.includes(currentRoute)) {
                    setTableOfContentsIndex(0);
                };
            };
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, [tableOfContentsIndex, routes, defaultHidden]);

    useEffect(() => {
        updateTabLine(tableOfContentsIndex);
    }, [tableOfContentsIndex]);

    return (
        <>
            <div ref={containerRef} className="relative flex md:col-span-2 mb-8 border-b border-gray-100">
                {routes.map((route, i) => (
                    <button
                        key={`content-button-${i}`}                                
                        onClick={() => setTableOfContentsIndex(i)}
                        className={"p-4 px-6 " 
                            + (tableOfContentsIndex === i ? "text-black" : "text-gray-600")
                            + (defaultHidden.includes(route) ? " md:hidden" : "")
                        }
                    >
                        {route}
                    </button>
                ))}

                <hr ref={activeTabLineRef} className="absolute bottom-0 bg-black transition-all duration-300 ease-in-out"/>                
            </div>
            
            { Array.isArray(children) ? children[tableOfContentsIndex] : children }
        </>
    );
};

export default TableOfContents;