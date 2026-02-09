import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { collections, type Collection } from "@/data/products";

interface CollectionFilterProps {
  selected: Collection;
  onSelect: (collection: Collection) => void;
}

const CollectionFilter = ({ selected, onSelect }: CollectionFilterProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const setButtonRef = useCallback((id: string, el: HTMLButtonElement | null) => {
    if (el) buttonRefs.current.set(id, el);
    else buttonRefs.current.delete(id);
  }, []);

  // Auto-scroll so the active chip is visible on mobile
  useEffect(() => {
    const container = scrollRef.current;
    const activeBtn = buttonRefs.current.get(selected);
    if (!container || !activeBtn) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    if (btnRect.left < containerRect.left || btnRect.right > containerRect.right) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [selected]);

  return (
    <div ref={scrollRef} className="w-full overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
      <div className="flex gap-2 md:gap-3 md:justify-center min-w-max pb-2">
        {collections.map((collection) => (
          <button
            key={collection.id}
            ref={(el) => setButtonRef(collection.id, el)}
            onClick={() => onSelect(collection.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              selected === collection.id
                ? cn(collection.color, "text-foreground shadow-sm")
                : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {collection.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CollectionFilter;
