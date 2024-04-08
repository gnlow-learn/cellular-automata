import type { PixelPlane } from "./Plane.ts"

export const gol =
(plane: PixelPlane) =>
    plane.map(({ value, neighbors }) => {
        const neighborCnt = neighbors.filter(x => x).length

        if (value) {
            if (neighborCnt <= 1) return false
            else if (neighborCnt <= 3) return true
            else return false
        } else {
            if (neighborCnt <= 2) return false
            else if (neighborCnt <= 3) return true
            else return false
        }
    })