
/**
 * assuming graph is the graph returned by the sugiyama algorithm
 *          n is the length of the graph without dummy nodes
 *
 *
 * @return graph with path as arc
 *
 *  assuming A have a direct arc to B, but for some reasons it passed by the dummy node X1, X2, X3, then
 *   graph[ A ][ i ] = [ A, X1, X2, X3, B]
 *
 */
export const pathGraph = ( graph, n=graph.length ) =>
    graph
        .slice( 0, n )
        .map( (arc, a) =>
            arc.map( b => {

                const path = [a]

                while( b >= n ) {
                    path.push( b )
                    b = graph[ b ][ 0 ]
                }

                path.push( b )

                return path
            })
        )


import computePosition_ from './sugiyama'
import compute          from './forceEngine'

export const computePosition = baseGraph => {

    let { graph, position } = computePosition_( baseGraph )

    position = compute( graph, position, baseGraph.length )

    return { graph, position }
}
