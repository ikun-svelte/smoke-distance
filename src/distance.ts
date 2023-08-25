import { easing } from './easing'
import type { easingType } from './easing'

export declare interface SmokeDistanceOptions {
  /**
   *
   */
  from: Record<string, any>
  /**
   *
   */
  to: Record<string, any>
  /**
   *
   */
  duration: number
  /**
   *
   */
  delay: number
  /**
   *
   */
  easing: easingType
  /**
   *
   */
  onStart?: (keys: Record<string, number>) => void
  /**
   *
   */
  onUpdate?: (keys: Record<string, number>) => void
  /**
   *
   */
  onFinish?: (keys: Record<string, number>) => void
}

export class SmokeDistance {
  private _from: Record<string, any> = {}
  private _to: Record<string, any> = {}
  private _duration: number = 500
  private _delay: number = 0
  private _easing: string = 'linear'
  private _onStart: undefined | ((keys: Record<string, number>) => void) = undefined
  private _onUpdate: undefined | ((keys: Record<string, number>) => void) = undefined
  private _onFinish: undefined | ((keys: Record<string, number>) => void) = undefined
  private _startTime: number = 0
  private _started: boolean = false
  private _finished: boolean = false
  private _timer: null | number = null
  private _time: null | number = null
  private _elapsed: null | number = null
  private _keys: Record<string, number> = {}
  constructor(options: SmokeDistanceOptions) {
    const {
      from,
      to,
      duration,
      delay,
      easing,
      onStart,
      onUpdate,
      onFinish,
    } = options

    for (const key in from) {
      if (to[key] === undefined)
        to[key] = from[key]
    }
    for (const key in to) {
      if (from[key] === undefined)
        from[key] = to[key]
    }

    this._from = from
    this._to = to
    this._duration = duration || 500
    this._delay = delay || 0
    this._easing = easing || 'linear'
    this._onStart = onStart
    this._onUpdate = onUpdate || function() { }
    this._onFinish = onFinish
    this._startTime = Date.now() + this._delay
    this._started = false
    this._finished = false
    this._timer = null
    this._time = null
    this._keys = {}
  }

  update() {
    this._time = Date.now()
    // delay some time
    if (this._time < this._startTime)
      return

    if (this._finished)
      return

    // finish animation
    if (this._elapsed === this._duration) {
      if (!this._finished) {
        this._finished = true
        this._onFinish && this._onFinish(this._keys)
      }
      return
    }
    this._elapsed = this._time - this._startTime
    this._elapsed = this._elapsed > this._duration ? this._duration : this._elapsed
    for (const key in this._to)
      this._keys[key] = this._from[key] + (this._to[key] - this._from[key]) * easing[this._easing as keyof typeof easing](this._elapsed / this._duration)

    if (!this._started) {
      this._onStart && this._onStart(this._keys)
      this._started = true
    }
    this._onUpdate && this._onUpdate(this._keys)
  }

  start() {
    this._startTime = Date.now() + this._delay
    const tick = () => {
      this.update()
      this._timer = requestAnimationFrame(tick)
      if (this._finished) {
        cancelAnimationFrame(this._timer)
        this._timer = null
      }
    }
    tick()
  }

  stop() {
    if (this._timer !== null) {
      cancelAnimationFrame(this._timer)
      this._timer = null
    }
  }
}
