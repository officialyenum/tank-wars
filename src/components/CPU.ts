import {
    defineComponent, Types,
} from 'bitecs'

export const CPU = defineComponent({
    timeBetweenActions: Types.ui32,
    accumulatedTime: Types.ui32
})