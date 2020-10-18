import React from 'react';
import { Field, reduxForm } from 'redux-form';

// const StreamCreate = () => {
//     return (
//         <div>StreamCreate</div>
//     );
// };

class StreamForm extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    //destructured out input from formProps
    renderInput = ({ input, label, meta }) => {
        // return <input onChange={formProps.input.onChange} value={formProps.input.value} />;
        const classname = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={classname}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>

        );
    };

    //handle submit automatically prevents default 
    //if inputs are valid then onSubmit will be called
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        //only ran if user did not enter a title
        errors.title = 'You must enter a title';
    }

    if (!formValues.description) {
        errors.description = "You must enter a description";
    }

    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);