var api ={
    getAquaData(){
        var url = 'https://bonytx6ltd.execute-api.us-east-1.amazonaws.com/dev/9542514040/2017-05-19';
        return fetch(url).then((res) => res.json());
    }
};

module.exports = api;