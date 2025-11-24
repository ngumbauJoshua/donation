import { Skeleton } from "@n3oltd/n3o-ui-components";
import { ShoppingCart } from "lucide-react";
import React from "react";

/**
 * Skeleton placeholder for the cart items count badge.
 * Focuses on:
 * - Layout stability (same sizing as loaded state)
 * - Visual distinction (neutral pulse, not primary color)
 * - Non-interactive state (pointer-events-none)
 * - Basic accessibility (aria-busy & aria-label)
 */
export const CartItemsCountSkeleton: React.FC = () => (
  <div
    className="relative inline-flex items-center pointer-events-none select-none n3o-widget-cart-count__skeleton"
    aria-busy="true"
  >
    <ShoppingCart className="w-6 h-6 text-muted-foreground/40 n3o-widget-cart-count__skeleton-icon" />
    <Skeleton
      className="absolute -top-2 -right-2 w-5 h-5 rounded-full animate-pulse n3o-widget-cart-count__skeleton-badge"
    />
  </div>
);