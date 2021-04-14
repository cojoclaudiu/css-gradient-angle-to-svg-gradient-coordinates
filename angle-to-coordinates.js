/**
 * Takes an angle in degrees and finds a set of coordinates around the edge of a square which
 * will draw a line dissecting the center of that square. For the purposes of using this to create
 * SVG gradients, the square is 1 long and 1 high, such that the output coordinates are percentages
 * that <linearGradient> will understand.
 *
 * In this case, an angle of 0 degrees will draw an line from the bottom of the square to the top,
 * dissecting the center. 45 degrees will draw a line from the bottom left of the square to the
 * top right, dissecting the center, etc.
 *
 * This is mainly useful in the application of converting a CSS gradient in degrees to an SVG
 * gradient, which requires coordinates to render in the same way that CSS does. You can use
 * gradientTransform but this literally just rotates the gradient: this means that in a square,
 * when the gradient is rotated at any angle but those divisible by 90, the gradient will start too
 * late and stop too early, leaving clear bars of colour before and after the gradient.
 *
 * @param {Number} angleInDegrees an angle in degrees between -Infinity to Infinity.
 * @param {Number} [sizeOfSquare=1] the size of the square to calculate coordinates on. Usually not
 *    necessary to specify unless you've changed `gradientUnits` or you're trying to do something
 *    else with this module.
 * @returns {Object} an object that looks like this { x1: 0.5, y1: 1, x2: 0.5, y2: 0 }.
 */
module.exports = function angleToCoordinates (angleInDegrees, sizeOfSquare = 1) {
  let constrainedAngle = angleInDegrees % 360
  if (constrainedAngle < 0) constrainedAngle += 360

  // The way we approach this is by drawing a triangle between the top side of the square, the
  // center of the square, and the coordinate on the top side of the square that would give us our
  // desired angle. We only need to do this in this one position (from 0 to 45 degrees), and we can
  // then translate that distance around the edge of the square to get our desired coordinates.
  const angleBetween0and45deg = constrainedAngle % 45
  const angle45InRadians = Math.PI / 180 * angleBetween0and45deg

  // Here we're getting the delta, the distance along the edge of the square from the corner with a
  // right angle to the coordinate that we want. We know the distance from the right angle to the
  // center (1), we know the angle that we want, and we know there's a right angle. With these three
  // things we can calculate the distance from the right angle to our coordinate.
  const delta = 1 / Math.cos(angle45InRadians) * Math.sin(angle45InRadians)

  const angleUnder180 = constrainedAngle % 180

  // These are our coordinates along the top side of the square.
  // Keep in mind this x and y is in a coordinate system with y ranging from -1 at the lowest point
  // and 1 at the highest, x ranging from -1 at the leftmost and 1 at the rightmost. We will convert
  // it to our regular coordinate system later.
  let xBase = delta
  let yBase = 1

  let x1
  let y1

  // This translates the coordinates we have around the square. The translation looks like this:
  //      0 to 45
  //  _________
  // |    |    | 45 to 90
  // |____|____|
  // |    |    |
  // |____|____| 90 to 135
  //      135 to 180
  if (angleUnder180 < 45) {
    x1 = xBase // x ranges from 0 to 1
    y1 = yBase // y is always 1
  } else if (angleUnder180 < 90) {
    x1 = yBase // x is always 1
    y1 = 1 - xBase // y ranges from 1 to 0
  } else if (angleUnder180 < 135) {
    x1 = yBase // x is always 1
    y1 = -xBase // y ranges from 0 to -1
  } else if (angleUnder180 < 180) {
    x1 = 1 - xBase // x ranges from 1 to 0
    y1 = -yBase // y is always -1
  }

  if (constrainedAngle < 180) {
    x1 = -x1
    y1 = -y1
  }

  // The other coordinates of the line are just the inverse of the coordinates we already have found.
  let x2 = -x1
  let y2 = -y1

  // This converts the -1/1 to 1/-1 coordinate system to the 0/0 to 1/1 coordinate system, and
  // multiplies the coordinates by the size of the square given by the user.
  x1 = (x1 + 1) / 2 * sizeOfSquare
  y1 = (-y1 + 1) / 2 * sizeOfSquare
  x2 = (x2 + 1) / 2 * sizeOfSquare
  y2 = (-y2 + 1) / 2 * sizeOfSquare

  return { x1, y1, x2, y2 }
}
