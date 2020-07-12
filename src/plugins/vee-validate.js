//import Vue from 'vue'
import { extend } from 'vee-validate'
import { email, max, min, required } from 'vee-validate/dist/rules'
//import * as rules from 'vee-validate/dist/rules'

import { localize } from 'vee-validate'
import en from '../locales/en'
//import es from '../locales/es'

//extend('email', email)
//extend('max', max)
//extend('min', min)
//extend('numeric', numeric)
//extend('required', required)

//setInteractionMode('eager')
/*Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})*/
extend('required', {
  ...required,
  message: 'Campo requerido.',
})
extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})
extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters',
})
extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max
  },
  params: ['min', 'max'],
  message: '{_field_} debe ser entre {min} and {max} caracteres.',
})
extend('email', {
  ...email,
  message: 'Correo Electrónico debe ser válido.',
})
extend('password2', {
  validate(value) {
    let regex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{1,16})'
    )
    return regex.test(value)
  },
  message:
    'La contraseña debe contener al menos: 1 letra mayúscula, 1 letra minuscula, 1 número, y un caracter especial',
  // 'The password must contain at least: 1 uppercase letter, 1 lowercase letter and 1 digit',
})
extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Las contraseñas no coinciden',
})

localize({
  en,
})

//Vue.component('validation-provider', ValidationProvider)
//Vue.component('validation-observer', ValidationObserver)
