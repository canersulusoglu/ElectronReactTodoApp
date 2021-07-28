import React  from 'react';
import MomentUtils from '@date-io/moment';
import { DateTimePicker as MuiDateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

function DateTimePicker(props){

    const onDateTimeChange = (newDate) => {
        props.onChange(newDate);
    }

    return(
        <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <MuiDateTimePicker
                    value={props.value}
                    onChange={onDateTimeChange.bind(this)}
                    variant="inline"
                    autoOk
                    ampm={false}
                    disablePast
                    label="Alarm time"
                    format="dd/MM/yyyy HH:mm"
                />
            </MuiPickersUtilsProvider>
        </div>
    )
}

export default DateTimePicker;