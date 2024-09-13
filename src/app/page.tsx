"use client";
import RootLayout from "./layout";
import Nav from "./components/Nav";
import { FaHeart } from "react-icons/fa";
import InputSearch from "./components/Search";
import { useState, useEffect } from "react";
import { useMovies } from "./Hook/useMovies";
import { useGenres } from "./Hook/useGenres";
import Carousel from "./components/Carousel";
import Card from "./components/Card";
import CustomSelect from "./components/Select";
import Modal from "./components/Modal";

export default function Home(): JSX.Element {
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const {
    popularMovies,
    nowPlayingMovies,
    topRateMovies,
    upcomingMovies,
    loadMoreMovies,
    isLoading,
    searchMovies,
    hasMore,
  } = useMovies(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const { genres, isLoading: isGenresLoading } = useGenres();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !isLoading &&
        hasMore
      ) {
        loadMoreMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, hasMore, loadMoreMovies]);

  return (
    <RootLayout>
      <main style={{ overflowX: "hidden" }}>
        <Modal show={showModal} onClose={handleCloseModal} />
        <Nav />
        <div className="banner">
          <img
            src="https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/18wozP6NjPSNBSgCga5bN7yUSzl.jpg"
            alt="Beetlejuice Beetlejuice"
          />
          <div className="banner-content">
            <div className="banner-text">
              <h1>Beetlejuice Beetlejuice</h1>
              <p>
                After a family tragedy, three generations of the Deetz family
                return home to Winter River. Still haunted by Beetlejuice,
                Lydia's life is turned upside down when her teenage daughter,
                Astrid, accidentally opens the portal to the Afterlife.
              </p>
            </div>
            <div className="banner-rating">
              <FaHeart size={21} />
              <div className="rating">71%</div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              width: "260px",
              height: "2199px",
              backgroundColor: "#262626",
              padding: "20px",
              color: "white",
            }}
          >
            <div className="search-container">
              <h3>Search</h3>
              <InputSearch onSearch={handleSearch} />
            </div>

            <div className="gender-container">
              <h3>Genres</h3>
              <div className="input-container">
                {isGenresLoading ? (
                  <p>Loading genres...</p>
                ) : (
                  <CustomSelect options={genres} />
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              width: "1330px",
              backgroundColor: "transparent",
              paddingTop: "20px",
              overflow: "hidden",
            }}
          >
            {searchQuery ? (
              searchMovies.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "10px",
                    marginBottom: "3rem",
                  }}
                >
                  {searchMovies.map((movie, key) => (
                    <Card
                      id={movie.id}
                      key={key}
                      title={movie.title}
                      imageUrl={movie.imageUrl}
                      rating={movie.rating}
                      date={movie.relaseDate}
                    />
                  ))}
                </div>
              ) : (
                <h1>Searching...</h1>
              )
            ) : upcomingMovies &&
              topRateMovies &&
              nowPlayingMovies &&
              popularMovies.length > 0 ? (
              <>
                <Carousel
                  key={1}
                  title="Popular"
                  items={popularMovies}
                  loadMore={loadMoreMovies}
                />
                <Carousel
                  key={2}
                  title="Now Playing"
                  items={nowPlayingMovies}
                  loadMore={loadMoreMovies}
                />
                <Carousel
                  key={3}
                  title="Upcoming"
                  items={upcomingMovies}
                  loadMore={loadMoreMovies}
                />
                <Carousel
                  key={4}
                  title="Top Rated"
                  items={topRateMovies}
                  loadMore={loadMoreMovies}
                />
                <Carousel
                  key={5}
                  title="Favorites"
                  items={nowPlayingMovies}
                  loadMore={loadMoreMovies}
                />
              </>
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
      </main>
    </RootLayout>
  );
}
