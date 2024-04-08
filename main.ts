import { PixelPlane } from "./src/Plane.ts"

const raf = () => new Promise(requestAnimationFrame)
const wait = (t: number) => new Promise(o => setTimeout(o, t))

const $path = document.querySelector("path")!

let plane = new PixelPlane(100, 100)
plane = plane.map(({ x, y }) => Math.random() < 0.5)

let i = 0
while (true) {
    await wait(100)
    
    i++

    $path.setAttribute("d", "M 100 100 " + plane.toPath(20))

    
    plane = plane.map(({ value, neighbors }) => {
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
}