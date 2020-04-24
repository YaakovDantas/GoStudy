import React, {useCallback, useRef} from 'react';
import { Alert, TextInput, Image, ScrollView ,View, Platform, KeyboardAvoidingView } from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import logoImg from '../../assets/logo.png';
import api from '../../services/api';
import * as Yup from "yup";
import getValidationErrors from "../../utils/getValidationErrors";

import {Container, Title, BackToSingIn, BackToSingInText} from './styles';

interface SingUpFormData {
  email: string;
  name: string;
  password: string;
}

const SingUp: React.FC = () => {
  const navigation = useNavigation()
  const formRef = useRef<FormHandles>(null)
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

  const handleSubmit = useCallback(
    async (data: SingUpFormData) => {

      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('E-mail deve ser válido'),
          password: Yup.string().min(6, 'Deve conter 6 digitos'),
        });

        await schema.validate(data, { abortEarly: false });

        const response = await api.post('/users', data);

        Alert.alert("Sucesso", 'Conta criada', )
        navigation.goBack()
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        Alert.alert("Erro", 'Falha', )
      }
    },
    [navigation],
  );
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
          <Title>Crie sua conta</Title>
        </View>
      <Form ref={formRef} onSubmit={handleSubmit}>

        <Input returnKeyType="next" onSubmitEditing={() => {emailInputRef.current?.focus()}} autoCapitalize="words" name="name" icon="user"  placeholder="Nome"/>

        <Input ref={emailInputRef} onSubmitEditing={() => {passwordInputRef.current?.focus()}} returnKeyType="next" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} name="email" icon="mail"  placeholder="Email"/>

        <Input ref={passwordInputRef} returnKeyType="send" onSubmitEditing={() => {formRef.current?.submitForm()}} secureTextEntry textContentType="newPassword" name="password" icon="lock"  placeholder="Senha"/>

        <Button onPress={() => {formRef.current?.submitForm()}}>Criar</Button>
      </Form>

      </Container>
    </ScrollView>
  </KeyboardAvoidingView>
  <BackToSingIn onPress={() => navigation.navigate('SingIn')} >
    <Icon name="arrow-left" size={20} color="#fff"></Icon>
    <BackToSingInText>
      Voltar para logon
    </BackToSingInText>
  </BackToSingIn>
  </> )
}

export default SingUp;
