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

    array = [];
    arr = [];
    dfs(vertex) {
        this.visited[vertex] = true;
       // console.log(vertex + 1);

        for (const abj of graph[vertex]) {
            if (!this.visited[abj]) {
                this.arr.push(abj);
                this.dfs(abj);
            }

            if (graph[vertex][0] == this.keys) {
                if (this.arr.length != 0) {
                    this.array.push(this.arr);
                    this.arr = [];
                }  
                //console.log("Break") //если мы попали на одну из т. сочленения, то конец
            }
            
        }

        return this.array;
    }
}

let graph = [[0, 1],
    [1, 0, 2, 3],
    [2, 1, 4],
    [3, 1],
    [4, 2]];

let dfs = new DFS(graph);
let keys = dfs.JointsPoints(0);

dfs.visited = [];

 for (const key of keys) {
    
     dfs.visited = [];
     dfs.keys = key;
     dfs.array = [];

     console.log(`Вершина: ${key}`)
     console.log(dfs.dfs(key));
 }

//если в строке корня больше одногой вершины - значит он корень сочленения
       