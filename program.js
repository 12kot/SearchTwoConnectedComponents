class DFS {
    visited = [];
    h = [];
    d = [];
    vertexes = new Set();

    constructor(graph) {
        this.graph = graph;
        console.log(graph);
    }

    searchDFS(vertex, p = -1) {
        this.visited[vertex] = true;
        this.d[vertex] = this.h[vertex] = (p == -1) ? 0 : (this.h[p] + 1);

        console.log(`${+vertex + 1} `);
        
        for (const adj of graph[vertex]) {
            if (adj == p) continue;

            //console.log(`${graph[vertex]}`);
            if (!this.visited[adj]) {
                this.searchDFS(adj, vertex);

                this.d[vertex] = Math.min(this.d[vertex], this.d[adj]);
                if (this.h[vertex] < this.d[adj] && p != -1)
                    this.vertexes.add(vertex);
                    //console.log(`Точка сочленения: ${vertex}`);
            } else {
                this.d[vertex] = Math.min(this.d[vertex], this.h[adj]);
            }
            
        }
        return this.vertexes;
    }
}

let graph = [[0, 1],
    [1, 0, 2, 3],
    [2, 1, 4],
    [3, 1],
    [4, 2]];

let dfs = new DFS(graph);
console.log(dfs.searchDFS(0));
       