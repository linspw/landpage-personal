import type { Book } from "~/interfaces/books";

export function countTotalBooks(topics: { title: string; items: Book[] }[]) {
  return topics.reduce((total, section) => total + section.items.length, 0)
}
