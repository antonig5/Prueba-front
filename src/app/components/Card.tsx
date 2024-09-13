import { useRouter } from "next/navigation";
import React from "react";
import { FaHeart } from "react-icons/fa";

interface CardProps {
  title: string;
  date: string;
  imageUrl: string;
  rating: number;
  id: number;
}

const Card: React.FC<CardProps> = ({ title, date, imageUrl, rating, id }) => {
  const ratingPercentage = Math.round(rating * 10);

  let borderColor;
  if (ratingPercentage > 65) {
    borderColor = "green";
  } else if (ratingPercentage > 50) {
    borderColor = "orange";
  } else {
    borderColor = "red";
  }

  const router = useRouter();

  return (
    <div
      className="card"
      onClick={() => {
        router.push(`/movie/${id}`);
      }}
    >
      <img src={imageUrl} alt={title} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-date">{date}</p>
        <div
          className="card-footer"
          style={{ marginBottom: 20, paddingBottom: 20 }}
        >
          <div className="rating-container">
            <span>Rating</span>
            <div
              className="rating-circle"
              style={{
                border: `1px solid ${borderColor}`,
              }}
            >
              {ratingPercentage}%
            </div>
          </div>
          <div className="favorites">
            <span>Favorites</span>
            <FaHeart size={21} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
