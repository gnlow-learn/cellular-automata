import { PixelPlane } from "./src/Plane.ts"

const raf = () => new Promise(requestAnimationFrame)

const $path = document.querySelector("path")!

const plane = new PixelPlane(10, 10)
plane.forEach((_, x, y) => {
    plane.data[y][x] = !!(x % 2)
})

let i = 0
while (true) {
    await raf()
    
    i++

    $path.setAttribute("d", plane.toPath(20))
}