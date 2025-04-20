import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const baseQuery = ctx.db.query("products");
    if (!args.category) {
      return await baseQuery.collect();
    }
    const category = args.category;
    return await baseQuery
      .withIndex("by_category", (q) => q.eq("category", category))
      .collect();
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    image: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    
    return await ctx.db.insert("products", {
      ...args,
      isActive: true,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("products"),
    name: v.string(),
    description: v.string(),
    price: v.number(),
    image: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    
    const { id, ...data } = args;
    return await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: {
    id: v.id("products"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    
    await ctx.db.delete(args.id);
  },
});
