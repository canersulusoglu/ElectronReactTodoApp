import React  from 'react';
import MomentUtils from '@date-io/moment';
import { DateTimePicker as MuiDateTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

function DateTimePicker(props){

    const onDateTimeChange = (newDate) => {
        props.onChange(newDate);
    }

    return(
        <div style={{ display:'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
            <MuiPickersUtilsProvider utils={MomentUtils} locale={navigator.language}>
                <MuiDateTimePicker
                    value={props.value}
                    onChange={onDateTimeChange.bind(this)}
                    variant="inline"
                    autoOk
                    ampm={false}
                    disablePast
                    label={props.label}
                    //format="DD/MM/yyyy, dd, HH:mm"
                />
            </MuiPickersUtilsProvider>
        </div>
    )
}

export default DateTimePicker;