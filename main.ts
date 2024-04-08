import { PixelPlane } from "./src/Plane.ts"

const raf = () => new Promise(requestAnimationFrame)

const $path = document.querySelector("path")!

const plane = new PixelPlane(10, 10)
plane.forEach(({ x, y, set }) => {
    set(!!((x+y) % 2))
})

let i = 0
while (true) {
    await raf()
    
    i++

    $path.setAttribute("d", "M 100 100 " + plane.toPath(20))
}