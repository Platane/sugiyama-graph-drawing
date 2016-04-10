
export const addDummy = ( layers, graph ) => {

    const layer_by_id = {}
    layers.forEach( (list, i) => list.forEach( X => layer_by_id[ X ] = i ) )

    for( let a=0; a<graph.length; a++ )

        for( let i=graph[a].length; i--; ){


            const b = graph[a][i]
            let child = b


            for( let k = layer_by_id[ b ]-1; k > layer_by_id[ a ]; k--  ) {

                const x = graph.length
                graph.push([ child ])

                layer_by_id[ x ] = k
                layers[ k ].push( x )

                child = x
            }

            graph[a][i] = child


        }
}
