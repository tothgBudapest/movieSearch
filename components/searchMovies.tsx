import { useQuery, useLazyQuery, gql } from "@apollo/client";
import { Input, Button, Box, Grid, Card, CardContent, Chip, Typography, CardMedia } from '@mui/material';
import CircularProgress from "@mui/material/CircularProgress";
import {useState} from "react";

const ariaLabel = {'aria-label': 'description'};

const QUERY = gql`
  query SearchMovies($query: String!) {
      searchMovies(query: $query) {
        id
        name
        genres {
            name
        }
        score
        releaseDate
        img: poster {
            url: custom(size: "w185_and_h278_bestv2")
        }
      }
  }
`;

export default function SearchMovies() {
    const [searchText, setSearchText] = useState('');
    const [executeSearch, { loading, data, error }] = useLazyQuery(
        QUERY
    );

    if (error) {
        console.error(error);
        return null;
    }

    const handleChange = (e: { target: { value: any } }) => setSearchText(e.target.value);
    const handleKeypress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const handleSearch = () => {
        executeSearch({
            variables: { query: searchText }
        })
    }

    const getYear = (dateTime: any) => {
        return new Date(dateTime).getFullYear();
    }

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="center">
                <Input type="text" value={searchText} onKeyPress={handleKeypress} onChange={handleChange} />
                <Button onClick={handleSearch}>Search</Button>
            </Box>

            {loading &&
                <Box mt={5} display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress size="6rem"/>
                </Box>
            }
            {!loading &&
                <Grid container mt={5} spacing={4} direction="row" justifyContent="center" alignItems="center">
                    {data?.searchMovies.map((movie: any) => (
                        <Grid item>
                            <Card sx={{ minWidth: 185, maxWidth: 185 }}>
                                <CardMedia
                                    component="img"
                                    height="278"
                                    width="185"
                                    image={movie?.img?.url}
                                />
                                <CardContent>
                                    <Box minHeight="50px" maxHeight="50px">
                                        <Typography variant="subtitle2" component="div">
                                            {movie.name}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2">
                                        {movie?.genres[0]?.name}
                                    </Typography>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        <Grid item>
                                            <Typography variant="body2">
                                                {getYear(movie?.releaseDate)}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Chip label={movie.score} size="small" />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            }
        </>
    );
}
