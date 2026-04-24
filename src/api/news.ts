import type { NewsItem } from "../types/news"

export const getNews = async (): Promise<NewsItem[]> => {
  const response = await fetch("/news")

  if (!response.ok) {
    throw new Error("Не удалось загрузить новости")
  }

  return response.json()
}