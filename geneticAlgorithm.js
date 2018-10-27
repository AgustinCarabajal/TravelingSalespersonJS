function calculateFitness() {
  for (let i = 0; i < population.length; i++) {
    let d = distance(cities, population[i])

    if(d < recordDistance) {
      recordDistance = d
      bestEver = population[i]
    }

    // to get a higher fitness score
    fitness[i] = 1 / (d + 1)
  }
}

function normalizeFitness() {
  let sum = 0

  for (let i = 0; i < fitness.length; i++) { 
    sum += fitness[i]
  }

  for (let i = 0; i < fitness.length; i++) { 
    fitness[i] = fitness[i] / sum
  }
}

function nextGeneration() {
  let newPopulation = []

  for (let i = 0; i < population.length; i++) {
    // newPopulation[i] = population[i].slice()

    // let order = pickOne(population, fitness)

    // Adding crossover
    let order = crossOver(pickOne(population, fitness), pickOne(population, fitness))

    mutate(order, mutationRate)
    newPopulation[i] = order
  }

  population = newPopulation
}

function pickOne(arr, prob) {
  let index = 0 
  let r = random(1)

  while (r > 0) {
    r = r - prob[index++]
  }

  return arr[--index].slice()
}

function crossOver(orderA, orderB) {
  let start = floor(random(orderA.length))
  let end = floor(random(start + 1, orderB.length))
  let newOrder = orderA.slice(start, end)

  for(let i = 0; i < orderB.length; i++) {
    let city = orderB[i]
    if (!newOrder.includes(city)) {
      newOrder.push(city)
    }
  }

  return newOrder
}

function mutate(order, mutationRate) {
  for(let i = 0; i < totalCities; i ++) {
    if (random(1) < mutationRate) {
      let indexA = floor(random(order.length))
      // let indexB = floor(random(order.length))
      let indexB = (indexA + 1) % totalCities
      swap(order, indexA, indexB)
    }
  }
}

function swap (arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}