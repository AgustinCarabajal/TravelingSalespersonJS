'use strict'

let cities = []

const totalCities = 5
const maxPopulation = 5

let order = []
let population = []

function setup() {

  for(let i = 0; i < totalCities; i++) {
    order[i] = i
  }

  for (let i = 0; i < maxPopulation; i++) {
    population[i] = shuffle(order)
  }

  console.log(population)

}