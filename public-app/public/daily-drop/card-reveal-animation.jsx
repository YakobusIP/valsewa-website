/**
 * withClick — a higher-order component that wraps any card component
 * with a 3D flip animation on click, and a subtle mouse-tilt effect on hover.
 *
 * NO external dependencies required. Pure React + CSS.
 *
 * Usage:
 *   const FlippableCard = withClick(MyCardComponent)
 *   <FlippableCard width={300} height={400} />
 *
 * Your component receives a `variant` prop: "Front" or "Back".
 * Use it to render the correct face:
 *   function MyCardComponent({ variant }) {
 *     return variant === "Front" ? <FrontFace /> : <BackFace />
 *   }
 */

import { useState, useRef, useCallback, useEffect } from "react"

// --- Lightweight spring interpolator (replaces framer's useSpring) ----------
// Runs a spring physics loop using requestAnimationFrame.
// Returns [value, setTarget] — `value` is a ref you read in your style.
function useSpringValue(stiffness = 300, damping = 40) {
  const state = useRef({ pos: 0, vel: 0, target: 0 })
  const raf = useRef(null)
  const listeners = useRef(new Set())

  const tick = useCallback(() => {
    const s = state.current
    const force = stiffness * (s.target - s.pos) - damping * s.vel
    const dt = 1 / 60
    s.vel += force * dt
    s.pos += s.vel * dt

    listeners.current.forEach((fn) => fn(s.pos))

    if (Math.abs(s.vel) > 0.001 || Math.abs(s.target - s.pos) > 0.001) {
      raf.current = requestAnimationFrame(tick)
    } else {
      s.pos = s.target
      s.vel = 0
      listeners.current.forEach((fn) => fn(s.pos))
    }
  }, [stiffness, damping])

  const setTarget = useCallback(
    (target) => {
      state.current.target = target
      if (raf.current) cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(tick)
    },
    [tick]
  )

  const subscribe = useCallback((fn) => {
    listeners.current.add(fn)
    return () => listeners.current.delete(fn)
  }, [])

  useEffect(() => () => raf.current && cancelAnimationFrame(raf.current), [])

  return [subscribe, setTarget]
}

// ---------------------------------------------------------------------------

const FLIP_DURATION_MS = 1650
const GLOW_DELAY_MS = FLIP_DURATION_MS + 200
const GLOW_DURATION_MS = 1000

export function withClick(Component) {
  return function FlippableCard(props) {
    const { width, height } = props

    const [isFlipped, setIsFlipped] = useState(false)
    const [glowing, setGlowing] = useState(false)

    // Live-updating DOM refs for the tilt (avoids React re-renders each frame)
    const innerRef = useRef(null)
    const [subscribeX, setTargetX] = useSpringValue(300, 40)
    const [subscribeY, setTargetY] = useSpringValue(300, 40)

    // Wire spring output directly to DOM styles
    useEffect(
      () =>
        subscribeX((v) => {
          if (innerRef.current)
            innerRef.current.style.transform = buildTransform(
              -v,
              innerRef.current._ry ?? 0
            )
        }),
      [subscribeX]
    )
    useEffect(
      () =>
        subscribeY((v) => {
          if (innerRef.current) {
            innerRef.current._ry = v
            innerRef.current.style.transform = buildTransform(
              innerRef.current._rx ?? 0,
              v
            )
          }
        }),
      [subscribeY]
    )

    // Keep a ref for _rx as well
    useEffect(
      () =>
        subscribeX((v) => {
          if (innerRef.current) innerRef.current._rx = -v
        }),
      [subscribeX]
    )

    const handleMouseMove = useCallback(
      (e) => {
        if (isFlipped) return
        const el = innerRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const mx = e.clientY - rect.top - rect.height / 2
        const my = e.clientX - rect.left - rect.width / 2
        setTargetX((mx / rect.width) * 20)
        setTargetY((my / rect.height) * 20)
      },
      [isFlipped, setTargetX, setTargetY]
    )

    const handleMouseLeave = useCallback(() => {
      setTargetX(0)
      setTargetY(0)
    }, [setTargetX, setTargetY])

    const handleClick = useCallback(() => {
      if (isFlipped) return
      setIsFlipped(true)
      // Reset tilt immediately
      setTargetX(0)
      setTargetY(0)
      // Trigger glow after flip
      setTimeout(() => {
        setGlowing(true)
        setTimeout(() => setGlowing(false), GLOW_DURATION_MS)
      }, GLOW_DELAY_MS)
    }, [isFlipped, setTargetX, setTargetY])

    return (
      <div
        onClick={handleClick}
        style={{
          perspective: "1200px",
          width,
          height,
          cursor: isFlipped ? "default" : "pointer",
        }}
      >
        {/* Tilt wrapper — transform applied via spring directly to DOM */}
        <div
          ref={innerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            borderRadius: 13,
            transition: glowing
              ? `box-shadow ${GLOW_DURATION_MS}ms ease-in-out`
              : "none",
            boxShadow: glowing
              ? "0 0 18px 6px rgba(255,255,255,0.85)"
              : "0 0 0px 0px rgba(255,255,255,0)",
          }}
        >
          <div
            style={{
              transformStyle: "preserve-3d",
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            {/* Front face */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                zIndex: isFlipped ? 0 : 1,
                transition: `transform ${FLIP_DURATION_MS}ms cubic-bezier(0.23,1,0.32,1)`,
                transform: isFlipped ? "rotateY(-180deg)" : "rotateY(0deg)",
              }}
            >
              <Component {...props} variant="Front" />
            </div>

            {/* Back face */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                zIndex: isFlipped ? 1 : 0,
                transition: `transform ${FLIP_DURATION_MS}ms cubic-bezier(0.23,1,0.32,1)`,
                transform: isFlipped ? "rotateY(0deg)" : "rotateY(180deg)",
              }}
            >
              <Component {...props} variant="Back" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function buildTransform(rx, ry) {
  return `rotateX(${rx}deg) rotateY(${ry}deg)`
}
