# css-gradient-angle-to-svg-gradient-coordinates

Converts a CSS gradient's angle in degrees to a an SVG gradient's coordinates (x1/y1/x2/y2) to produce a linear gradient of the same angle.

![](https://media3.giphy.com/media/APqEbxBsVlkWSuFpth/giphy.gif?cid=ecf05e472bognj037tletnaozvizsj5jzkt5c5lsy6qfon42&rid=giphy.gif&ct=g)

## install

```
yarn add css-gradient-angle-to-svg-gradient-coordinates
```

## usage

```javascript
import angleToCoordinates from 'css-gradient-angle-to-svg-gradient-coordinates'

const coordinates = angleToCoordinates(90)

const linearGradient = `
  <linearGradient x1={coordinates.x1} y1={coordinates.y1} x2={coordinates.x2} y2={coordinates.y2}>
    <stop offset="0%" stop-color="#000000" />
    <stop offset="0%" stop-color="#FFFFFF" />
  </linearGradient
`
```

## api

### angleToCoordinates(angleInDegrees, [sizeOfSquare])

Takes a an angle in degrees, and finds a set of coordinates around the edge of a square which
will draw a line dissecting the center of that square. For the purposes of using this to create
SVG gradients, the square is 1 long and 1 high, such that the output coordinates are percentages
that <linearGradient> will understand—but this is also customizable.

- `angleInDegrees` - an angle in degrees between -Infinity to Infinity.
- `sizeOfSquare` (optional, default = `1`) - the size of the square to calculate coordinates on. Usually not necessary to specify unless you've changed `gradientUnits` or you're trying to do something else with this module.

Returns an object that looks like this: { x1: 0.5, y1: 1, x2: 0.5, y2: 0 }

## testing

```
yarn run test
```

## license

MIT
