import type { NextPage } from 'next'
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MovieIcon from '@mui/icons-material/Movie';
import useSWR from "swr";
import ClientOnly from '../components/clientOnly';
import SearchMovies from '../components/searchMovies';

const ariaLabel = { 'aria-label': 'description' };
const fetcher = async (url: RequestInfo) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

const Home: NextPage = () => {

  const { data, error } = useSWR(
      () => `/api/hello`,
      fetcher
  )

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>

  return (
      <Container maxWidth="lg">
        <Stack mt={5} spacing={4} direction="column" justifyContent="center" alignItems="center">
          <Grid container alignItems="center" justifyContent="center" spacing={2}>
            <Grid item>
              <Typography variant="h2">
                Find a Movie tonight
              </Typography>
            </Grid>
            <Grid item>
              <MovieIcon sx={{ fontSize: 70 }}/>
            </Grid>
          </Grid>
          <Box>
            <ClientOnly>
              <SearchMovies />
            </ClientOnly>
          </Box>
        </Stack>
      </Container>
  )
}

export default Home
