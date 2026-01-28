FROM openresty/openresty:alpine AS builder
RUN apk add --no-cache perl curl \
    && opm install SkyLothar/lua-resty-jwt

COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY conf.d/ /usr/local/openresty/nginx/conf/conf.d/