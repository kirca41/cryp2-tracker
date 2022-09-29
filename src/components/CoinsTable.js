import React from 'react';

const CoinsTable = (props) => {

    return (
        <>
            <div style={{ textAlign: "center" }}>
                <div>
                    <h1 className="title">
                        Trending cryptocurrencies
                    </h1>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                {["Coin", "Price", "24h Change"].map((head) => (
                                    <th
                                        key={head}
                                    >
                                        {head}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {props.coins.map((coin) => {
                                const profit = coin.price_change_percentage_24h > 0;

                                return (
                                    <tr key={coin.name}>
                                        <td
                                            scope="row"
                                            className="coin-cell"
                                        >
                                            <img
                                                src={coin.image}
                                                alt={coin.name}
                                                className="coin-image"
                                            />
                                            <div className="coin-symbol-name">
                                                <span>{coin.symbol.toUpperCase()}</span>
                                                <span>{coin.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            {Number(coin.current_price).toFixed(2)} $
                                        </td>
                                        <td style={{ color: profit > 0 ? "green" : "red", fontWeight: "bold" }}>
                                            {profit && "+"}
                                            {Number(coin.price_change_percentage_24h).toFixed(3)}%
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CoinsTable;