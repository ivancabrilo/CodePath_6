import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailView = () => {
  const { id } = useParams();
  const [cryptoDetail, setCryptoDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      const data = await response.json();
      setCryptoDetail(data);
    };
    fetchData();
  }, [id]);

  if (!cryptoDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>
        {cryptoDetail.name} ({cryptoDetail.symbol.toUpperCase()})
      </h1>
      <img src={cryptoDetail.image.small} alt={cryptoDetail.name} />
      <p>Current Price: ${cryptoDetail.market_data.current_price.usd}</p>
      <p>Market Rank: {cryptoDetail.market_cap_rank}</p>
      <p>High 24h: ${cryptoDetail.market_data.high_24h.usd}</p>
      <p>Low 24h: ${cryptoDetail.market_data.low_24h.usd}</p>
      {/* <p>24h Volume: ${cryptoDetail.market_data.total_volume.usd}</p> */}
      {/* <p>Market Cap: ${cryptoDetail.market_data.market_cap.usd}</p> */}
      {/* <p>Total Supply: {cryptoDetail.market_data.total_supply || "N/A"}</p> */}
      <p>
        Price Change Percentage 24h:{" "}
        {cryptoDetail.market_data.price_change_percentage_24h.toFixed(2)}%
      </p>

      {cryptoDetail.description && cryptoDetail.description.en && (
        <>
          <h2>Description:</h2>
          <p>{cryptoDetail.description.en}</p>
        </>
      )}
    </div>
  );
};

export default DetailView;
