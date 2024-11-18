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

export function fetchData2(url, options = {}) {
    return fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Fetch error:', error);
            throw error; // Lanza el error para que pueda ser manejado en el lugar donde se llama
        });
}
export function fetchDataPost(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });
}