import { Rule } from 'ant-design-vue/es/form';

export const patterns = {
  url: /https?:\/\/(?:www\.)?[\w@:%._\-+~#=]{1,256}\.[\w()]{1,6}\b(?:[\w()@:%_+.~#?&/=]*)/g,
};

export const booleanValidator = async (_rule: Rule, value: boolean) => {
  if (value) {
    return Promise.resolve();
  } else {
    return Promise.reject('Пожалуйста дайте согласие на обработку персональных данных!');
  }
};

export const repeatPasswordValidator = (password: string) => async (_rule: Rule, value: string) => {
  if (value === password) {
    return Promise.resolve();
  } else {
    return Promise.reject('Пароли не совпадают!');
  }
};
