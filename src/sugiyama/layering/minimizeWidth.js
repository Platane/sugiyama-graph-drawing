import sort                  from '../../topologicalOrdering/kahn'
import {changeIndex}         from '../../basic'
import {transitiveReduction} from './transitiveReduction'

export const layerize = graph => {

    const sort_index    = sort( graph )
    const _sort_index   = []
    sort_index.forEach( (i,j) => _sort_index[i] = j )

    // sort the graph
    const sorted_graph = changeIndex( graph, sort_index )

    // remove redundant arc
    transitiveReduction( sorted_graph )

    const n = Math.ceil( Math.sqrt( graph.length ) )

    const layers = layering_fixedWidth( sorted_graph, n )

    return layers.map( arr => arr.map( i => sort_index[ i ] ) )
}



// assuming the graph is topologicaly sorted
//   ( = if A in before B in the list, B can't be a dependency for A )
const layering_fixedWidth = ( sorted_graph, width ) =>
    sorted_graph.reduce( (layers, _, b) => {

        const last = layers[ layers.length-1 ]

        if ( !last || last.length >= width || last.some( a => sorted_graph[ a ].some( k => b == k) ) )
            layers.push( [b] )

        else
            last.push( b )

        return layers
    }, [] )
