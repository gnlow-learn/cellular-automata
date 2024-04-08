const range =
(n: number) =>
    Array(n).fill(undefined)

type Cell<T> = {
    value: T
    x: number
    y: number
    neighbors: T[]

    set(newValue: T): void
}

const getNeighbors =
<T>
(x: number, y: number) =>
(data: T[][]) =>
    range(9).flatMap((_, i) => {
        if (i == 4) return []
        const cell = data[y + Math.floor(i / 3)]?.[x + i % 3]
        return cell ? [cell] : []
    })


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

    fromData<O>(data: O[][]): typeof this {
        const plane = new (this.constructor as any)(data[0].length, data.length)
        plane.data = data
        return plane as this
    }
    
    map<O>(f: (o: Cell<T>) => O) {
        return this.fromData(this.data.map((row, y) =>
            row.map((value, x) =>
                f({
                    value,
                    x,
                    y,
                    neighbors: getNeighbors<T>(x, y)(this.data),
                    set: (newValue: T) => this.data[y][x] = newValue,
                })
            )
        ))
    }
    forEach(f: (o: Cell<T>) => void) {
        this.map(f)
    }
}

export class PixelPlane extends Plane<boolean> {
    toPath(size: number) {
        let result = ""
        this.data.forEach((row) => {
            row.forEach(cell => {
                result += ""
                    + (cell ? "l" : "m")
                    + size
                    + " 0"
            })
            result += `m ${-size*this.width} ${size}`
        })
        return result
    }
}