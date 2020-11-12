import Select, {SelectProps} from './select'
import Option, {OptionProps} from './option'
import { FC } from 'react'

export type ISelect = FC<SelectProps> & {
    Option: FC<OptionProps>
}

const TransSelect  = Select as ISelect
TransSelect.Option = Option

export default TransSelect 