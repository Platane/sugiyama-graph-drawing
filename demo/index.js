require('file?name=index.html!./index.html')
require('./style.css')

import draw                             from './draw'
import {position as computePosition}    from '../src/sugiyama'


const samples = [

    [
        [],
    ],
    [
        [],
        [0],
    ],
    [
        [],
        [0],
        [1],
        [2],
    ],
    [
        [],
        [0],
        [0],
        [2,1],
    ],
    [
        [],
        [0],
        [1,0],
    ],
]

const size = { x:400, y:400 }

samples

    .map( graph => ({ node:graph, ...computePosition( graph ) }) )

    .forEach( ({graph, node, position}) => {

        const canvas = document.createElement('canvas')
        canvas.width = size.x
        canvas.height = size.y
        document.body.appendChild( canvas )


        draw( canvas.getContext('2d'), size, graph, node, position )
    })
