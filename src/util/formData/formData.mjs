function getUserInfo(req) {
    return getFormData(req)
        //.then(v => console.log('dodo', v))
        .then(v => parseFormData(v))
        .then(v => console.log('formData', v));

    function getFormData(req) {
        let data = '';
        req.on('data', chunk => data = data + chunk)
        return new Promise((resolve, reject) => {
            req.on('end', chunk => {resolve(data)})
        }
        )
    }
    function parseFormData(formData) {
        return new Map(formData
            .split('&')
            .map(v => v
                .split('='))
        );
    }
}
