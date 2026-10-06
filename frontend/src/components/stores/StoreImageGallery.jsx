import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import Card from "../ui/Card";

export default function StoreImageGallery({ images = [], storeName = "Store" }) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [active, setActive] = useState(0);

  if (!safeImages.length) {
    return (
      <Card className="overflow-hidden p-0">
        <div className="flex h-[280px] items-center justify-center bg-[#f8fafc] sm:h-[360px]">
          <div className="flex flex-col items-center gap-2 text-[#94a3b8]">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff1f2] text-[#dc2626]">
              <ImageIcon size={28} />
            </div>
            <p className="text-xs font-medium">No store images available</p>
          </div>
        </div>
      </Card>
    );
  }

  const next = () => setActive((index) => (index + 1) % safeImages.length);
  const previous = () => setActive((index) => (index - 1 + safeImages.length) % safeImages.length);

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative h-[280px] bg-[#f8fafc] sm:h-[360px]">
        <img
          src={safeImages[active]}
          alt={`${storeName} ${active + 1}`}
          className="h-full w-full object-cover"
          onError={(event) => { event.currentTarget.style.display = "none"; }}
        />

        {safeImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={previous}
              aria-label="Previous store image"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next store image"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition hover:bg-black/55"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 right-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
              {active + 1} / {safeImages.length}
            </div>
          </>
        )}
      </div>

      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2 border-t border-[#eef2f7] p-2 sm:grid-cols-6">
          {safeImages.map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              onClick={() => setActive(index)}
              className={`h-16 overflow-hidden rounded-lg border-2 transition ${active === index ? "border-[#dc2626]" : "border-transparent"}`}
              aria-label={`View image ${index + 1}`}
            >
              <img src={image} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}
