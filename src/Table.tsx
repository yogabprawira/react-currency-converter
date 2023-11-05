import {useEffect, useState} from "react";
import ExchangeRate from "./ExchangeRate"
import './Table.css'

interface RowsParam {
    currency: string
    rate: number
    spreadBuy: string
    spreadSell: string
}

const Row = (param: RowsParam) => {
    const buyPrice = param.rate * (100 + parseFloat(param.spreadBuy)) / 100
    const sellPrice = param.rate * (100 - parseFloat(param.spreadSell)) / 100
    return (
        <div className='row'>
            <div className='col cell'>
                {param.currency}
            </div>
            <div className='col cell'>
                {buyPrice?.toFixed(2)}
            </div>
            <div className='col cell'>
                {param.rate?.toFixed(2)}
            </div>
            <div className='col cell'>
                {sellPrice?.toFixed(2)}
            </div>
        </div>
    )
}


interface TableParams {
    currencyTarget: string;
    currencyBase: string;
    spreadBuy: string;
    spreadSell: string;
}

export const Table = (param: TableParams) => {
    const titles = ['Currency', 'We Buy', 'Exchange Rate', 'We Sell']
    const currencies = param.currencyTarget.split(',')
    const [rates, setRates] = useState({})

    useEffect(() => {
        (async ()=> {
            try {
                const exchangeRates = await ExchangeRate(param.currencyBase);
                setRates(exchangeRates);
            } catch (error) {
                console.error("Error: ", error);
            }
        })()
    }, [param.currencyBase]);

    return (
        <>
            <header>
                {titles.map((value, index) => {
                    return <div key={index} className='col'>
                        <p className='title'>{value}</p>
                    </div>
                })}
            </header>
            {currencies.map((curr, index) => {
                return (
                    <Row key={index} currency={curr} rate={rates[curr]} spreadBuy={param.spreadBuy}
                         spreadSell={param.spreadSell}/>
                )
            })}
        </>
    )
}
