// Javascript program to count non-reachable nodes
// from a given source using DFS.

// Graph class represents a directed graph
// using adjacency list representation
let V = 5;
let adj = [];
for (let i = 0; i < V; i++) {
  adj.push([]);
}

function addEdge(v, w) {
  // Add w to v’s list.
  adj[v].push(w);

  // Add v to w's list.
  adj[w].push(v);
}

function DFSUtil(v, visited) {
  // Mark the current node as visited and
  // print it
  visited[v] = true;

  // Recur for all the vertices adjacent
  // to this vertex
  for (let i = 0; i < adj[v].length; i++) {
    if (!visited[adj[v][i]]) DFSUtil(adj[v][i], visited);
  }

  return visited;
}

// Returns count of not reachable nodes from
// vertex v.
// It uses recursive DFSUtil()
function countNotReach(v) {
  // Mark all the vertices as not visited
  let visited = new Array(V);

  for (let i = 0; i < V; i++) visited[i] = false;

  // Call the recursive helper function
  // to print DFS traversal
  visited = DFSUtil(v, visited);

  // Return count of not visited nodes
  let count = 0;
  for (let i = 0; i < V; i++) {
    if (visited[i] == false) count++;
  }
  return count;
}

// Create a graph given in the above diagram
addEdge(0, 1);
addEdge(0, 2);
addEdge(1, 2);
addEdge(3, 4);

console.log(countNotReach(0));
