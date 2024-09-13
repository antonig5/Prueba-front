import { useEffect, useState } from "react";
import {
  fetchNowPlayingMovies,
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "../Api/Movies";
import { fetchSearchMovies } from "../Api/Search";
import { CarouselItem } from "../components/Carousel";

export const useMovies = (query: string = "") => {
  const [popularMovies, setPopularMovies] = useState<CarouselItem[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<CarouselItem[]>([]);
  const [topRateMovies, setTopRateMovies] = useState<CarouselItem[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<CarouselItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchMovies, setSearchMovies] = useState<CarouselItem[]>([]);

  const loadMoreMovies = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      if (query) {
        const searchMoviesData = await fetchSearchMovies(query, currentPage);
        if (searchMoviesData && searchMoviesData.results) {
          const formattedMovies: CarouselItem[] = searchMoviesData.results.map(
            (movie) => ({
              id: movie.id,
              title: movie.title,
              imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              relaseDate: movie.release_date,
              rating: movie.vote_average,
            })
          );
          setSearchMovies((prevMovies) => [...prevMovies, ...formattedMovies]);
          setHasMore(searchMoviesData.page < searchMoviesData.total_pages);
        }
      } else if (currentPage === 1) {
        const popularMoviesData = await fetchPopularMovies(currentPage);
        const nowPlayingMoviesData = await fetchNowPlayingMovies(currentPage);
        const topRatedMoviesData = await fetchTopRatedMovies(currentPage);
        const upcomingMoviesData = await fetchUpcomingMovies(currentPage);

        if (popularMoviesData && popularMoviesData.results) {
          const formattedPopularMovies = popularMoviesData.results.map(
            (movie) => ({
              id: movie.id,
              title: movie.title,
              imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              relaseDate: movie.release_date,
              rating: movie.vote_average,
            })
          );
          setPopularMovies((prevMovies) => [
            ...prevMovies,
            ...formattedPopularMovies,
          ]);
        }

        if (nowPlayingMoviesData && nowPlayingMoviesData.results) {
          const formattedNowPlayingMovies = nowPlayingMoviesData.results.map(
            (movie) => ({
              id: movie.id,
              title: movie.title,
              imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              relaseDate: movie.release_date,
              rating: movie.vote_average,
            })
          );
          setNowPlayingMovies((prevMovies) => [
            ...prevMovies,
            ...formattedNowPlayingMovies,
          ]);
        }

        if (topRatedMoviesData && topRatedMoviesData.results) {
          const formattedTopRatedMovies = topRatedMoviesData.results.map(
            (movie) => ({
              id: movie.id,
              title: movie.title,
              imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              relaseDate: movie.release_date,
              rating: movie.vote_average,
            })
          );
          setTopRateMovies((prevMovies) => [
            ...prevMovies,
            ...formattedTopRatedMovies,
          ]);
        }

        if (upcomingMoviesData && upcomingMoviesData.results) {
          const formattedUpcomingMovies = upcomingMoviesData.results.map(
            (movie) => ({
              id: movie.id,
              title: movie.title,
              imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              relaseDate: movie.release_date,
              rating: movie.vote_average,
            })
          );
          setUpcomingMovies((prevMovies) => [
            ...prevMovies,
            ...formattedUpcomingMovies,
          ]);
        }
      }

      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching movies: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setSearchMovies([]);
    setHasMore(true);
    loadMoreMovies();
  }, [query]);

  return {
    searchMovies,
    popularMovies,
    nowPlayingMovies,
    topRateMovies,
    upcomingMovies,
    loadMoreMovies,
    isLoading,
    hasMore,
  };
};
