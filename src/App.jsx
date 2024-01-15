import { Button, Container, Grid, Typography } from '@mui/material'
import InputAmount from './components/InputAmount'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { positions } from '@mui/system'

function App() {
  const boxStyles = {
    background: "white",
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
      <Typography variant="h5" sx={{ marginBottom: "2rem"}}>Currency Converter</Typography>
      <Grid container spacing={2}>
        <InputAmount />
        <SelectCountry />
        <SwitchCurrency />
      </Grid>
    </Container>
  )
}

export default App
