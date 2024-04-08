import { gol } from "./src/GoL.ts"
import { PixelPlane } from "./src/Plane.ts"

const raf = () => new Promise(requestAnimationFrame)
const wait = (t: number) => new Promise(o => setTimeout(o, t))

const $path = document.querySelector("path")!

let plane = new PixelPlane(100, 100)
    .map(({ x, y }) => Math.floor(((x-50)**2 + (y-50)**2) / 99) % 2)

let i = 0
while (true) {
    await wait(100)
    
    i++

    $path.setAttribute("d", "M 100 100 " + plane.toPath(5))

    
    plane = gol(plane)
}