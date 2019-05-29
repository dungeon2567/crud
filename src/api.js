function postJson(url, body) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    }).then(response => response.json())
    
    .then(response => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            var error = new Error(response.error);
            error.response = response;
            return Promise.reject(error);
        }
    });
}

function graphQLQuery(query, variables){
    return postJson("/graphql", JSON.stringify({
        query,
        variables
    }));
}

export {
    graphQLQuery
};