function getSuspender(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
        response => {
            status = "success";
            result = response;
        },
        error => {
            status = "error";
            result = error;
        }
    );
    const read = () => {
        switch (status) {
            case "pending":
                throw suspender;
            case "error":
                throw result;
            default:
                return result;
        }
        
    }
    return { read };
}



export function fetchData(url) {
    const promise = fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error);
    
    return getSuspender(promise);
};

export function fetchDataPost(url,data) {
    const response = fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    
    return response;
};