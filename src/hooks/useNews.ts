import { useQuery } from "@tanstack/react-query";
import { getNews } from "../api/news"
import type { NewsItem } from "../types/news";

export const useNews = () => {
  return useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: getNews,
  })
}