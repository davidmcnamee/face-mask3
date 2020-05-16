import { useEffect } from "react";
import { useMotionValue, MotionValue } from "framer-motion";

export const isMotionValue = (value) => {
    return value instanceof MotionValue
}

const toValue = v => isMotionValue(v) ? v.get() : v

/**
 * UseRelative
 * @description Declare a motion value with a value dependent on multiple other values.
 * @param parents An array of motion values or values.
 * @param transform A function that receives the current values and returns a computed value.
 * @example
 * ```jsx
 * const knobHeight = useRelative(
 *  [scrollHeight, contentHeight, maskHeight],
 *  (scrollHeight, contentHeight, maskHeight) => {
 *    return maskHeight * (scrollHeight / contentHeight)
 *  }
 *)
 *```
 */
export function useRelative(
    parents,
    transform
) {
    // Create new motion value and initialize it with transformed value
    const transformedValue = useMotionValue(transform(...parents.map(toValue)))

    // When transform or parents change, compute a new transformed
    // value and add new onChange listeners
    useEffect(
        () => {
            const computeValue = () =>
                transformedValue.set(transform(...parents.map(toValue)))

            // Compute motion value based on new values
            computeValue()

            // Add change events to each parent motion value, to
            // compute the value when that motion value changes
            const removers = parents
                .map(v => isMotionValue(v) && v.onChange(computeValue))
                .filter(v => v)

            // Return removes for change events
            return () => removers.forEach(fn => fn())
        },
        [parents, transform]
    )

    return transformedValue
}
