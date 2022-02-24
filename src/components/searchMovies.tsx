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
    CardActionArea,
    CircularProgress
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import MovieCard from './movieCard';
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
        if (searchText !== '') {
            executeSearch({
                variables: { query: searchText }
            });
        }
    };

    const handleClear = () => {
        router.reload();
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
        router.replace('/', undefined, { shallow: true });
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
                <Input
                    type="text"
                    id="movie_search_field"
                    value={searchText}
                    onKeyPress={handleKeypress}
                    onChange={handleChange}
                />
                <Box ml={2}>
                    <Button id="movie_search_button" variant="contained" onClick={handleSearch}>
                        Search
                    </Button>
                </Box>
                {searchText !== '' && (
                    <Box ml={2}>
                        <Button onClick={handleClear}>Clear</Button>
                    </Box>
                )}
            </Box>

            {loading && (
                <Box mt={5} display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress size="4rem" />
                </Box>
            )}
            {!loading && searchText !== '' && (
                <Grid container mt={5} spacing={4} direction="row" justifyContent="center" alignItems="center">
                    {data?.searchMovies?.length === 0 && (
                        <Box mt={5} display="flex" alignItems="center" justifyContent="center">
                            <Typography variant="h5">No movie matches your search :(</Typography>
                        </Box>
                    )}
                    {data?.searchMovies.map((movie: any) => (
                        <Grid key={'movie_' + movie?.id} item>
                            <MovieCard movie={movie} callback={openDetailsPage}></MovieCard>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
}
