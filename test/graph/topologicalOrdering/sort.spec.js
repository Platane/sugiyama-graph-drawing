import sort from '../../../src//topologicalOrdering/kahn'
import expect from 'expect'



//         graph[ A ][ i ] = B
//   <=>   A is predecessor of B
//   <=>   B is successor of A
//   <=>   A should be before B
const validity = ( graph, solution ) => {

    const constraintValidity = graph
        .every( (next, A) =>
            next.every( B =>
                solution.findIndex( X => A == X ) < solution.findIndex( X => B == X )
            )
        )

    expect( constraintValidity ).toExist()
}


describe('graph', () => {
    describe('topologicalOrdering', () => {

        it('empty graph', () =>{

            const graph = []

            validity( graph, sort( graph ) )
        })

        it('one element graph', () =>{

            const graph = [[]]

            validity( graph, sort( graph ) )
        })

        it('two elements graph', () =>{

            const graph = [[],[]]

            validity( graph, sort( graph ) )
        })

        it('two elements with dependancies graph', () =>{

            const graph = [[],[0]]

            validity( graph, sort( graph ) )
        })

        it('two elements with dependancies graph (different declaration)', () =>{

            const graph = [[1],[]]

            validity( graph, sort( graph ) )
        })

        it('dependancy chain', () =>{

            const graph = [[],[0],[1],[2],[3],[4],[5],[6],[7],[8],[9]]

            validity( graph, sort( graph ) )
        })

        it('dependancy chain (different declaration)', () =>{

            const graph = [[1],[2],[3],[4],[5],[6],[7],[8],[9],[]]

            validity( graph, sort( graph ) )
        })

        it('complex graph', () =>{

            const graph = [
                [9],        // 0
                [3],        // 1
                [6,1],      // 2
                [6,5],      // 3
                [7,1],      // 4
                [],         // 5
                [5],        // 6
                [8],        // 7
                [9,1,3],    // 8
                [2],        // 9
            ]
            validity( graph, sort( graph ) )
        })

        describe('failure', () => {

            it('one element cyclical', () =>{

                const graph = [[0]]

                try{
                    sort( graph )

                    expect( 'should have failed' ).toBe( false )
                }catch(e){
                    expect( true ).toExist()
                }
            })
            it('two elements cyclical', () =>{

                const graph = [[1],[0]]

                try{
                    sort( graph )

                    expect( 'should have failed' ).toBe( false )
                }catch(e){
                    expect( true ).toExist()
                }
            })
        })
    })
})
