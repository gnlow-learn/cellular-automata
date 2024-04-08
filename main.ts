const raf = () => new Promise(requestAnimationFrame)

const $path = document.querySelector("path")!

let i = 0
while (true) {
    await raf()
    
    i++

    $path.setAttribute("d", `
    M ${i} 100
    h ${i*0.5}
    v 100
`)
}