import store from '../../configureStore';

export const get = () => store.getState().services.session;
