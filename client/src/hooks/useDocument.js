import { useQuery } from "@tanstack/react-query";
import { getDocument } from "../api/document.api";

export default function useDocument(id) {
  return useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const res = await getDocument(id);
      return res.data;
    },
    enabled: !!id,
  });
}