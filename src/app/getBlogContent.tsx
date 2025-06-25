"use server";
import { v4 as uuidv4 } from "uuid";

export default async function getBlogContent() {
  return {
    items: [
      {
        id: 1,
        contentId: uuidv4(),
        title: "Hi",
        content: "21922391",
      },
    ],
  };
}
