// import React, { useState, useEffect } from "react";

// const Dashboard = () => {
//   const [cryptoData, setCryptoData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({ marketCapRange: [], volume: [] });

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(
//         "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"
//       );
//       const data = await response.json();
//       setCryptoData(data);
//     };
//     fetchData();
//   }, []);

//   const totalCryptos = cryptoData.length;
//   const avg24hMarketChange =
//     cryptoData.reduce(
//       (acc, crypto) =>
//         acc + (crypto.price_change_percentage_24h_in_currency || 0),
//       0
//     ) / totalCryptos;
//   const marketCapRange = [
//     Math.min(...cryptoData.map((crypto) => crypto.market_cap)),
//     Math.max(...cryptoData.map((crypto) => crypto.market_cap)),
//   ];

//   const filteredData = cryptoData
//     .filter((crypto) =>
//       crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .filter((crypto) => {
//       if (filters.marketCapRange.length === 2) {
//         return (
//           crypto.market_cap >= filters.marketCapRange[0] &&
//           crypto.market_cap <= filters.marketCapRange[1]
//         );
//       }
//       return true;
//     })
//     .filter((crypto) => {
//       if (filters.volume.length === 2) {
//         return (
//           crypto.total_volume >= filters.volume[0] &&
//           crypto.total_volume <= filters.volume[1]
//         );
//       }
//       return true;
//     });

//   return (
//     <div>
//       <div>
//         <h2>Summary</h2>
//         <p>Total Cryptos: {totalCryptos}</p>
//         <p>Avg 24h Market Change: {avg24hMarketChange.toFixed(2)}%</p>
//         <p>
//           Market Cap Range: ${marketCapRange[0]} - ${marketCapRange[1]}
//         </p>
//       </div>

//       <div>
//         <input
//           type="text"
//           placeholder="Search by name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Add more filter options as needed */}

//       <ul>
//         {filteredData.map((crypto) => (
//           <li key={crypto.id}>
//             {crypto.name} - ${crypto.current_price}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    marketCap: [0, Number.MAX_VALUE],
    volume: [0, Number.MAX_VALUE],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h"
      );
      const data = await response.json();
      setCryptoData(data);
    };
    fetchData();
  }, []);

  const totalCryptos = cryptoData.length;
  const avg24hMarketChange =
    cryptoData.reduce(
      (acc, crypto) =>
        acc + (crypto.price_change_percentage_24h_in_currency || 0),
      0
    ) / totalCryptos;
  const marketCapMax = Math.max(
    ...cryptoData.map((crypto) => crypto.market_cap)
  );

  const filteredData = cryptoData
    .filter((crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (crypto) =>
        crypto.market_cap >= filters.marketCap[0] &&
        crypto.market_cap <= filters.marketCap[1]
    )
    .filter(
      (crypto) =>
        crypto.total_volume >= filters.volume[0] &&
        crypto.total_volume <= filters.volume[1]
    );

  return (
    <div>
      <div>
        <h2>Summary</h2>
        <p>Total Cryptos: {totalCryptos}</p>
        <p>Avg 24h Market Change: {avg24hMarketChange.toFixed(2)}%</p>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <h4>Filter by Market Cap</h4>
        Min:{" "}
        <input
          type="range"
          min="0"
          max={marketCapMax}
          value={filters.marketCap[0]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              marketCap: [Number(e.target.value), prev.marketCap[1]],
            }))
          }
        />
        Max:{" "}
        <input
          type="range"
          min="0"
          max={marketCapMax}
          value={filters.marketCap[1]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              marketCap: [prev.marketCap[0], Number(e.target.value)],
            }))
          }
        />
      </div>

      <div>
        <h4>Filter by Volume</h4>
        Min:{" "}
        <input
          type="range"
          min="0"
          max={marketCapMax}
          value={filters.volume[0]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              volume: [Number(e.target.value), prev.volume[1]],
            }))
          }
        />
        Max:{" "}
        <input
          type="range"
          min="0"
          max={marketCapMax}
          value={filters.volume[1]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              volume: [prev.volume[0], Number(e.target.value)],
            }))
          }
        />
      </div>

      <ul>
        {filteredData.map((crypto) => (
          <li key={crypto.id}>
            {crypto.name} - ${crypto.current_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
