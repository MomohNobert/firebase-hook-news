export default function validateCreateLink(values) {
    let errors = {};

    if (!values.description) {
        errors.description = "Description Required."
    } else if(values.description.length < 10 ) {
        errors.description = "Description must be at least 10 characters."
    }

    if (!values.url) {
        errors.url = "URL required."
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = "Not a valid URL."
    }

    return errors;
}
