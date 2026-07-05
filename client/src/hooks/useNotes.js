import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../api/note.api";

export default function useNotes(id) {
  return useQuery({
    queryKey: ["notes", id],
    queryFn: async () => {
      const res = await getNotes(id);
      return res.data;
    },
    enabled: !!id,
    retry: false,
  });
}