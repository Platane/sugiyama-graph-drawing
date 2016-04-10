import {addDummy} from '../../../src//sugiyama/layering/addDummy'
import expect from 'expect'

describe('graph', () => {

    describe('layer - addDummy', () => {

        it('unecessary', () => {
            const graph = [ [1], [] ]
            const layer = [ [0], [1] ]

            addDummy( layer, graph )

            expect( layer ).toEqual( [ [0], [1] ]  )
            expect( graph ).toEqual( [ [1], [ ] ]  )
        })

        it('leap one layer', () => {
            const graph = [ [1], [] ]
            const layer = [ [0], [], [1] ]

            addDummy( layer, graph )

            expect( layer ).toEqual( [ [0], [2], [1] ]  )
            expect( graph ).toEqual( [ [2], [ ], [1] ]  )
        })

        it('leap two layers', () => {
            const graph = [ [1], [] ]
            const layer = [ [0], [], [], [1] ]


            addDummy( layer, graph )

            const traverse = (n, k) => {
                expect( layer[k] ).toEqual( [n] )

                n == 1 || traverse( graph[n][0], k+1 )
            }

            traverse( 0, 0 )
        })

    })

})
