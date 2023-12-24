import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import Chart from './Chart';
import GeneticAlgorithm from './GeneticAlgorithm';
import GitHubIcon from '@mui/icons-material/GitHub';

function App() {
  const [inputs, setInputs] = useState({
    populationSize: 1000,
    maxGeneration: 500,
    acceptableFitness: 1,
    crossRate: 0.08,
    mutationRate: 0.1,
    elitismRate: 0.01,
    tournamentRate: 0.1,
  });

  const [generationData, setGenerationData] = useState([]);

  const handleInputChange = (name) => (event) => {
    setInputs({ ...inputs, [name]: parseFloat(event.target.value) || 0 });
  };

  const runGeneticAlgorithm = () => {
    console.log('Running Genetic Algorithm with Inputs:', inputs);
    const {
      populationSize,
      maxGeneration,
      acceptableFitness,
      crossRate,
      mutationRate,
      elitismRate,
      tournamentRate,
    } = inputs;
    const EightQueensProblem = new GeneticAlgorithm(
      populationSize,
      maxGeneration,
      acceptableFitness,
      crossRate,
      mutationRate,
      elitismRate,
      tournamentRate
    );

    EightQueensProblem.start();
    const dataForUI = EightQueensProblem.getDataForUI();
    setGenerationData(dataForUI);
  };

  return (
    <>
      {' '}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Genetic Algorithm Visualization
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="github"
            href="https://github.com/sina-pr/genetic-algorithm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: '2rem' }}>
        <Paper elevation={3} style={{ padding: '1.5rem', marginTop: '2rem' }}>
          <TextField
            label="Population Size"
            type="number"
            value={inputs.populationSize}
            onChange={handleInputChange('populationSize')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Max Generation"
            type="number"
            value={inputs.maxGeneration}
            onChange={handleInputChange('maxGeneration')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Acceptable Fitness (0-1)"
            type="number"
            value={inputs.acceptableFitness}
            onChange={handleInputChange('acceptableFitness')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Crossover Rate (0-1)"
            type="number"
            value={inputs.crossRate}
            onChange={handleInputChange('crossRate')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Mutation Rate (0-1)"
            type="number"
            value={inputs.mutationRate}
            onChange={handleInputChange('mutationRate')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Elitism Rate (0-1)"
            type="number"
            value={inputs.elitismRate}
            onChange={handleInputChange('elitismRate')}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tournament Rate (0-1)"
            type="number"
            value={inputs.tournamentRate}
            onChange={handleInputChange('tournamentRate')}
            fullWidth
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={runGeneticAlgorithm}
            style={{ marginTop: '1rem' }}
          >
            Run Genetic Algorithm
          </Button>

          <Chart generationData={generationData} />
        </Paper>
      </Container>
    </>
  );
}

export default App;
