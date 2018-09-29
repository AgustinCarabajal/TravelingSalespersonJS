'use strict'

const totalCities = 5

var order = []

var cities = []
var record
var best = []

var totalPermutations
var count = 0

function setup () {
  createCanvas(400, 400)

  for (let i = 0; i < totalCities; i++) {
    let v = createVector(random(width), random(height / 1.5))
    cities[i] = v
    order[i] = i
  }

  let d = distance(cities, order)
  record = d
  best = order.slice()

  totalPermutations = factorial(totalCities)
  console.log(totalPermutations)
}

function draw () {
  background(0)

  fill(255)
  for (let i = 0; i < cities.length; i++) {
    ellipse(cities[i].x, cities[i].y, 8, 8)
  }

  stroke(50)
  strokeWeight(1)
  noFill()
  beginShape()
  for (let i = 0; i < best.length; i++) {
    let n = order[i]
    vertex(cities[i].x, cities[i].y)
  }
  endShape()
  
  stroke(25, 185, 200)
  strokeWeight(4)
  noFill()
  beginShape()
  // DRAWING WITH LEX ORDER
  for (let i = 0; i < order.length; i++) {
    let n = best[i]
    vertex(cities[n].x, cities[n].y)
  }
  endShape()

  let d = distance(cities, order)
  if (d < record) {
    record = d
    best = order.slice()
  }

  // Lexical order

  textSize(32)
  fill(255)
  var percent = 100 * (count / totalPermutations)
  text(nf(percent, 0, 2) + '% completed', 20, height - 50)

  nextOrder()
}

function swap (arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
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

const nextOrder = function () {
  count++

  var x = -1
  var y = -1

  // STEP 1: P[x] < P[ x + 1]
  for (let i = 0; i < order.length; i++) {
    if (order[i] < order[i + 1]) {
      x = i
    }
  }

  if (x == -1) {
    noLoop()
    console.log('Finished')
  }

  // STEP 2: P[x] < P[y]
  for (let j = 0; j < order.length; j++) {
    if (order[x] < order[j]) {
      y = j
    }
  }

  // STEP 3: Swap
  swap(order, x, y)

  // STEP 4: Reverse P[x + 1 ... n]
  let end = order.splice(x + 1)
  end.reverse()
  order = order.concat(end)
}

function factorial (n) {
  if (n == 1) {
    return 1
  } else {
    return n * factorial(n - 1)
  }
}
