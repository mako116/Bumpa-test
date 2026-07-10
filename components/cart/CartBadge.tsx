import React from "react";
import { StyleSheet } from "react-native";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/hooks/useCart";

export function CartBadge() {
  const { totalItems } = useCart();

  return <Badge count={totalItems} style={styles.badge} />;
}

const styles = StyleSheet.create({
  badge: {
    top: -2,
    right: -6,
  },
});
