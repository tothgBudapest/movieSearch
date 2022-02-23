import { useQuery, useLazyQuery, gql } from "@apollo/client";
import styles from "../styles/Home.module.css";
import { Input, Button, Box, Grid, Card, CardContent, CardActions, Typography, CardMedia } from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import {useState} from "react";

const ariaLabel = {'aria-label': 'description'};

const QUERY = gql`
  query SearchMovies($query: String!) {
      searchMovies(query: $query) {
        id
        name
        img: poster {
            url: custom(size: "w185_and_h278_bestv2")
        }
      }
  }
`;

export default function PopularMovies() {
    const [searchText, setSearchText] = useState('');
    const [executeSearch, { loading, data, error }] = useLazyQuery(
        QUERY
    );

    if (error) {
        console.error(error);
        return null;
    }

    const handleChange = (e: { target: { value: any } }) => setSearchText(e.target.value);
    const handleSubmit = () => {
        executeSearch({
            variables: { query: searchText }
        })
    }

    return (
        <>
            <Box>
                <Input type="text" value={searchText} onChange={handleChange} />
                <Button onClick={handleSubmit}>Search</Button>
            </Box>

            {loading && <CircularProgress /> }
            {!loading &&
                <Grid container mt={5} spacing={4} direction="row" justifyContent="center" alignItems="center">
                    {data?.searchMovies.map((movie: any) => (
                        <Grid item>
                            <Card sx={{ minWidth: 275 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={movie.img.url}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {movie.name}
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            }
        </>
    );
}
