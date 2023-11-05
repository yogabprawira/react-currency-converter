import axios from "axios";

const ExchangeRate = async (currencyBase)=> {
    const exchangeRateUrl= `${process.env.REACT_APP_URL}/${currencyBase}`
    try {
        const response= await axios.get(exchangeRateUrl)
        return response.data.rates
    } catch (error) {
        throw error
    }
}

export default ExchangeRate