import type { NextPage } from 'next';
import { Stack, Container, Box, Typography, Button, Grid, Link, Chip, CircularProgress } from '@mui/material';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_MOVIE_BY_ID } from '../../src/constants/gql-query.constant';
import { fetcher } from '../../src/utils/fetcher.util';
import MovieCard from '../../src/components/movieCard';

const DetailsPage: NextPage = () => {
    const router = useRouter();
    const { title, id, searchText } = router.query;

    const { loading, data, error } = useQuery(GET_MOVIE_BY_ID, {
        variables: { query: id }
    });

    const { data: wikiData, error: wikiError } = useSWR(() => `/api/wikipedia/${title}`, fetcher);
    const { data: imdbData, error: imdbError } = useSWR(() => `/api/imdb/${title}`, fetcher);

    const goBack = () => {
        router.push({
            pathname: '/',
            query: { searchText }
        });
    };

    const openDetailsPage = (name: string, id: number) => {
        router.push({
            pathname: '/movie/[title]',
            query: { title: name, id, searchText }
        });
    };

    if (error) return <div>{error.message}</div>;
    if (wikiError) return <div>{wikiError.message}</div>;
    if (imdbError) return <div>{imdbError.message}</div>;

    return (
        <Container maxWidth="lg">
            <Stack mt={5} spacing={2} direction="column" justifyContent="center" alignItems="center">
                <Button onClick={() => goBack()}>Go back</Button>
                <Box>{loading && <CircularProgress size="3rem" />}</Box>
                {!loading && (
                    <>
                        <Grid container spacing={4}>
                            <Grid item>
                                <img src={data?.movie?.img?.url} />
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h2" component="div">
                                            {data?.movie?.name}
                                        </Typography>
                                        <Typography variant="subtitle1" gutterBottom>
                                            {data?.movie?.overview}
                                        </Typography>
                                        <Typography gutterBottom component="div">
                                            {data?.movie.genres.map((genre: any) => (
                                                <Chip label={genre.name} size="small" />
                                            ))}
                                        </Typography>
                                        <Typography gutterBottom component="div">
                                            <Button
                                                component={Link}
                                                target="_blank"
                                                rel="noopener"
                                                href={wikiData?.url}>
                                                Wikipedia
                                            </Button>
                                            <Button
                                                component={Link}
                                                target="_blank"
                                                rel="noopener"
                                                href={imdbData?.url}>
                                                IMDB
                                            </Button>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="h3">Similar movies</Typography>
                        </Grid>
                        <Grid container mt={5} spacing={4} direction="row" justifyContent="center" alignItems="center">
                            {data?.movie?.similar.map((movie: any) => (
                                <Grid key={movie?.id} item>
                                    <MovieCard movie={movie} callback={openDetailsPage}></MovieCard>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </Stack>
        </Container>
    );
};

export default DetailsPage;
