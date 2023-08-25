const easeInBy = (power: number) => {
  return (t: number) => Math.pow(t, power)
}
const easeOutBy = (power: number) => {
  return (t: number) => 1 - Math.abs(Math.pow(t - 1, power))
}
const easeInOutBy = (power: number) => {
  return (t: number) => t < 0.5 ? easeInBy(power)(t * 2) / 2 : easeOutBy(power)(t * 2 - 1) / 2 + 0.5
}

const linear = (t: number) => t
const quadIn = easeInBy(2)
const quadOut = easeOutBy(2)
const quadInOut = easeInOutBy(2)
const cubicIn = easeInBy(3)
const cubicOut = easeOutBy(3)
const cubicInOut = easeInOutBy(3)
const quartIn = easeInBy(4)
const quartOut = easeOutBy(4)
const quartInOut = easeInOutBy(4)
const quintIn = easeInBy(5)
const quintOut = easeOutBy(5)
const quintInOut = easeInOutBy(5)
const sineIn = (t: number) => 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2)
const sineOut = (t: number) => Math.sin(Math.PI / 2 * t)
const sineInOut = (t: number) => (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2
const bounceOut = (t: number) => {
  const s = 7.5625
  const p = 2.75

  if (t < 1 / p)
    return s * t * t

  if (t < 2 / p) {
    t -= 1.5 / p
    return s * t * t + 0.75
  }
  if (t < 2.5 / p) {
    t -= 2.25 / p
    return s * t * t + 0.9375
  }
  t -= 2.625 / p
  return s * t * t + 0.984375
}
const bounceIn = (t: number) => 1 - bounceOut(1 - t)
const bounceInOut = (t: number) => t < 0.5 ? bounceIn(t * 2) * 0.5 : bounceOut(t * 2 - 1) * 0.5 + 0.5

export const easing = {
  bounceIn,
  bounceInOut,
  bounceOut,
  sineInOut,
  sineOut,
  sineIn,
  quintInOut,
  quintOut,
  quintIn,
  quartInOut,
  quartOut,
  quartIn,
  cubicInOut,
  cubicIn,
  cubicOut,
  quadInOut,
  quadOut,
  quadIn,
  linear,
}

export declare type easingType = keyof typeof easing
