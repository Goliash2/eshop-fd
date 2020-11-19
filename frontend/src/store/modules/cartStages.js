export default {
    namespaced: true,
    state() {
        return {
           stage: '/cart/content',
            stages: {
                content: false,
                shipping: false,
                contact: false,
                complete: false
            }
        }
    },
    mutations: {
        SET_STAGE(state, stage) {
            state.stage = stage
            if (stage === '/cart/content') {
                state.stages.content = false
                state.stages.shipping = false
                state.stages.contact = false
                state.stages.complete = false
            } else if (stage === '/cart/shipping') {
                state.stages.content = true
                state.stages.contact = false
                state.stages.complete = false
                state.stages.shipping = false
            } else if (stage === '/cart/contact') {
                state.stages.shipping = true
                state.stages.content = true
                state.stages.complete = false
                state.stages.contact = false
            } else {
                state.stages.shipping = true
                state.stages.content = true
                state.stages.contact = true
                state.stages.complete = true
            }
        }
    },
    actions: {

    },
    getters: {
        stage(state) {
            return state.stage;
        },
        stages(state) {
            return state.stages;
        },
        /*------------------------------- Last 4 getters are for router guard conditions ---------------------------------------------*/
        content(state) {
            return state.stages.content;
        },
        shipping(state) {
            return state.stages.shipping;
        },
        contact(state) {
            return state.stages.contact;
        },
        complete(state) {
            return state.stages.complete;
        }
    }
};