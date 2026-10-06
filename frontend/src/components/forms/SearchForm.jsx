import React from "react";
import { Search, X } from "lucide-react";
import { Button, Input, Select } from "../ui";

export default function SearchForm({
  value = "",
  onChange,
  onSubmit,
  onReset,
  placeholder = "Search by name, email or address...",
  showButton = true,
  className = "",
}) {
  const submit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form onSubmit={submit} className={`flex gap-2 ${className}`}>
      <div className="flex-1">
        <Input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          icon={Search}
        />
      </div>

      {value && (
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={() => onChange?.("")}
          aria-label="Clear search"
        >
          <X size={16} />
        </Button>
      )}

      {showButton && <Button type="submit">Search</Button>}
    </form>
  );
}