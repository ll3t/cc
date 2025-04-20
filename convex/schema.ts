import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const applicationTables = {
  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    image: v.string(),
    category: v.string(),
    isActive: v.boolean(),
  }).index("by_category", ["category"]),
  
  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    message: v.string(),
    status: v.string(),
  }),

  settings: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
