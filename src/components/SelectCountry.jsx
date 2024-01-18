import { Autocomplete, Grid, Skeleton, TextField} from "@mui/material"
import useAxios from "../hooks/useAxios"

const SelectCountry = (props) => {
    const { value, setValue, label } = props;
    const [data, loaded, error] = useAxios("https://restcountries.com/v3.1/all");

    if(loaded) {
        return (
            <Grid item xs={12} md={3}>
                <Skeleton variant="rounded" height={60}/>
            </Grid>
        )
    }
    if(error) {
        return "Something went wrong"
    }
    
    const dataFilter = data.filter(item => "currencies" in item);
    // filters out arrays without a currency key
    const dataCountries = dataFilter.map(item => {
        return `${item.flag} ${Object.keys(item.currencies)[0]} - ${item.name.common}`
        // backticks instead of single quotes
    });

  return (
    <Grid item xs={12} md={3}>
       {/* md = Three columns */}
       <Autocomplete
       value={value}
       disableClearable
       onChange={(event, newValue) => {
          setValue(newValue);
        }}
       options={dataCountries}
       renderInput={(params) => <TextField {...params} label={label} />}
       />
    </Grid>
  )
}

export default SelectCountry

