/* global chrome */
import './App.css';
import CoinsTable from './components/CoinsTable';
import Customize from './components/Customize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh, faGear, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [customizeOpened, setCustomizeOpened] = useState(false);

    const getStorageData = () => {
        return new Promise((resolve, reject) => {
            var customCoins = new Array();
            chrome.storage.local.get(['customCoins'], function (result) {
                if(result.customCoins === null || result.customCoins === undefined) {
                    resolve([]);
                }
                else {
                    for (let i = 0; i < Object.values(result.customCoins).length; i++) {
                        customCoins[i] = Object.values(result.customCoins)[i];
                    }
                    resolve(customCoins);
                }                
            });            
        });
    };

    const fetchCoins = async () => {
        setLoading(true);
        const data = await getStorageData();
        const customCoins = data;
        if (customCoins.length != 0) {
            console.log('In if statement');
            let joinedCoins = customCoins.join('%2C');
            const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${joinedCoins}&order=gecko_desc&per_page=7&page=1&sparkline=false&price_change_percentage=24`);
            setCoins(data);
        }
        else {
            const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=7&page=1&sparkline=false&price_change_percentage=24h');
            setCoins(data);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchCoins();
    }, []);

    return (
        <div>
            <div className="options">
                <span>
                    <FontAwesomeIcon icon={faRefresh} onClick={() => fetchCoins()} />
                </span>
                {!customizeOpened && 
                    <span>
                        <FontAwesomeIcon icon={faGear} onClick={() => setCustomizeOpened(true)} />
                    </span>
                }
                {customizeOpened &&
                    <span>
                        <FontAwesomeIcon icon={faArrowLeft} onClick={() => setCustomizeOpened(false)} />
                    </span>
                }
                
            </div>
            {loading ? (
                <div styles={{ margin: "0 auto" }}>Loading...</div>
            ) : (customizeOpened ? (<Customize fetchCoins={fetchCoins} setCustomizeOpened={setCustomizeOpened}/>) : (<CoinsTable coins = { coins } />)) }
        </div>
    );
}

export default App;
