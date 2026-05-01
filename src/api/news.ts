import { apiClient } from "./apiClient"
import type { NewsItem } from "../types/news"

export const getNews = () => {
  return apiClient<NewsItem[]>('/news')
}