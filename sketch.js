'use strict'

let cities = []

const totalCities = 10
const maxPopulation = 100
const mutationRate = 1

let population = []

let fitness = []

let recordDistance = Infinity
let bestEver

let order = []

function setup() {
  createCanvas(400, 800)

  for (let i = 0; i < totalCities; i++) {
    let v = createVector(random(width), random(height / 1.5))
    cities[i] = v
    order[i] = i
  }

  for (let i = 0; i < maxPopulation; i++) {
    population[i] = shuffle(order)
  }

}

function draw() {
  background(0)

  // GA
  calculateFitness()
  normalizeFitness()
  nextGeneration()

  stroke(255)
  strokeWeight(1)
  noFill()
  beginShape()
  for (let i = 0; i < bestEver.length; i++) {
    let n = bestEver [i]
    vertex(cities[n].x, cities[n].y)
    ellipse(cities[n].x, cities[n].y, 15, 15)
  }
  endShape()
}

function distance (points, order) {
  let sum = 0
  for (let i = 0; i < points.length - 1; i++) {
    var cityAIndex = order[i]
    var cityA = points[cityAIndex]
    var cityBIndex = order[i + 1]
    var cityB = points[cityBIndex]
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y)
    sum += d
  }

  return sum
}