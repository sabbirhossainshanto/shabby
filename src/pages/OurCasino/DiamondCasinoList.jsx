import { Link, useNavigate } from "react-router-dom";

const DiamondCasinoList = ({ casino }) => {
  const diamondCasino = {
    eventId: casino?.eventId,
    eventTypeId: casino?.eventTypeId,
    casinoSlug: casino?.slug,
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
      localStorage.removeItem("diamondCasino");
      localStorage.setItem("diamondCasino", JSON.stringify(diamondCasino));
      navigate(`/our-casino/${casino?.slug}`);
  };
  return (
    <div onClick={handleNavigate} className="casino-list-item">
      <Link>
        <div
          className="casino-list-item-banner"
          style={{
            backgroundImage: `url(${casino.image})`,
          }}
        ></div>
     
      </Link>
    </div>
  );
};

export default DiamondCasinoList;