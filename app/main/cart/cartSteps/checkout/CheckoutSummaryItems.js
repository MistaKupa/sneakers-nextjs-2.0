"use client";

import { motion } from "framer-motion";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import CheckoutItemsCard from "./CheckoutItemsCard";

const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delayChildren: 0.8,
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

export default function CheckoutSummaryItems() {
  return (
    <motion.div
      key="itemsWrapper"
      variants={variants}
      initial="hidden"
      animate="visible"
      className="h-96 w-full overflow-hidden flex items-center"
    >
      <SimpleBar
        style={{ maxHeight: 384, width: "100%" }}
        forceVisible="y"
        autoHide={false}
        className="custom-scrollbar"
      >
        <CheckoutItemsCard />
      </SimpleBar>
    </motion.div>
  );
}
