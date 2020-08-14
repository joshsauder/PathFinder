# Path Finding Visualization

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)  
[![CodeFactor](https://www.codefactor.io/repository/github/joshsauder/pathfindingvisualization/badge)](https://www.codefactor.io/repository/github/joshsauder/pathfindingvisualization)

An iOS and Android application that allows various pathfinding algorithms to be visualized in action. You can download the app by downloading the Expo app ([iOS](https://itunes.apple.com/app/apple-store/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www)), and then scanning the QR code found at the following [link](https://exp.host/@joshsauder/PathFindingVisualization). You can also download this app on the Apple App Store by visiting the following [link](https://apps.apple.com/us/app/path-finding-visualization/id1506957834?ls=1).

## Current Algorithms
**Dijkstra's** - Works by expanding outwards until it reaches the target node. Guarenteed to find the shortest path as long as there are not any negative weights.  

**Bidirectional Dijkstra's** - Dijkstra's algorithm from both sides.  

**A\*** - Like Dijkstra's in that it favors nodes close to the starting point, but also favors nodes close to the ending point (hueristic). Does not guarentee the shortest path. A [tie-breaker](http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html#breaking-ties) that prefers straight lines was included in order to prevent multiple nodes from having the same F values.  

**Bidirectional A\***- The A* algorithm from both sides.

**Breadth-First Search** - Traverses through a graph one level at a time until it finds the target node. Since there are no weights, this algorithm does guarentee the shortest path.  

**Depth-First Search** - Traverses through a graph by going as deep as possible and then backtracking until it finds the target node. Does not guarentee the shortest path.


## Tech Stack
- [React Native](https://reactnative.dev) - Mobile application framework
- [TypeScript](https://www.typescriptlang.org) - Strict syntactical superset of Javascript, and allows for static typing.
- [Expo](https://expo.io) - React Native toolchain that allows for simplified development
- [Native Base](https://nativebase.io) - React Native styling framework