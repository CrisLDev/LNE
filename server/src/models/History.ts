import {Schema, model, Document} from 'mongoose';

const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    patient_id: {type: ObjectId, ref: 'Patient'},
    user_id: {type: ObjectId, ref: 'User'},
    app_non_communicable_diseases:{
        type: Array
    },
    app_sexually_transmitted_diseases:{
        type: Array
    },
    app_degenerative_diseases:{
        type: Array
    },
    app_others:{
        type: Array
    },
    apnp_blood_type:{
        type: String,
        required: true
    },
    apnp_adictions:{
        type: Array
    },
    apnp_allergies:{
        type: Array
    },
    apnp_antibiotics:{
        type: Array
    },
    apnp_current_conditions:{
        type: Array
    },
    apnp_has_been_hospitalized:{
        type: Array
    },
    ipeeo_respiratory:{
        type: Array
    },
    ipeeo_cardiovascular:{
        type: Array
    },
    ipeeo_genitourinary:{
        type: Array
    },
    ipeeo_endocrine:{
        type: Array
    },
    ipeeo_nervous:{
        type: Array
    },
    ipeeo_muscular:{
        type: Array
    },
    conclusions:{
        type: Array
    }
},{
    timestamps: true
});

export interface IHistory extends Document{
    app_non_communicable_diseases: [];
    app_sexually_transmitted_diseases: [];
    app_degenerative_diseases: [];
    app_others: [];
    apnp_blood_type: string;
    apnp_adictions: [];
    apnp_allergies: [];
    apnp_antibiotics: [];
    apnp_current_conditions: [];
    apnp_has_been_hospitalized: [];
    ipeeo_respiratory: [];
    ipeeo_cardiovascular: [];
    ipeeo_genitourinary: [];
    ipeeo_endocrine: [];
    ipeeo_nervous: [];
    ipeeo_muscular: [];
    conclusions: [];
}

export default model<IHistory>('History', schema);