/**
 * LEXICOGRAPHIC ORDERING
 * 
 * DOC: https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
 */

'use strict'

var vals = [0, 1, 2]

function setup() {
  createCanvas(400, 300)
}

function draw() {
    background(0)

    console.log(vals)

    var x = -1
    var y = -1

    // STEP 1: P[x] < P[ x + 1]
    for(let i = 0; i < vals.length; i++) {
      if (vals[i] < vals[i + 1]) {
        x = i
      }
    }

    if (x == -1) {
      noLoop()
      console.log('Finished')
    }

    // STEP 2: P[x] < P[y]
    for(let j = 0; j < vals.length; j++) {
      if (vals[x] < vals[j]) {
        y = j
      }
    }

    // STEP 3: Swap
    swap(vals, x, y)

    // STEP 4: Reverse P[x + 1 ... n]
    let end = vals.splice(x + 1)
    end.reverse()
    vals = vals.concat(end)

    // Drawing
    textSize(64)
    var s = ''
    for (let i = 0; i < vals.length; i++) {
      s += vals[i]
    }
    fill(255)
    text(s, 20, height / 2)

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