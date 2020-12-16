import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

// TESTING
import { fetchHive, fetchHives } from './util/hive_api_util'
// import { fetchHive, fetchHives } from './actions/hive_actions'
// import { fetchUsers } from './actions/user_actions'
import { fetchUsers } from './util/user_api_util'
// END TESTING


document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { currentUserId: window.currentUser.id },
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    // TESTING START
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.fetchHives = fetchHives;
    window.fetchHive = fetchHive;
    window.fetchUsers = fetchUsers;
    // TESTING END
    
    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store} />, root);
});