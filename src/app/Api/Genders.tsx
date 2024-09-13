export const gendersMovies = async () => {
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
      throw new Error("Failed to fetch popular movies");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return null;
  }
};
