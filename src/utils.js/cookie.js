export const setCookie = (nome, valor, diasExpiracao = 7) => {
  const data = new Date();
  data.setTime(data.getTime() + diasExpiracao * 24 * 60 * 60 * 1000);
  const expiracao = "expires=" + data.toUTCString();
  document.cookie = nome + "=" + valor + ";" + expiracao + ";path=/";
};

export const getCookie = (name) => {
  const cookie = document?.cookie
    ?.split("; ")
    ?.find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];

  return cookie;
};

export const deleteCookie = (nome, path = "/") => {
  const data = new Date(0);
  const expiracao = "expires=" + data.toUTCString();

  document.cookie = `${nome}=; ${expiracao}; path=${path}`;
};
