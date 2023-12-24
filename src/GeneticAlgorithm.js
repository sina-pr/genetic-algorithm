const { getRandomInt } = require('./utils');

class Chromosome {
  constructor() {
    this.genes = this.generateChromosome();
    this.fitness = this.calculateFitness();
  }

  generateChromosome() {
    const genes = [];
    for (let i = 0; i < 8; i++) {
      genes.push(getRandomInt(0, 7));
    }
    return genes;
  }

  calculateFitness() {
    let conflict = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = i + 1; j < 8; j++) {
        if (
          this.genes[i] === this.genes[j] ||
          this.genes[i] - i === this.genes[j] - j ||
          this.genes[i] + i === this.genes[j] + j
        ) {
          conflict++;
        }
      }
    }
    return (28 - conflict) / 28;
  }

  crossover(parent, rate) {
    if (rate < Math.random()) {
      const child = new Chromosome();
      child.genes = [...this.genes];
      child.fitness = child.calculateFitness();
      return child;
    }

    const midIndex = getRandomInt(0, 7);
    const child = new Chromosome();
    child.genes = [
      ...this.genes.slice(0, midIndex),
      ...parent.genes.slice(midIndex),
    ];
    child.fitness = child.calculateFitness();

    return child;
  }

  mutation(rate) {
    if (rate > Math.random()) {
      const randomIndex = getRandomInt(0, 7);
      const randomNumber = getRandomInt(0, 7);
      this.genes[randomIndex] = randomNumber;
      this.fitness = this.calculateFitness();
    }
  }
}

class GeneticAlgo {
  constructor(
    populationSize,
    maxGeneration,
    acceptableFitness,
    crossRate,
    mutationRate,
    elitismRate,
    tournamentRate
  ) {
    this.populationSize = populationSize;
    this.maxGeneration = maxGeneration;
    this.acceptableFitness = acceptableFitness;
    this.elitismRate = elitismRate;
    this.crossRate = crossRate;
    this.mutationRate = mutationRate;
    this.tournamentRate = tournamentRate;
    this.population = this.initialPopulation(populationSize);
    this.bestGene = this.population[0];
    this.generationData = [];
  }

  initialPopulation(populationSize) {
    const population = [];
    for (let i = 0; i < populationSize; i++) {
      population.push(new Chromosome());
    }
    return population;
  }

  evolve() {
    const elitismCount = Math.ceil(this.elitismRate * this.populationSize);
    const sortedPopulation = [...this.population].sort(
      (a, b) => b.fitness - a.fitness
    );
    const elitisms = sortedPopulation.slice(0, elitismCount);
    // console.log(elitisms, elitismCount);
    const newPopulation = [...elitisms];

    while (newPopulation.length < this.populationSize) {
      const parent1 = this.tournamentSelection();
      const parent2 = this.tournamentSelection();
      const child = parent1.crossover(parent2, this.crossRate);
      child.mutation(this.mutationRate);
      newPopulation.push(child);
    }

    this.population = newPopulation;
  }

  tournamentSelection() {
    const tournamentSize = Math.ceil(this.tournamentRate * this.populationSize);
    const selectedCandidates = [];

    for (let i = 0; i < tournamentSize; i++) {
      const randomIndex = getRandomInt(0, this.populationSize - 1);
      selectedCandidates.push(this.population[randomIndex]);
    }

    let best = selectedCandidates[0];
    for (let i = 0; i < selectedCandidates.length; i++) {
      if (selectedCandidates[i].fitness > best.fitness) {
        best = selectedCandidates[i];
      }
    }

    return best;
  }

  getBestFitnessInGeneration(generation) {
    let best = this.population[0];
    for (let i = 1; i < this.populationSize; i++) {
      if (this.population[i].fitness > best.fitness) {
        best = this.population[i];
      }
    }
    // console.log(`GENERATION <${generation}>:\n BEST FITNESS:\n`, best);
    return best;
  }

  getAverageFitness() {
    let totalFitness = 0;

    for (let i = 0; i < this.populationSize; i++) {
      totalFitness += this.population[i].fitness;
    }

    const averageFitness = totalFitness / this.populationSize;
    return averageFitness;
  }

  start() {
    let bestOfTheBest = this.population[0];
    this.generationData = [];
    for (let i = 0; i < this.maxGeneration; i++) {
      const bestGene = this.getBestFitnessInGeneration(i);
      const averageFitness = this.getAverageFitness();
      this.generationData.push({
        generation: i,
        averageFitness,
        bestFitness: bestGene.fitness,
        genes: bestGene.genes,
      });
      // console.log('average fitness:', averageFitness);

      if (bestGene.fitness > bestOfTheBest.fitness) {
        bestOfTheBest = bestGene;
      }

      if (bestGene.fitness >= this.acceptableFitness) {
        // console.log(
        //   `Acceptable fitness (${
        //     this.acceptableFitness * 100
        //   }%) reached. Solution found.`
        // );
        break;
      }

      if (bestGene.fitness === 1) {
        console.log('Solution found with 100% fitness.');
        break;
      }

      if (i === this.maxGeneration - 1)
        console.log('Maximum generation reached.');
      this.evolve();
    }

    // console.log(
    //   '=====================\nBest Fitness Overall\n',
    //   bestOfTheBest,
    //   '\n====================='
    // );
  }

  getDataForUI() {
    return this.generationData;
  }
}

module.exports = GeneticAlgo;
