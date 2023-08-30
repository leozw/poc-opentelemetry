FROM node:20.2.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV OTEL_SERVICE_NAME=service-node
ENV OTEL_TRACES_EXPORTER=otlp 
ENV OTEL_METRICS_EXPORTER=otlp

EXPOSE 8080

CMD ["node", "app.js"]
