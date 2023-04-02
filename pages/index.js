// Next
import Head from 'next/head';

// Hooks
import { useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { useRouter } from 'next/router';
import useFavorites from '../hooks/useFavorites';


// Material UI
import {
  Container,
  Stack, 
  Typography, 
  Button,
  Paper,
  TextField,
  IconButton,
  Dialog,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
} from '@mui/material';
import { Search, Close, Star, StarBorder } from '@mui/icons-material';
import { grey } from '@mui/material/colors';


// Componentes
import Loading from '../components/Loading/Loading';

const STATUS = {
  "Alive": "Vivo",
  "Dead": "Morto",
  "unknown": "Desconhecido",
}

const GENDER = {
  "Female": "Feminino",
  "Male": "Masculino",
  "Genderless": "Sem gênero",
  "unknown": "Desconhecido",
}

export default function Home() {
  const router = useRouter();
  const [data, isLoading, error, fetchData] = useAxios();
  const [favorites, verifyFavorite, addFavorite, removeFavorite] = useFavorites();
  const [ search, setSearch ] = useState("")

  useEffect(() => {
    fetchData('https://rickandmortyapi.com/api/character');
  }, []);

  const handleSearch = ()=>{
    fetchData(`https://rickandmortyapi.com/api/character/?name=${search}`);
  }

  const handleCleanInput = ()=>{
    setSearch("")
    fetchData('https://rickandmortyapi.com/api/character');
  }

  const handleOpenCharacter = (character) =>{
    console.log(character)
  }

  if(error){
    router.push("/error");
  }

  return (
    <Stack
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: grey[900],
      margin: 0,
      py: 8,
    }}>
      <Head>
        <title>Catálogo - Rick & Morty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Container>
          <Paper sx={{
            py: 8,
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}>
            <Stack gap={4}>
              <Typography variant='h4' sx={{ textAlign: 'center', m: 0 }}>Pesquise um persongem</Typography>
              <TextField label="Pesquisar personagem" variant="outlined" color='secondary'
              value={search}
              onChange={(evt)=> setSearch(evt.target.value)}
              onKeyDown={(evt)=>{
                if(evt.key === 'Enter'){
                  handleSearch()
                }
              }}
              InputProps={{
                endAdornment: <Stack direction="row">
                  <IconButton onClick={handleSearch}><Search /></IconButton>
                  <IconButton onClick={handleCleanInput}><Close /></IconButton>
                </Stack>
              }}
              />
            </Stack>

            <Grid container spacing={2}>
              {
                data && data.results.map((item)=> {
                  return(
                    <Grid item xs={12} md={3} lg={4} key={item.id}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea onClick={()=> handleOpenCharacter(item)}>
                          <CardMedia
                            sx={{ height: "300px" }}
                            image={item.image}
                            title={item.name}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                              {item.id} - {item.name}
                            </Typography>
                            <Stack direction="row">
                              <Typography variant="subtitle2" color="text.secondary">
                                {`Espécie: ${item.species}`}
                              </Typography>
                            </Stack>
                            <Stack direction="row">
                              <Typography variant="subtitle2" color="text.secondary">
                                {`Gênero: ${GENDER[item.gender]}`}
                              </Typography>
                            </Stack>
                            <Stack direction="row">
                              <Typography variant="subtitle2" color="text.secondary">
                                {`Status: ${STATUS[item.status]}`}
                              </Typography>
                            </Stack>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          {
                            verifyFavorite(item.id) ?
                            <IconButton size='large' onClick={()=> removeFavorite(item.id)}>
                              <Star color='warning' />
                            </IconButton>
                            :
                            <IconButton size='large' onClick={()=> addFavorite(item.id)}>
                              <StarBorder />
                            </IconButton>
                          }
                        </CardActions>
                      </Card>
                    </Grid>
                  )
                })
              }
            </Grid>
          </Paper>
        </Container>
        <Dialog open={isLoading || false}
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}>
          <Loading />
        </Dialog>
    </Stack>
  )
}
