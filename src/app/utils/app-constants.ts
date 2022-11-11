import { MacroCategoryDto } from "../core/api/stingify/models"


export enum TOASTER_TYPE {
  ERROR = 'Il server ha riscontrato un errore interno e non ha potuto completare la richiesta.',
  WARNING = '',
  SUCCESS = '',
  INFO = '',
}

export enum RuolesEnum {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum ThemesEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum AmountTypesEnum {  
  Expense = 1 ,
  Incoming = 2, 
  Saving = 3
}

export const NO_MACRO_CATEGORY: MacroCategoryDto = {
  macroCategoryId: -1,
  description: "none"
}
