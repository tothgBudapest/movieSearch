import { useLazyQuery } from '@apollo/client';
import {
    Input,
    Button,
    Box,
    Grid,
    Card,
    CardContent,
    Chip,
    Typography,
    CardMedia,
    CardActions,
    CircularProgress
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { SEARCH_MOVIES_BY_STRING } from '../constants/gql-query.constant';

export default function SearchMovies() {
    const router = useRouter();
    const [searchText, setSearchText] = useState('');
    const [executeSearch, { loading, data, error }] = useLazyQuery(SEARCH_MOVIES_BY_STRING);

    const handleChange = (e: { target: { value: any } }) => setSearchText(e.target.value);
    const handleKeypress = (e: { key: string }) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const handleSearch = () => {
        executeSearch({
            variables: { query: searchText }
        });
    };

    const getYear = (dateTime: any) => {
        return new Date(dateTime).getFullYear();
    };

    const openDetailsPage = (name: string, id: number) => {
        router.push({
            pathname: '/movie/[title]',
            query: { title: name, id, searchText }
        });
    };

    if (searchText === '' && router?.query?.searchText) {
        setSearchText(router.query.searchText as string);
        executeSearch({
            variables: { query: router.query.searchText as string }
        });
    }

    if (error) {
        console.error(error);
        return (
            <Box mt={5} display="flex" alignItems="center" justifyContent="center">
                <Typography variant="h5">Something went wrong...</Typography>
            </Box>
        );
    }

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="center">
                <Input type="text" value={searchText} onKeyPress={handleKeypress} onChange={handleChange} />
                <Button onClick={handleSearch}>Search</Button>
            </Box>

            {loading && (
                <Box mt={5} display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress size="6rem" />
                </Box>
            )}
            {!loading && (
                <Grid container mt={5} spacing={4} direction="row" justifyContent="center" alignItems="center">
                    {data?.searchMovies?.length === 0 && (
                        <Box mt={5} display="flex" alignItems="center" justifyContent="center">
                            <Typography variant="h5">No movie matches your search :(</Typography>
                        </Box>
                    )}
                    {data?.searchMovies.map((movie: any) => (
                        <Grid item>
                            <Card sx={{ minWidth: 185, maxWidth: 185 }}>
                                <CardMedia component="img" height="278" width="185" image={movie?.img?.url} />
                                <CardContent>
                                    <Box minHeight="50px" maxHeight="50px">
                                        <Typography variant="subtitle2" component="div">
                                            {movie.name}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2">{movie?.genres[0]?.name}</Typography>
                                    <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                        <Grid item>
                                            <Typography variant="body2">{getYear(movie?.releaseDate)}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Chip label={movie.score} size="small" />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={() => openDetailsPage(movie.name, movie.id)}>
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
}
