import axios from 'axios';
export default {
    namespaced: true,
    state() {

    },
    mutation: {

    },
    actions: {
        addProductToDatabase(context, payload) {
            const newProduct = JSON.stringify(payload.product)
            const http = context.rootState.http.singleProduct;
            console.log(newProduct)
            axios.post(http, {
                newProduct
            },
                {
                    headers: {
                        'Authorization': 'Bearer ' + payload.token
                    }
                })
                .then(response => {
                    console.log(response.status + ' ' + response.data)
                })
        }
    },
    getters: {

    }
}