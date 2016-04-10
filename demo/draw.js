
const boundingBox = position =>
    position.length==0
        ? {xMax:0,xMin:0,yMax:0,yMin:0}
        : position.reduce(
            (box, p) => ({
                xMax: Math.max( p.x, box.xMax ),
                xMin: Math.min( p.x, box.xMin ),
                yMax: Math.max( p.y, box.yMax ),
                yMin: Math.min( p.y, box.yMin ),
            })
            ,{xMax:-Infinity,xMin:Infinity,yMax:-Infinity,yMin:Infinity}
        )

const enlargeBoundingBox = ( boundingBox, l ) =>
    ({
        xMax : boundingBox.xMax +l ,
        xMin : boundingBox.xMin -l ,
        yMax : boundingBox.yMax +l ,
        yMin : boundingBox.yMin -l ,
    })

const proj = ( bb, size ) => {
    const rx = ( bb.xMax - bb.xMin ) / size.x
    const ry = ( bb.yMax - bb.yMin ) / size.y

    const r = Math.max( rx, ry )
    const lx = ( 1 - rx / r ) * size.x * 0.5
    const ly = ( 1 - ry / r ) * size.y * 0.5

    return ({x,y}) =>
        ({
            x : ( x - bb.xMin )/r +lx,
            y : ( y - bb.yMin )/r +ly,
        })
}


const arrowHead = (A, B, l, h) => {
    const vx = B.x - A.x
    const vy = B.y - A.y
    const d = Math.sqrt( vx*vx + vy*vy )

    return [
        {x: B.x, y: B.y},
        {x: B.x - vx/d*l + vy/d*h*0.5, y: B.y - vy/d*l - vx/d*h*0.5},
        {x: B.x - vx/d*l - vy/d*h*0.5, y: B.y - vy/d*l + vx/d*h*0.5},
    ]
}
const drawNode = ( ctx, {x,y} ) => {

    ctx.fillStyle = '#333'

    ctx.beginPath()
    ctx.arc( x, y, 3, 0, Math.PI*2 )
    ctx.fill()
}
const drawArc = ( ctx, A, B, end ) => {

    ctx.fillStyle = ctx.strokeStyle = '#aaa'

    ctx.beginPath()
    ctx.moveTo( A.x, A.y )
    ctx.lineTo( B.x, B.y )
    ctx.stroke()


    if( end ) {
        const path = arrowHead( A, B, 10, 10 )

        ctx.beginPath()
        ctx.moveTo( path[ 0 ].x, path[ 0 ].y )
        path.forEach( p => ctx.lineTo( p.x, p.y )  )
        ctx.fill()
    }

}

const drawGraph = ( ctx, size, graph, node, position ) => {

    const bb = enlargeBoundingBox( boundingBox( position ), 5 )

    position = position.map( proj( bb, size ) )

    // draw arc
    graph
        .forEach( (arc, a) =>
            arc.forEach( b => drawArc( ctx, position[ a ], position[ b ], b < node.length ) )
        )

    // draw node
    position
        .slice(0, node.length)
        .forEach( drawNode.bind( null, ctx ) )
}

export default drawGraph
