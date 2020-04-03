
# Path Finder

An iOS and Android application that allows various pathfinding algorithms to be visualized in action. 

## Current Algorithms
Dijkstra's - Works by expanding outwards until it reaches the target node. Guarenteed to find the shortest path as long as there are not any negative weights. 
Bidirectional Dijkstra's - Dijkstra's algorithm from both sides. Guarenteed to find the shortest path as long as there are not any negative weights. 
A* - Like Dijkstra's in that it favors nodes close to the starting point, but also favors nodes close to the ending point (hueristic). Does not guarentee the shortest path.
Breadth First Search - Traverses through a tree one level at a time. Since there are no weights, this algorithm does guarentee the shortest path.

## Tech Stack
- [React Native](https://reactnative.dev) - Mobile application framework
- [TypeScript](https://www.typescriptlang.org) - Strict syntactical superset of Javascript, and allows for static typing.
- [Expo](https://expo.io) - React Native toolchain that allows for simplified development
- [Native Base](https://nativebase.io) - React Native styling framework