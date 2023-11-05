import './App.css';
import {Table} from "./Table.tsx";

function App() {
  return (
    <div className="App">
        <Table currencyTarget={process.env.REACT_APP_CURRENCY_TARGET} currencyBase={process.env.REACT_APP_CURRENCY_BASE}
               spreadBuy={process.env.REACT_APP_SPREAD_BUY} spreadSell={process.env.REACT_APP_SPREAD_SELL}/>
    </div>
  )
}

export default App;
