const range =
(n: number) =>
    Array(n).fill(undefined)

export class Plane<T> {
    data: T[][] = []
    protected width
    protected height
    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.data =
            range(height)
                .map(() => range(width))
    }
    
    forEach(f: (cell: T, x: number, y: number) => void) {
        this.data.forEach((row, y) => {
            row.forEach((cell, x) => {
                f(cell, x, y)
            })
        })
    }
}

export class PixelPlane extends Plane<boolean> {
    toPath(size: number) {
        let result = ""
        this.data.forEach((row, i) => {
            result += `M 0 ${i*size}`
            row.forEach(cell => {
                result += ""
                    + (cell ? "l" : "m")
                    + size
                    + " 0"
            })
            result += `m 0 ${size}`
        })
        return result
    }
}