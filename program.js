class DFS {
    visited = [];
    h = []; //глубина вершины
    d = []; //минимальная глубина всех вершин
    vertexes = new Set();

    constructor(graph) {
        this.graph = graph;
    }

    JointsPoints(vertex, p = -1) {
        this.visited[vertex] = true; //говорим, что мы были в вершине
        this.d[vertex] = this.h[vertex] = (p == -1) ? 0 : (this.h[p] + 1);

       // console.log(`${+vertex + 1} `);
        let child = 0; //для корня
        
        for (const adj of graph[vertex]) { //проходим по каждому элементу строки из графа
            if (adj == p) continue; //для того, чтобы не вернуться назад по тому же ребру от ребёнка к предку

            //console.log(`${graph[vertex]}`);
            if (!this.visited[adj]) { //если вершину не посещали
                this.JointsPoints(adj, vertex); //посещаем её

                this.d[vertex] = Math.min(this.d[vertex], this.d[adj]); //так как это прямое ребро(не тронутое), находим минимальное значение
                //глубины для заданной вершины
                if (this.h[vertex] <= this.d[adj] && p != -1) { //проверяем, если глубина вершины vertex меньше, чем минимальная глубина всех вершин
                    console.log(`Точка сочленения: ${vertex}`); //соеденённых обратным ребром, то vertex - точка сочленения
                    this.vertexes.add(vertex);
                }
                child++;

            } else {
                this.d[vertex] = Math.min(this.d[vertex], this.h[adj]); //для обратного ребра
            }
        }

        if (child > 1 && p == -1){ //проверяем,было ли у корня больше одной ветви при обходе
            console.log(`Точка сочленения: ${0}`);
            this.vertexes.add(0);
        }
        
        return this.vertexes;
    }

    dfs(vertex) {
        this.visited[vertex] = true;
        console.log(vertex + 1);

        for (const abj of graph[vertex]) {
            if (this.keys.has(graph[vertex][0])) {
                console.log("Break") //если мы попали на одну из т. сочленения, то конец
            }
            
            if (!this.visited[abj]) {
                this.dfs(abj);
            }
        }
    }
}

let graph = [[0, 1, 2],
    [1, 0, 2],
    [2, 0, 1, 3],
    [3, 2, 4, 5, 6],
    [4, 3, 6],
    [5, 3, 6],
    [6, 3, 4, 5]];

let dfs = new DFS(graph);
let keys = dfs.JointsPoints(0);

dfs.visited = [];
dfs.keys = keys;

dfs.dfs(0);
// for (const key of keys) {
    
//     dfs.visited = [];
//     dfs.keys = keys;

//     console.log(`Вершина: `)
//     dfs.dfs(0);
// }

//если в строке корня больше одногой вершины - значит он корень сочленения
       