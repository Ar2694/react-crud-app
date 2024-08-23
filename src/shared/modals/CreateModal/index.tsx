import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, FormHelperText, Grid, TextField } from '@mui/material';
import ModalProvider, { useModalContext } from 'contexts/ModalContext';
import useForm, { validateAllFields, validateField } from 'shared/hooks/useForm';
import UserService from 'api/services/UserService';
import { usePageContext } from 'contexts/PageContext';
import createModalForm from 'shared/hooks/useForm/forms/createModalForm';

export default function CreateModal(props: any) {
    const button = props.button ?? <Button variant="contained" color="secondary" fullWidth>Create User</Button>;
    const { pagination } = usePageContext();
    const { refresh } = pagination ?? {};

    const functions = (_state: any, _setState: any) => ({

        onSubmit: async (form: any, close: any) => {
            const { field } = form;

            let isFormValid = validateAllFields(field, form);

            if (!isFormValid) {
                const result = await UserService.createUser(field);

                if (result && result.isOk) {
                    refresh();
                    close();
                } else {
                    _setState({ isError: true, error: "Sorry! Something went wrong..." })
                }
            } else {
                _setState({ isError: isFormValid, error: "*Please enter the required fields." })
            }
        },

        onChange: (evt: any, form: any) => {
            const field = evt.target
            validateField(field, form)
            _setState({ isError: false })
        }
    })
    return (
        <ModalProvider functions={functions} button={button}>
            <CreateModalContent />
        </ModalProvider>
    )
}

function CreateModalContent() {
    const { modal, close, functions, state } = useModalContext();
    const { onChange, onSubmit } = functions;
    const form = useForm(createModalForm);
    const { field, validate } = form;

    return (
        <Modal className="modal create-modal" open={modal}>
            <Box>
                <Typography id="id-id-title" variant='h5' gutterBottom={true}>
                    Create A User
                </Typography>
                <FormControl fullWidth={true} className="modal-form-control">
                    <TextField
                        className="modal-text-field"
                        label="First Name"
                        variant="standard"
                        name="firstname"
                        value={field.firstname}
                        onChange={(e) => onChange(e, form)}
                        error={validate.firstname.isError}
                        helperText={validate.firstname.isError && validate.firstname.message}
                    />
                    <TextField
                        className="modal-text-field"
                        label="Last Name"
                        variant="standard"
                        name="lastname"
                        value={field.lastname}
                        error={validate.lastname.isError}
                        helperText={validate.lastname.isError && validate.lastname.message}
                        onChange={(e) => onChange(e, form)}
                    />
                    <TextField
                        className="modal-text-field"
                        label="Phone Number"
                        variant="standard"
                        name="phoneNumber"
                        error={validate.phoneNumber.isError}
                        helperText={validate.phoneNumber.isError && validate.phoneNumber.message}
                        value={field.phoneNumber}
                        onChange={(e) => onChange(e, form)}
                    />
                    <TextField
                        className="modal-text-field"
                        label="Address" variant="standard"
                        name="address"
                        value={field.address}
                        error={validate.address.isError}
                        helperText={validate.address.isError && validate.address.message}
                        onChange={(e) => onChange(e, form)}
                    />
                    <TextField

                        className="modal-text-field"
                        label="Email"
                        variant="standard"
                        name="email"
                        value={field.email}
                        error={validate.email.isError}
                        helperText={validate.email.isError && validate.email.message}
                        onChange={(e) => onChange(e, form)}
                    />
                </FormControl>
                {state.isError && <FormHelperText id="my-helper-text" error>{state.error}</FormHelperText>}
                <Grid className="modal-button-container" columnGap={3} container direction="row" justifyContent="flex-end">
                    <Button variant="text" color="secondary" onClick={close}>Cancel</Button>
                    <Button variant="contained" onClick={() => onSubmit(form, close)}>Create</Button>
                </Grid>
            </Box>
        </Modal>

    );
}
