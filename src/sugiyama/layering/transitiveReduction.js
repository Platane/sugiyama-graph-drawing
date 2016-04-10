
// assuming the graph is topologicaly sorted
const arcRedundancy = ( sorted_graph, A, B, X=A ) =>

    X == B || sorted_graph[X].some( K => !(X==A && K==B) && arcRedundancy( sorted_graph, A, B, K ) )

    // shortcut when the graph is sorted
    // X == B ||
    //     ( B > X
    //         ? false
    //         : sorted_graph[X].some( K => !(X==A && K==B) && arcRedundancy( sorted_graph, A, B, K ) )
    //     )


export const transitiveReduction = sorted_graph =>
    sorted_graph.forEach( (arc, A) => {

        for( let i = arc.length; i --; )
            arcRedundancy( sorted_graph, A, arc[i] ) && arc.splice( i, 1 )
    })
