import {computePosition} from '../../../src'
import expect from 'expect'

const validity = ( initialGraph, position, graph ) =>

    // all the node in the inital graph are int the output graph
    initialGraph.length <= graph.length

    &&

    // for all node, position are set
    position.length == graph.length

    &&

    // all position are point
    position.every( p => p && typeof p.x == 'number' && typeof p.y == 'number' )

    &&

    // all dependencies are well vertically positionned
    graph.every( (arc, A) =>
        arc.every( B =>

            position[ A ].y < position[ B ].y

        )
    )

    &&

    // every direct arc in the initial graph is an direct/indirect arc in the oupout graph
    initialGraph.every( (arc, A) =>
        arc.every( B => {

            const traverse = X =>
                X == B || graph[ X ].some( X => traverse( X ) )

            return traverse( A )
        })
    )

    &&

    // every added node have exactly one arc
    graph.slice( initialGraph.length ).every( arc => arc.length == 1 )



describe('graph', () => {

    describe('computePosition', () => {

        it('one node', () => {

            const initialGraph = [ [] ]

            const {position, graph} = computePosition( initialGraph )

            expect( validity( initialGraph, position, graph ) ).toExist()

        })

        it('two nodes', () => {

            const initialGraph = [ [1], [] ]

            const {position, graph} = computePosition( initialGraph )

            expect( validity( initialGraph, position, graph ) ).toExist()

        })

        it('complexe', () => {

            const initialGraph = [
                [1],
                [],
                [0],
                [2],
                [2,3],
                [4,0],
                [2],
                [2,5],
                [1,3],
            ]

            const {position, graph} = computePosition( initialGraph )

            expect( validity( initialGraph, position, graph ) ).toExist()

        })

    })

})
