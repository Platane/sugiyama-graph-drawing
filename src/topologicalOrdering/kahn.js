
const inverseGraph = graph => {
    const _graph = graph.map( () => [] )
    graph.forEach( (arc, a) => arc.forEach( b => _graph[b].push(a) ) )
    return _graph
}

/**
 *
 *
 * @param graph
 *         graph[ A ][ i ] = B
 *   <=>   A is predecessor of B
 *   <=>   B is successor of A
 *   <=>   A should be before B
 *
 * @return Number[]
 *      [ A, B, C ... ]  A should be before B, B should be before C ...
 *
 */
const sort = ( graph ) => {

    const _graph    = inverseGraph( graph )
    const removed   = []

    const res = []

    // all the node X without predecessors
    // <=> A is free if there is no (X,i) such as graph[ X ][ i ] = A
    const freeNode = _graph
        .reduce( (list, Aarc,  A) =>

            Aarc.length == 0
                ? [ ...list, A ]
                : list
        ,[])

    while ( freeNode.length ) {

        // push the node to the end of the sorted list
        const A = freeNode.shift()
        res.push( A )
        removed[ A ] = true

        // search for new freeNode
        freeNode.push(
            ...graph[A]
                .reduce( (list, A) =>

                    // is already in the res list
                    !removed[ A ]

                    // is already in the feeNode list
                    && !freeNode.some( K => K == A )

                    // have no predecessor
                    && _graph[ A ].every( X => removed[ X ] )

                        ? [ ...list, A ]
                        : list

                ,[])
            )

    }

    if( res.length < graph.length )
        throw 'cyclical graph'

    return res
}


export default sort
