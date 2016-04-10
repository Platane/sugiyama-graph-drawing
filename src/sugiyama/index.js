import {layerize}       from './layering/minimizeWidth'
import {layerOrdering}  from './layerOrdering'
import {addDummy}       from './layering/addDummy'
import {clone}          from '../basic'


const computePosition = graph => {

    graph = clone( graph )

    // minimize the width output
    const layers = layerize( graph )

    addDummy( layers, graph )

    const ordered_layers = layerOrdering( layers, graph )

    const l = 100
    const position = []
    ordered_layers.forEach( (list, ky, arr_y  ) =>
        list.forEach( ( X, kx, arr_x ) =>
            position[ X ] = {
                x : ( kx + 0.5 ) / arr_x.length * l,
                y : ( ky + 0.5 ) / arr_y.length * l,
            }
        )
    )

    return { position, graph }
}

export default computePosition
