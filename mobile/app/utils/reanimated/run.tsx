import Animated, {
  and,
  block,
  call,
  Clock,
  clockRunning,
  cond,
  Easing,
  eq,
  proc,
  set,
  spring,
  startClock,
  stopClock,
  timing,
  Value,
} from 'react-native-reanimated'

const betterSpring = proc(
  (
    finished,
    velocity,
    position,
    time,
    prevPosition,
    toValue,
    damping,
    mass,
    stiffness,
    overshootClamping,
    restSpeedThreshold,
    restDisplacementThreshold,
    clock,
  ) =>
    spring(
      clock,
      {
        finished,
        velocity,
        position,
        time,
        // @ts-ignore
        prevPosition,
      },
      {
        toValue,
        damping,
        mass,
        stiffness,
        overshootClamping,
        restDisplacementThreshold,
        restSpeedThreshold,
      },
    ),
)

export function springFill(clock, state, config) {
  return betterSpring(
    state.finished,
    state.velocity,
    state.position,
    state.time,
    new Value(0),
    config.toValue,
    config.damping,
    config.mass,
    config.stiffness,
    config.overshootClamping,
    config.restSpeedThreshold,
    config.restDisplacementThreshold,
    clock,
  )
}

export function runSpringDeep(
  clock: Animated.Clock,
  value: number | Animated.Node<number>,
  dest: number | Animated.Node<number>,
  velocity: any = -2500,
) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  }

  const config = {
    toValue: new Value(0),
    damping: 7,
    mass: 5,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  }

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.velocity, velocity),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ])
}

export function runSpring(
  clock: any,
  value: number | Animated.Node<number>,
  dest: number | Animated.Node<number>,
  velocity: any = -2500,
) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  }

  const config = {
    damping: 7,
    mass: 1,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: new Value(0),
  }

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ])
}

export const runTiming = (clock, value, dest, duration = 1000): any => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  }

  const config = {
    duration,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  }

  return block([
    cond(
      clockRunning(clock),
      [set(config.toValue, dest)],
      [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ],
    ),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ])
}

export const runTimingOb = ({ clock = new Clock(), from = 0, to = 1, duration = 1000 }): any => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  }

  const config = {
    duration,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  }

  return block([
    cond(
      clockRunning(clock),
      [set(config.toValue, to)],
      [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.position, from),
        set(state.frameTime, 0),
        set(config.toValue, to),
        startClock(clock),
      ],
    ),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ])
}

export const runTimingWithEndAction = (clock, value, dest, endAction, duration = 1000): any => {
  const state = {
    finished: new Value(1),
    position: new Value(value),
    time: new Value(0),
    frameTime: new Value(0),
    callEndAction: new Value(0),
  }

  const config = {
    duration: duration,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  }

  const reset = [set(state.finished, 0), set(state.time, 0), set(state.frameTime, 0)]

  return block([
    cond(and(state.finished, eq(state.position, value)), [...reset, set(config.toValue, dest)]),
    cond(and(state.finished, eq(state.position, dest)), [
      cond(state.callEndAction, 0, [call([], endAction)]),
      set(state.callEndAction, 1),
    ]),
    cond(clockRunning(clock), 0, startClock(clock)),
    timing(clock, state, config),
    state.position,
  ])
}

export const runTimingWithEndActionOB = ({
  clock = new Clock(),
  from = 0,
  to = 1,
  duration = 1000,
  endAction = () => {},
}): any => {
  return runTimingWithEndAction(clock, from, to, endAction, duration)
}

export const runTimingLoop = (clock, value, dest, duration = 1000): any => {
  const state = {
    finished: new Value(1),
    position: new Value(value),
    time: new Value(0),
    frameTime: new Value(0),
  }

  const config = {
    duration: duration,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  }

  const reset = [set(state.finished, 0), set(state.time, 0), set(state.frameTime, 0)]

  return block([
    cond(and(state.finished, eq(state.position, value)), [...reset, set(config.toValue, dest)]),
    cond(and(state.finished, eq(state.position, dest)), [...reset, set(config.toValue, value)]),
    cond(clockRunning(clock), 0, startClock(clock)),
    timing(clock, state, config),
    state.position,
  ])
}
