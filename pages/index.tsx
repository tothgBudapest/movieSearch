import type { NextPage } from 'next';
import { Stack, Container, Box, Typography, Grid } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import ClientOnly from '../src/components/clientOnly';
import SearchMovies from '../src/components/searchMovies';

const Home: NextPage = () => {
    return (
        <Container maxWidth="lg">
            <Stack mt={5} spacing={4} direction="column" justifyContent="center" alignItems="center">
                <Grid container alignItems="center" justifyContent="center" spacing={2}>
                    <Grid item>
                        <Typography variant="h2">Find a Movie tonight</Typography>
                    </Grid>
                    <Grid item>
                        <MovieIcon sx={{ fontSize: 70 }} />
                    </Grid>
                </Grid>
                <Box>
                    <ClientOnly>
                        <SearchMovies />
                    </ClientOnly>
                </Box>
            </Stack>
        </Container>
    );
};

export default Home;
