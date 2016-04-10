require('file?name=index.html!./index.html')
require('./style.css')

import draw                     from './draw'
import computePosition          from '../src/sugiyama'

const randomGraph = (n=10, r=0.4) =>
    Array.apply( null, new Array( n ))
       .map( (_,i) =>
            Array.apply( null, new Array( i ))
                .map( (_,i) => i )
                // .filter( (j,_,arr) => Math.random() > r )
                .filter( (j,_,arr) => (1-(i-j)/arr.length) * Math.random() > r )

       )
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
    [
        [],
        [0],
        [1,0],
        [1,0],
        [3,1],
        [],
        [4,7],
        [2,5],
        [7],
    ],

    [
        [],
        [0],
        [1,0],
        [2],
        [],
        [4],
        [5],
        [5],
        [],
        [7],
        [9],
        [8],
        [7,8,10],
        [11,12],
        [9,10,12],
        [12,13],
        [10,13,15],
        [13,14,15,16],
        [13,16],
        [14,18]
    ],

    [
        [],
        [0],
        [1],
        [1,2],
        [3],
        [3,4],
        [5],
        [5,6],
        [],
        [7,8],
        [8],
        [9,10],
        [11],
        [9],
        [8,10],
        [13],
        [12],
        [14],
        [13,14],
        [11,15,17,18]
    ],

    randomGraph(),

    randomGraph(20,0.5),

    randomGraph(40,0.6),
]

const size = { x:400, y:400 }

samples.reverse()

samples

    .map( graph => ({ node:graph, ...computePosition( graph ) }) )

    .forEach( ({graph, node, position}) => {

        const container = document.getElementById('list')
        const canvas = document.createElement('canvas')
        canvas.width = size.x
        canvas.height = size.y
        container.appendChild( canvas )


        draw( canvas.getContext('2d'), size, graph, node, position )
    })
