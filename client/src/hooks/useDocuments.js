import { useQuery } from "@tanstack/react-query";
import { getDocuments } from "../api/document.api";

export default function useDocuments() {
  return useQuery({
    queryKey: ["documents"],

    queryFn: async () => {
      const res = await getDocuments();

      return res.data;
    },
  });
}