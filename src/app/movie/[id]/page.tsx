"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";

const MovieDetail = ({ params }) => {
  const id = params.id;

  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTJlNmU5OTZhYjMyMWM5NTFiNDUxMDI1YjdhM2IzNSIsIm5iZiI6MTcyNjA3OTQ5MC40NTYzODMsInN1YiI6IjY2ZTA4NjBhN2IxNDJlNDJmOTI4ZTA5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Mcrk2Nvieo9K030LUq_WAy65tKGfdBL-L_BeduHb_uU",
            },
          }
        );
        const data = await response.json();
        setMovie(data);

        // Fetch recommendations
        const recResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTJlNmU5OTZhYjMyMWM5NTFiNDUxMDI1YjdhM2IzNSIsIm5iZiI6MTcyNjA3OTQ5MC40NTYzODMsInN1YiI6IjY2ZTA4NjBhN2IxNDJlNDJmOTI4ZTA5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Mcrk2Nvieo9K030LUq_WAy65tKGfdBL-L_BeduHb_uU",
            },
          }
        );
        const recData = await recResponse.json();
        setRecommendations(recData.results);
      } catch (error) {
        console.error(
          "Error fetching movie details or recommendations:",
          error
        );
      }
    };

    fetchMovieDetails();
  }, [id]);
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <main className="main">
      <section className="movieDetail">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="backdropImage"
        />
        <button className="backButton" onClick={() => router.back()}>
          <FaAngleLeft size={21}/>
        </button>
        <div className="detailContainer">
          <div className="posterColumn">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="poster"
            />
            <button className="trailerButton">Official Trailer</button>
          </div>
          <div className="infoColumn">
            <h2>
              {movie.title} ({new Date(movie.release_date).getFullYear()})
            </h2>
            <p>
              {new Date(movie.release_date).toLocaleDateString()} •{" "}
              {movie.runtime} min
            </p>
            <div className="overview-container">
              <h2>Overview</h2>
              <p className="overview">{movie.overview}</p>
            </div>
            <div className="userScore">
              <span>{movie.vote_average * 10}%</span>
              <p>Users Score</p>
            </div>
            <div className="tags">
              {movie.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="recommendations">
        <h3>Recommendations</h3>
        <div className="movieGrid">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="movieCard"
              onClick={() => {
                router.push(`/movie/${rec.id}`);
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                alt={rec.title}
                className="movieCardImage"
              />
              <h4 className="movieCardTitle">{rec.title}</h4>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MovieDetail;
