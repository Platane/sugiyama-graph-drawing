import {layerize} from '../../../src//sugiyama/layering/minimizeWidth'
import expect from 'expect'

const validity = (graph, layer) => {

    // every node is in the layer once
    const completeness = graph.every( (_,x) =>
        layer.reduce( (sum,list) => sum+list.reduce( (sum,k) => k == x ? sum+1 : sum ,0 ) ,0 ) == 1
    )

    // arc consistency
    const arcConsistency = graph
        .every( (arc,a) =>
            arc.every( b => {

                const ka = layer.findIndex( list => list.some( x => x == a ) )
                const kb = layer.findIndex( list => list.some( x => x == b ) )

                return ka < kb
            })
        )

    return completeness && arcConsistency
}

describe('graph', () => {

    describe('layer - layerize', () => {

        it('one node graph', () => {
            const graph = [ [] ]

            const layer = layerize( graph )

            expect( layer ).toEqual( [[0]]  )
        })

        it('two nodes graph', () => {
            const graph = [
                [],
                [0],
            ]

            const layer = layerize( graph )

            expect( validity( graph,layer ) ).toExist( )
        })

        it('complex graph', () => {
            const graph = [
                [],
                [],
                [0],
            ]

            const layer = layerize( graph )

            expect( validity( graph,layer ) ).toExist( )
        })

        it('complex graph', () => {
            const graph = [
                [],
                [0],
                [1,3],
                [0],
                [1],
                [4,2],
                [5],
                [5,3],
                [5,3],
                [1,3,7],
                [1,3],
            ]

            const layer = layerize( graph )

            expect( validity( graph,layer ) ).toExist( )
        })

    })

})
