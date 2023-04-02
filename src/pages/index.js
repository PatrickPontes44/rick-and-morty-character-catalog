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
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';

import { Search, Close, Star, StarBorder } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

import Pagination from '../components/CustomPagination/Pagination';

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
  const [verifyFavorite, addFavorite, removeFavorite] = useFavorites();
  const [ search, setSearch ] = useState("")
  const [ url, setUrl ] = useState("https://rickandmortyapi.com/api/character")

  useEffect(() => {
    fetchData(url);
  }, [url]);

  const handleSearch = ()=>{
    let URL_OBJ = new URL(url);

    if(URL_OBJ.searchParams.get('name')){
      URL_OBJ.searchParams.set("name", search)
    }else{
      URL_OBJ.searchParams.append("name", search)
    }
    const parsedURL = URL_OBJ.toString()
    setUrl(parsedURL)
  }

  const handleFilter = (name, value)=>{
    let URL_OBJ = new URL(url);

    if(value === "all"){
      URL_OBJ.searchParams.delete(name)
    }else{
      if(URL_OBJ.searchParams.get(name)){
        URL_OBJ.searchParams.set(name, value)
      }else{
        URL_OBJ.searchParams.append(name, value)
      }
    }
    const parsedURL = URL_OBJ.toString()
    setUrl(parsedURL)

  }

  const handleCleanInput = ()=>{
    setSearch("")
    let URL_OBJ = new URL(url);
    URL_OBJ.searchParams.delete("name")
    const parsedURL = URL_OBJ.toString()
    setUrl(parsedURL)
  }

  const handlePageChange = (value) => {
    setUrl(`https://rickandmortyapi.com/api/character?page=${value}`)
  };

  const handleOpenCharacter = (id) =>{
    router.push(`/personagem/${id}`)
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
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={6}>
                  <TextField label="Pesquisar personagem" variant="outlined" color='secondary'
                  fullWidth
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
                </Grid>
                <Grid item xs={12} md={12} lg={3}>
                  <FormControl fullWidth>
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                      labelId="status-label"
                      label="Status"
                      defaultValue="all"
                      onChange={(evt)=> handleFilter("status", evt.target.value)}
                    >
                      <MenuItem value="all">Todos</MenuItem>
                      <MenuItem value="alive">Vivo</MenuItem>
                      <MenuItem value="dead">Morto</MenuItem>
                      <MenuItem value="unknown">Desconhecido</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={3}>
                  <FormControl fullWidth>
                    <InputLabel id="gender-label">Gênero</InputLabel>
                    <Select
                      labelId="gender-label"
                      label="Gênero"
                      defaultValue="all"
                      onChange={(evt)=> handleFilter("gender", evt.target.value)}
                    >
                      <MenuItem value="all">Todos</MenuItem>
                      <MenuItem value="male">Masculino</MenuItem>
                      <MenuItem value="female">Feminino</MenuItem>
                      <MenuItem value="genderless">Sem gênero</MenuItem>
                      <MenuItem value="unknown">Desconhecido</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Stack>

            <Grid container spacing={2}>
              {
                data && data.results.map((item)=> {
                  return(
                    <Grid item xs={12} md={3} lg={4} key={item.id}>
                      <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea onClick={()=> handleOpenCharacter(item.id)} onDoubleClick={()=> addFavorite(item.id)}>
                          <CardMedia
                            sx={{ height: "300px" }}
                            image={item.image}
                            title={item.name}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                              {item.id} - {item.name}
                            </Typography>
                            <Stack direction="row" columnGap={2} flexWrap="wrap" justifyContent="flex-start" alignItems="flex-start">
                              <Typography variant="subtitle2" color="text.secondary">
                                {`Espécie: ${item.species}`}
                              </Typography>
                              <Typography variant="subtitle2" color="text.secondary">
                                {`Gênero: ${GENDER[item.gender]}`}
                              </Typography>
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
            <Pagination pages={data?.info.pages} onChange={handlePageChange} />
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
