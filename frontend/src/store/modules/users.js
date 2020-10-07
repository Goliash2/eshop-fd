import axios from 'axios';

export default {
    namespaced: true,
    state() {
        return {
            users: []
        }
    },
    mutations: {
      SET_USER (state, user) {
          state.users = user
      }
    },
    actions: {
        GET_USERS (context) {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY3YWRmMTYxNGYxMGEwMDIwMjg5ZDViIiwibmFtZSI6Ik1hcnRpbiBOZXNsYWRlayIsInVzZXJuYW1lIjoibWFydGlub3MiLCJlbWFpbCI6Im1hcnRpbkBmZC5jdnV0LmN6In0sImlhdCI6MTYwMjA1MDE5MCwiZXhwIjoxNjAyMDYwMTkwfQ.Ham2FKGsdmfq5mxCajTcsktr7wZlxxPfykEvKCdbync'
            axios.get('http://127.0.0.1:3000/user', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
                .then(response => response.data)
                .then(user => {
                    console.log(user);
                    context.commit('SET_USER', user);
                })
        }
    },
    getters: {
        users(state) {
            return state.users;
        }
    }
};
