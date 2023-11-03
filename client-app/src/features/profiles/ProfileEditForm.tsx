import { Form, Formik } from "formik";
import MyTextArea from "../../app/common/form/MyTextArea";
import MyTextInput from "../../app/common/form/MyTextInput";
import * as Yup from 'yup';
import { Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer( function ProfileEditForm({setEditMode} : Props) {
    const { profileStore: { profile, updateProfile } } = useStore();


    const validationSchema = Yup.object({
        displayName: Yup.string().required(),
    })

    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={profile!}
            onSubmit={values => {
                updateProfile(values).then(() => {
                    setEditMode(false);
                })
            }}
        >
            {({ isValid, isSubmitting, dirty }) => (
                <Form className='ui form'>
                    <MyTextInput name='displayName' placeholder='Display Name' />
                    <MyTextArea name='bio' placeholder='Add your bio' rows={3} />
                    <Button
                        disabled={!dirty || !isValid}
                        loading={isSubmitting}
                        floated='right'
                        positive
                        type='submit'
                        content='Update profile'
                    />
                </Form>

            )}
        </Formik>
    )
})