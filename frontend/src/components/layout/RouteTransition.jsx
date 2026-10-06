import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function RouteTransition() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 260);
    return () => window.clearTimeout(timer);
  }, [location.key]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-1 overflow-hidden bg-[#fee2e2]">
      <div className="h-full w-1/3 animate-[routeProgress_260ms_ease-out_forwards] rounded-full bg-[#dc2626]" />
    </div>
  );
}
