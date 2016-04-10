# sugiyama-graph-drawing

apply sugiyama layered graph algorithm to set node position for a graph

## usage

```javascript
import {computePosition} from 'sugiyama-graph-drawing'

// the successor graph
const initialGraph = [

    // node A
    [],

    // node B
    // have an arc to A
    // B -> A ( A is successor of B )
    [0]
]

const {graph, position } = computePosition( initialGraph )

// graph contains the initial graph + eventually some dummy node
// which only purpose is to allows arc to be blended

// position is an array such as position[ i ] is the position of the node i

```
