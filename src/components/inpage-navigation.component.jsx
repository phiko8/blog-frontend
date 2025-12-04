import { useEffect, useState, useRef } from "react";

const InPageNavigation = ({ 
  routes = [], 
  defaultActiveIndex = 0, 
  children,
  defaultHidden = [] 
}) => {

  const activeTabLineRef = useRef();
  const activeTabRef = useRef();

  // Filter visible routes
  const visibleRoutes = routes.filter(route => !defaultHidden.includes(route));

  // Make index safe
  const safeActiveIndex =
    defaultActiveIndex < visibleRoutes.length ? defaultActiveIndex : 0;

  const [activeIndex, setActiveIndex] = useState(safeActiveIndex);

  const changePageState = (btn, index) => {
    if (!btn) return;

    const { offsetWidth, offsetLeft } = btn;

    activeTabLineRef.current.style.width = offsetWidth + "px";
    activeTabLineRef.current.style.left = offsetLeft + "px";

    setActiveIndex(index);
  };

  useEffect(() => {
    if (activeTabRef.current) {
      changePageState(activeTabRef.current, safeActiveIndex);
    }
  }, []);

  return (
    <>
      <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
        
        {visibleRoutes.map((route, i) => (
          <button
            key={i}
            ref={i === safeActiveIndex ? activeTabRef : null}
            className={
              "p-4 px-5 capitalize " +
              (activeIndex === i ? "text-black" : "text-dark-grey")
            }
            onClick={(e) => changePageState(e.target, i)}
          >
            {route}
          </button>
        ))}

        <hr
          ref={activeTabLineRef}
          className="absolute bottom-0 duration-300 border-black"
        />
      </div>

      {/* Tab content rendering */}
      {Array.isArray(children) ? children[activeIndex] : children}
    </>
  );
};

export default InPageNavigation;
