//code.js
//Used code from JamesOzzyburn
// Introduced a counter that increments when no improvement is found
// in an iteration. Want to come back and make my own implementation

function tsp_ls(distance_matrix) {
    const len = distance_matrix.length;

    // Make and randomize the route
    let route = Array.from({ length: len }, (_, i) => i);
    route = genRandomRoute(route);

    // Track the number of iterations without improvement
    let noImprovementCount = 0;
    const maxNoImprovement = 1000;

    while (noImprovementCount < maxNoImprovement) {
        let betterRoute = false;

        for (let i = 0; i < len - 1; i++) {
            for (let k = i + 1; k < len; k++) {
                const newRoute = twoOptSwap(route, i, k);
                const newLength = routeDist(newRoute);

                if (newLength < routeDist(route)) {
                    route = newRoute;
                    betterRoute = true;
                    noImprovementCount = 0; // Reset the count on improvement
                }
            }
        }

        // Increment the count if no improvement is found
        if (!betterRoute) {
            noImprovementCount++;
        }
    }

    // Function that gets the distance of a route
    function routeDist(route) {
        let distance = 0;
        for (let i = 0; i < len - 1; i++) {
            distance += distance_matrix[route[i]][route[i + 1]];
        }
        return distance;
    }

    return routeDist(route);
}

// To get a randomized/shuffled list
function genRandomRoute(route) {
    let currentIndex = route.length;
    while (currentIndex > 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [route[currentIndex], route[randomIndex]] = [route[randomIndex], route[currentIndex]];
    }
    return route;
}

function twoOptSwap(route, i, k) {
    // Get the part of the list to reverse (line 3 in the pseudocode)
    const swap = route.slice(i, k + 1);
    // Reverse it
    swap.reverse();
    // Make the new list with the reversed part in the middle
    const newRoute = route.slice(0, i).concat(swap).concat(route.slice(k + 1)); // (Lines 1-4 in the pseudocode
    return newRoute;
}

  
 
  
