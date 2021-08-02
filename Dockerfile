FROM node:16-stretch AS build-env
ADD . /build
WORKDIR /build
RUN yarn

FROM node:16-alpine
ENV NODE_ENV=production
COPY --from=build-env /build /app
WORKDIR /app
CMD ["yarn", "start"]
