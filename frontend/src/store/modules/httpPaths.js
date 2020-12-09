export default {
    namespaced: true,
    state() {
        return {
            other: `${process.env.VUE_APP_API_ADDRESS || 'http://127.0.0.1'}:${process.env.VUE_APP_PORT || 3000}/product`,
            man: `${process.env.VUE_APP_API_ADDRESS || 'http://127.0.0.1'}:${process.env.VUE_APP_PORT || 3000}/product/man`,
            woman: `${process.env.VUE_APP_API_ADDRESS || 'http://127.0.0.1'}:${process.env.VUE_APP_PORT || 3000}/product/woman`,
            singleProduct: `${process.env.VUE_APP_API_ADDRESS || 'http://127.0.0.1'}:${process.env.VUE_APP_PORT || 3000}/product/`,
            login: `${process.env.VUE_APP_API_ADDRESS || 'http://127.0.0.1'}:${process.env.VUE_APP_PORT || 3000}/user/login`,
            editUser: `${process.env.VUE_APP_API_ADDRESS || 'http://127.0.0.1'}:${process.env.VUE_APP_PORT || 3000}/user/`
        }
    }
};
