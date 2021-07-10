module.exports = function(endpoint, callback) {
    fetch(endpoint).then((res) => res.json())
    .then(res => {
       res = JSON.stringify(res);
       try {
            callback(res);
        } catch (e) {
            callback( null );
        }
    });
}