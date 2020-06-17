/* global expect */
import { bufferFn } from '../src/lib/fns'

const sleep = (x: number) => new Promise(resolve => setTimeout(resolve, x))

describe('bufferFn', () => {
    it('only runs once within a window of time', async () => {
        let count = 0
        const f = bufferFn(100, () => ++count)

        f()
        f()
        f()

        await sleep(200)
        expect(count).toBe(1)
    })

    it('only runs twice if called outside of the window', async () => {
        let count = 0
        const f = bufferFn(100, () => ++count)

        f()
        f()
        f()

        await sleep(200)
        expect(count).toBe(1)

        f()
        f()
        f()

        await sleep(200)
        expect(count).toBe(2)
    })
})
