
const repulsion = ( a, b ) => {
    const vx = b.x - a.x
    const vy = b.y - a.y
    const d = Math.max( 2, Math.sqrt( vx*vx + vy*vy ) )

    const f = d < 60
        ? - 4 / ( d*d )
        : 0

    return { x: vx/d*f, y:vy/d*f }
}

const attraction = ( a, b ) => {
    const vx = b.x - a.x
    const vy = b.y - a.y
    const d = Math.max( 5, Math.sqrt( vx*vx + vy*vy ) )

    const f = Math.max( 0, 0.01 * (d - 5) )

    return { x: vx/d*f, y:vy/d*f }
}

const step = ( graph, position, n ) => {

    return position
        .map( (p, i) => {

            let ax = 0
            let ay = 0

            // node repulsion
            position.forEach( (u, j) => {

                if ( i == j )
                    return

                const {x, y} = repulsion( p, u )

                ax += x
                ay += y

            })

            // arc attraction
            graph[ i ].forEach( j => {

                const {x, y} = attraction( p, position[ j ] )

                ax += x
                ay += y

            })


            return {
                x: p.x + ax * 2,
                y: p.y,
            }
        })
}

const compute = ( graph, position, n=graph.length ) => {

    const g = graph.map( () => [] )

    graph.forEach( ( arc, a ) =>
        arc.forEach( b => {
            g[ b ].push( a )
            g[ a ].push( b )
        })
    )


    for( let k=50; k--; )
        position = step( g, position, n )

    return position
}

export default compute
