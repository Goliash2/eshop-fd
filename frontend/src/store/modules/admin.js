import axios from 'axios';
export default {
    namespaced: true,
    state() {

    },
    mutation: {

    },
    actions: {
        addProductToDatabase(context, payload) {
            const product = payload.product;
            const http = context.rootState.http.singleProduct;
            axios.post(http, product,
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