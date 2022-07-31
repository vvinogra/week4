import React from "react";
import {FormContainer, TextFieldElement} from 'react-hook-form-mui'
import {yupResolver} from '@hookform/resolvers/yup';
import {Box, Button, Stack, styled} from "@mui/material";
import {FieldValues, useForm} from "react-hook-form";
import {object, string, number} from 'yup';


const WhiteTextFieldContainer = styled(TextFieldElement)(({}) => ({
    '& label': {
        color: 'white',
    },
    '& label.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'yellow',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'white',
        },
        '&:hover fieldset': {
            borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'white',
        },
    },
    input: {
        color: 'white'
    }
}));

type FormProps = {
    name: string,
    email: string,
    age: number,
}

let formSchema = object({
    name: string()
        .required("Name is required"),
    email: string()
        .email("Please enter a correct email")
        .required("Email is required"),
    age: number()
        .positive("Please enter positive number")
        .integer("Please enter an integer value")
        .typeError("Please enter a valid value")
        .nullable()
        .transform((value: string, originalValue: string) => originalValue.trim() === "" ? null : value)
});

export default function Form({className = ''}) {
    const formContext = useForm<FormProps>({
        mode: "onBlur",
        resolver: yupResolver(formSchema),
    })

    const onSubmit = (data: FieldValues) => {
        console.log(data);
    }

    return (
        <Box className={className}>
            <FormContainer
                formContext={formContext}
                onSuccess={onSubmit}>

                <Stack spacing={2}>
                    <WhiteTextFieldContainer name="name" label="Name" required/>
                    <WhiteTextFieldContainer name="email" label="Email address" required/>
                    <WhiteTextFieldContainer name="age" label="Age" type="number"/>
                    <br/>
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Submit</Button>
                </Stack>
            </FormContainer>
        </Box>
    )
}