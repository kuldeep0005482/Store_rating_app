import React from "react";
import Breadcrumb from "../ui/Breadcrumb";

export default function PageHeader({
  title,
  description,
  breadcrumbs = [],
  action,
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {breadcrumbs.length > 0 && (
          <div className="mb-2">
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
        <h1 className="text-2xl font-bold tracking-tight text-[#111827]">{title}</h1>
        {description && <p className="mt-1 text-sm text-[#6b7280]">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}