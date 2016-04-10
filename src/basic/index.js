
export const changeIndex = ( graph, index, _index ) => {
    if ( !_index ) {
        _index = []
        index.forEach( (i,j) => _index[i] = j )
    }
    return graph.map( (_, i) => graph[ index[ i ] ].map( i => _index[ i ] ) )
}

export const clone = graph =>
    graph.map( arc => arc.slice() )
