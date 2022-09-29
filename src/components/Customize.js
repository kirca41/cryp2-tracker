/* global chrome */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Customize = ({ fetchCoins, setCustomizeOpened }) => {

    const [allCoins, setAllCoins] = useState([]);
    const [selectedCoins, setSelectedCoins] = useState([]);

    const fetchAllCoins = async () => {
        const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=30&page=1&sparkline=false');
        setAllCoins(data);
    }

    const handleCheckboxChange = (e) => {
        const coinId = e.target.dataset.coin;

        if (e.target.checked) {
            let newList = selectedCoins;
            newList.push(coinId);

            setSelectedCoins(newList);
        }
        else {
            const id = selectedCoins.indexOf(coinId);

            if (id !== -1) {
                let newList = selectedCoins;
                newList.splice(id, 1);

                setSelectedCoins(newList);
            }
        }
    }

    const handleSubmit = () => {
        chrome.storage.local.set({ 'customCoins' : selectedCoins }, function () {
            console.log('Value is set to ' + selectedCoins);
        });
        setCustomizeOpened(false);
        fetchCoins();
    }

    useEffect(() => {
        fetchAllCoins();
    }, []);

    return (
        <div>
            <table className="customize-table">
                <thead>
                    <tr>
                        {[" ", "Coin"].map((head) => (
                            <th
                                key={head}
                            >
                                {head}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {allCoins.map((coin) => {
                        return (
                            <tr key={coin.name}>
                                <td>
                                    <input type="checkbox" data-coin={coin.id} onChange={(e) => handleCheckboxChange(e)}/>
                                </td>
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
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button className="save-btn" onClick={handleSubmit}>Save</button>
        </div>
    );

};

export default Customize;   