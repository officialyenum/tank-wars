import {
    defineComponent, Types,
} from 'bitecs'

export enum Direction {
    None,
    Left,
    Right,
    Up,
    Down
}
export const Input = defineComponent({
    direction: Types.ui8
})