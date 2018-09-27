'use strict'

const totalCities = 5

var cities = []
var record
var best = []

function setup() {
  createCanvas(400, 300)

  for(let i = 0; i < totalCities; i++) {
    let v = createVector(random(width), random(height))
    cities[i] = v
  }

  let d = distance(cities)
  record = d
  best = cities.slice()
}

function draw() {
    background(0)

    fill(255)
    for(let i = 0; i < cities.length; i++) {
      ellipse(cities[i].x, cities[i].y, 8, 8)
    }

    stroke(50)
    strokeWeight(1)
    noFill()
    beginShape()
    for(let i = 0; i < cities.length; i++) {
      vertex(cities[i].x, cities[i].y)
    }
    endShape()

    stroke(25, 185, 200)
    strokeWeight(4)
    noFill()
    beginShape()
    for(let i = 0; i < best.length; i++) {
      vertex(best[i].x, best[i].y)
    }
    endShape()

    let i = floor(random(cities.length))
    let j = floor(random(cities.length))
    swap(cities, i, j)

    let d = distance(cities)
    if(d < record) {
      record = d
      best = cities.slice()
    }

}

function swap(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

function distance(points) {
  let sum = 0
  for(let i = 0; i < points.length - 1; i++) {
    let d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
    sum += d
  }

  return sum
}