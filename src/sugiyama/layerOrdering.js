
import {inverse} from '../basic'

/**
 * assuming the graph node have been grouped by layer,
 * where for a layer N, all the node connection are located in the N+1 layer
 *
 * order each layer in a way to minimise the crossing between connection
 *
 */
export const layerOrdering = ( layers, graph ) => {

    if ( layers.length <= 1 )
        return layers

    const _graph = inverse( graph )

    // start from top to bottom, init the layers with naive sorting
    for( let i=1; i<layers.length; i++ )
        layers[ i ] = initLayer( layers[ i ], layers[ i-1 ], _graph )

    // from bottom to top, optimize the layer
    for ( let i=layers.length-1; i-- ; )
        orderLayer( layers[ i ], layers[ i+1 ], graph )

    // from top to bottom, optimize the layer
    for( let i=1; i<layers.length; i++ )
        orderLayer( layers[ i ], layers[ i-1 ], _graph )


    return layers

}

/**
 * assuming the fixed layer is fixed,
 *  get a naive ordering for the freeLayer
 *
 *  based on the barycenter,
 *    for each node X is the free layer, get the barycenter of all the node that are connected to X in the fixed layer
 *    sort node with this value
 */
const initLayer = ( freeLayer, fixedLayer, graph ) =>

    freeLayer
        .map( x =>
            ({
                p: graph[ x ].length == 0
                    ? 0.5
                    : graph[ x ].reduce( (sum,i) => sum + fixedLayer.findIndex( k => i == k ) ,0 ) / graph[ x ].length,
                x: x,
            })
        )
        .sort( (a,b) => a.p > b.p ? 1 : -1 )
        .map( ({x}) => x )



/**
 *  assuming u and v are node in the free layer
 *  return the number of arc related to u or v only that are crossing IF u is before v
 *
 */
const n_crossing = ( u, v, fixedLayer, graph ) => {

    let p = 0
    let n = 0
    fixedLayer
        .forEach( x => {

            if( graph[u].some( y => x ==y ) )
                n += p

            if( graph[v].some( y => x ==y ) )
                p += 1

        })

    return n
}

const orderLayer = ( freeLayer, fixedLayer, graph ) => {

    // buble sort
    // swap position of adjacent node if it reduce the number of crossing
    for( let i=1; i<freeLayer.length; i++ )
        for( let j=0; j<freeLayer.length-i; j++ ){

            const a = freeLayer[j]
            const b = freeLayer[j+1]

            if ( n_crossing( a, b, fixedLayer, graph ) > n_crossing( b, a, fixedLayer, graph ) ) {
                // swap
                freeLayer[j] = b
                freeLayer[j+1] = a
            }

        }
}
