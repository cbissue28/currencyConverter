import { Container, Grid, Typography } from '@mui/material'
import InputAmount from './components/InputAmount'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { useContext, useEffect, useState } from 'react';
import { CurrencyContext } from './context/CurrencyContext';
import axios from 'axios';
import { Box } from '@mui/system';

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useContext(CurrencyContext)
  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];
  // seperates country data and selects the currency (string)
  console.log(resultCurrency)

  useEffect(() => {
    if(firstAmount) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey:"fca_live_U1wzety4zYC2QDpWUH2c9KKpqJBzQkpA26G34WfY",
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      })
      .then(response => setResultCurrency(response.data.data[codeToCurrency]))
      .catch(error => console.log(error))
    }

  }, [firstAmount, fromCurrency, toCurrency])

  const boxStyles = {
    background: "white",
    marginTop: "10rem",
    textAlign:"center",
    color: "black",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative"
  }


  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant="h5" sx={{ marginBottom: "2rem", fontFamily: }}>Currency Converter</Typography>
      <Grid container spacing={2}>
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
        <InputAmount />
        <SwitchCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>

      {firstAmount ? (
        <Box sx={{ textAlign: "left", marginTop: "1rem"}}>
          <Typography>{firstAmount} {fromCurrency} =</Typography>
          <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold"}}>{(resultCurrency*firstAmount).toFixed(2)} {toCurrency}</Typography>
        </Box>
      ) : ""}
    </Container>
  )
}

export default App
