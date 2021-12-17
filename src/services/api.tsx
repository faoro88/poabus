import axios from 'axios';

export const onibus = axios.create({
  baseURL:
    'http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%25&t=o',
});

export const lotacao = axios.create({
  baseURL:
    'http://www.poatransporte.com.br/php/facades/process.php?a=nc&p=%25&t=l',
});

export const itinerario = axios.create({
  baseURL: 'http://www.poatransporte.com.br/php/facades/process.php?a=il',
});
