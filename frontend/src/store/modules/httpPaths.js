export default {
    namespaced: true,
    state() {
        return {
            other: 'http://127.0.0.1:3000/product',
            man: 'http://127.0.0.1:3000/product/man',
            woman: 'http://127.0.0.1:3000/product/woman',
            singleProduct: 'http://127.0.0.1:3000/product/',
            login: 'http://127.0.0.1:3000/user/login',
            register: 'http://127.0.0.1:3000/user'
        }
    }
};