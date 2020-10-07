import { createStore } from 'vuex';

import usersModule from './modules/users';

const store = createStore({
    modules: {
        usr: usersModule
    }
});

export default store;