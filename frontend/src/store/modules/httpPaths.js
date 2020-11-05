export default {
    namespaced: true,
    state() {
        return {
            other: `${process.env.API_ADDRESS || 'http://127.0.0.1'}:${process.env.PORT || 3000}/product`,
            man: `${process.env.API_ADDRESS || 'http://127.0.0.1'}:${process.env.PORT || 3000}/product/man`,
            woman: `${process.env.API_ADDRESS || 'http://127.0.0.1'}:${process.env.PORT || 3000}/woman`,
            singleProduct: `${process.env.API_ADDRESS || 'http://127.0.0.1'}:${process.env.PORT || 3000}/product/`,
            login: `${process.env.API_ADDRESS || 'http://127.0.0.1'}:${process.env.PORT || 3000}/user/login`,
            register: `${process.env.API_ADDRESS || 'http://127.0.0.1'}:${process.env.PORT || 3000}/user`
        }
    }
};