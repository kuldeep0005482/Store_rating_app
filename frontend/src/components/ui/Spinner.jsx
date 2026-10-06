import React from "react";

export default function Spinner({ size = 20, className = "" }) {
  return <span className={`inline-block animate-spin rounded-full border-2 border-[#fecaca] border-t-[#dc2626] ${className}`} style={{ width: size, height: size }} aria-label="Loading" />;
}