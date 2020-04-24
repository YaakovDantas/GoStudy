import React, {useCallback, useRef} from 'react';
import { Alert, TextInput, Image, ScrollView ,View, Platform, KeyboardAvoidingView } from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from "@react-navigation/native";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";
import {useAuth} from "../../hooks/AuthContext"

import Button from "../../components/Button";
import Input from "../../components/Input";

import logoImg from '../../assets/logo.png';

import {Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText} from './styles';

interface SingInFormData {
  email: string;
  password: string;
}

const SingIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const {singIn} = useAuth()

  const handleSingIn = useCallback( async (data: SingInFormData) => {

      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail deve ser válido'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, { abortEarly: false });

        await singIn({
          email: data.email,
          password: data.password
        });

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        Alert.alert("Erro", 'Falha', )
      }
  }, [singIn])

  return (
  <>
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{flex: 1}} enabled >
    <ScrollView
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={{flex: 1}}
    >
      <Container>
        <Image source={logoImg}/>
        <View>
          <Title>Faça seu logon</Title>
        </View>

        <Form ref={formRef} onSubmit={handleSingIn}>
          <Input
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={() => {passwordInputRef.current?.focus()}}
            name="email"
            icon="mail"
            returnKeyType="next"
            placeholder="Email"
          />

          <Input
            ref={passwordInputRef}
            secureTextEntry
            returnKeyType="send"
            onSubmitEditing={() => {formRef.current?.submitForm()}}
            name="password"
            icon="lock"
            placeholder="Senha"
          />

          <Button onPress={() => {formRef.current?.submitForm()}}>Entrar</Button>
        </Form>

        <ForgotPassword onPress={() => {}}>
          <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
        </ForgotPassword>

      </Container>
    </ScrollView>
  </KeyboardAvoidingView>
  <CreateAccountButton onPress={() => navigation.navigate('SingUp')} >
    <Icon name="log-in" size={20} color="#f99000"></Icon>
    <CreateAccountButtonText>
      Criar uma conta
    </CreateAccountButtonText>
  </CreateAccountButton>
  </> )
}

export default SingIn;
