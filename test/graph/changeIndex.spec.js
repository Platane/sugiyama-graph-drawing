import {changeIndex}            from '../../src//basic'

import expect from 'expect'

describe('graph', () => {

    describe('changeIndex', () => {

        it('change index then reverse to normal', () => {
            const graph = [ [1,2], [2,3], [3], [] ]

            const index = [ 3, 0, 1, 2 ]

            const index_ = []
            index.forEach( (i,j) => index_[i] = j )

            expect( changeIndex( changeIndex( graph, index ), index_ ) ).toEqual( graph )
        })

    })

})
