const assert = require('assert')
const convert = require('../')
describe('CSS Gradient Angle to SVG Gradient Coordinates converter', () => {
  it('should convert 0º to the expected coordinates', () => {
    assert.deepEqual(convert(0), { x1: 0.5, y1: 1, x2: 0.5, y2: 0 })
  })
  it('should convert 90º to the expected coordinates', () => {
    assert.deepEqual(convert(90), { x1: 0, y1: 0.5, x2: 1, y2: 0.5 })
  })
  it('should convert 180º to the expected coordinates', () => {
    assert.deepEqual(convert(180), { x1: 0.5, y1: 0, x2: 0.5, y2: 1 })
  })
  it('should convert 270º to the expected coordinates', () => {
    assert.deepEqual(convert(270), { x1: 1, y1: 0.5, x2: 0, y2: 0.5 })
  })
  it('should convert 810º to the expected coordinates', () => {
    assert.deepEqual(convert(810), { x1: 0, y1: 0.5, x2: 1, y2: 0.5 })
  })
  it('should convert -90º to the expected coordinates', () => {
    assert.deepEqual(convert(-90), { x1: 1, y1: 0.5, x2: 0, y2: 0.5 })
  })
  it('should allow customizing the square size', () => {
    assert.deepEqual(convert(90, 100), { x1: 0, y1: 50, x2: 100, y2: 50 })
  })
})
