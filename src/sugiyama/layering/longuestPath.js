import {inverse}        from '../../basic'

export const layerize = graph => {

    const _graph = inverse( graph )

    const taken = {}
    const layers = []

    while( _graph.some( (_,i) => !taken[ i ] ) ) {

        const sinks = []

        _graph
            .forEach( (arc,i) =>
                ( !taken[ i ] && arc.every( i => taken[ i ] ) )
                    && sinks.push( i )
            )

        sinks.forEach( i => taken[ i ] = true )

        layers.push( sinks )
    }

    return layers
}
