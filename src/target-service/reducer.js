import Device from '@/shared/entities/device';
import Player from '@/shared/entities/player';
import * as actions from './actions.js';

const initialState = {
    lastAction: '',
    lastActionDeviceIndex: -1,
    devices: []
};

/**
 * @param {Object} state The current application state
 * @param {Object} action The redux action
 * @return {Object} The update state if it changed
 */
export default function targetReducer(state = initialState, action) {
    let index;
    switch (action.type) {
        case actions.msg.TARGET_INITIALIZED:
            index = action.data.index;
            state.devices[index] = new Device({
                config: action.deviceConfig,
                state: Device.states.INITIALIZED,
                index: index
            });
            state.lastAction = actions.msg.TARGET_INITIALIZED;
            return state;
        case actions.msg.TARGET_CONNECTED:
            index = action.data.index;
            state.devices[index].state = Device.states.CONNECTED;
            state.lastAction = actions.msg.TARGET_CONNECTED;
            return state;
        case actions.msg.TARGET_PAIRED:
            index = action.data.targetPosition;
            const targetPosition = action.data.index;
            state.devices[index].state = Device.states.PAIRED;
            state.devices[index].player = new Player({name: `Player ${targetPosition}`, targetPosition});
            state.lastAction = actions.msg.TARGET_PAIRED;
            return state;
        case actions.msg.TARGET_CALIBRATED:
            index = action.data.index;
            state.devices[index].state = Device.states.CALIBRATED;
            state.lastAction = actions.msg.TARGET_CALIBRATED;
            return state;
        case actions.msg.TARGET_HIT:
            index = action.data.index;
            state.devices[index].state = Device.states.HIT;
            state.devices[index].player.lastHit = action.data.btnId;
            state.lastActionDeviceIndex = index;
            state.lastAction = actions.msg.TARGET_HIT;
            return state;
        default:
            return state;
    }
}