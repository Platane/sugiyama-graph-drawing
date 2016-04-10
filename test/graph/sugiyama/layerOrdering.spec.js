import {layerOrdering} from '../../../src//sugiyama/layerOrdering'
import expect from 'expect'

describe('graph', () => {

    describe('layer - layerOrdering', () => {

        it('complex graph', () => {
            const graph = [
                [],
                [0],
            ]

            const layer = [ [1], [0] ]

            const ordered_layer = layerOrdering( layer, graph )

            expect( ordered_layer ).toEqual( layer )
        })

    })

})
