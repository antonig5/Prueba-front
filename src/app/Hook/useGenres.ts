import { useState, useEffect } from "react";

interface Genre {
  id: number;
  name: string;
}

export const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTJlNmU5OTZhYjMyMWM5NTFiNDUxMDI1YjdhM2IzNSIsIm5iZiI6MTcyNjA3OTQ5MC40NTYzODMsInN1YiI6IjY2ZTA4NjBhN2IxNDJlNDJmOTI4ZTA5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Mcrk2Nvieo9K030LUq_WAy65tKGfdBL-L_BeduHb_uU",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, isLoading };
};
