import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";

export interface CarouselItem {
  id: number;
  title: string;
  imageUrl?:any;
  relaseDate: string;
  rating: number;
}

interface CarouselProps {
  title?: string;
  items: CarouselItem[];
  loadMore: () => void;
}

const Carousel: React.FC<CarouselProps> = ({ title, items, loadMore }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const carousel = carouselRef.current;
      if (carousel) {
        const { scrollLeft, scrollWidth, clientWidth } = carousel;

        if (scrollLeft + clientWidth >= scrollWidth - 10 && !isLoadingMore) {
          setIsLoadingMore(true);
          loadMore();
        }
      }
    };

    const currentCarousel = carouselRef.current;
    if (currentCarousel) {
      currentCarousel.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentCarousel) {
        currentCarousel.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadMore, isLoadingMore]);

  useEffect(() => {
    if (items.length > 0) {
      setIsLoadingMore(false);
    }
  }, [items]);

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel-wrapper">
        <div
          className="carousel"
          ref={carouselRef}
          style={{
            overflowY: "hidden",
            overflowX: "auto",
            whiteSpace: "nowrap",
          }}
        >
          {items.map((item, key) => (
            <div
              key={key}
              className="carousel-item"
              style={{ display: "inline-block", marginRight: "10px" }}
            >
              <Card
                imageUrl={item.imageUrl}
                title={item.title}
                date={item.relaseDate}
                rating={item.rating}
                id={item.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
