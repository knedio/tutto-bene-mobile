import { combineReducers } from 'redux';
import auth from './auth.reducer';
import alert from './alert.reducer';
import user from './user.reducer';
import userReport from './user-report.reducer';
import userQuarantine from './user-quarantine.reducer';
import userPositive from './user-positive.reducer';

const appReducer  = combineReducers({
    auth,
    alert,
    user,
    userReport,
    userQuarantine,
    userPositive,
})

const rootReducer = (state, action) => appReducer(
    (action.type === 'RESET_APP') ? undefined : state, 
    action
)

export default rootReducer;