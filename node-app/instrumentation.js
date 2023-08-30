const opentelemetry = require("@opentelemetry/sdk-node");
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-proto");
const { OTLPMetricExporter } = require("@opentelemetry/exporter-metrics-otlp-proto");
const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');

const sdk = new opentelemetry.NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: "http://localhost:4318/v1/traces",
    headers: {},
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: 'http://localhost:4318/v1/metrics',
      headers: {},
      concurrencyLimit: 1,
    }),
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();

// const opentelemetry = require("@opentelemetry/sdk-node");
// const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
// const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-proto");
// const { OTLPMetricExporter } = require("@opentelemetry/exporter-metrics-otlp-proto");
// const { PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
// const { NodeTracerProvider } = require('@opentelemetry/node');
// const { registerInstrumentations } = require('@opentelemetry/instrumentation');
// const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
// const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');

// const provider = new NodeTracerProvider();
// provider.register();

// registerInstrumentations({
//   instrumentations: [
//     new HttpInstrumentation(),
//     new ExpressInstrumentation(),
//   ],
//   tracerProvider: provider,
// });

// const sdk = new opentelemetry.NodeSDK({
//   traceExporter: new OTLPTraceExporter({
//     url: "http://localhost:4318/v1/traces",
//     headers: {},
//   }),
//   metricExporter: new OTLPMetricExporter({
//     url: 'http://localhost:4318/v1/metrics',
//     headers: {},
//     concurrencyLimit: 1,
//   }),
//   instrumentations: [getNodeAutoInstrumentations()],
//   tracerProvider: provider,
// });

// sdk.start();


// const { NodeSDK } = require('@opentelemetry/sdk-node');
// const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
// const { ConsoleMetricExporter } = require('@opentelemetry/sdk-metrics');
// const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');

// // Configuração do exportador de rastreamento para console
// const traceExporter = new ConsoleSpanExporter();

// // Configuração do exportador de métricas para console
// const metricExporter = new ConsoleMetricExporter();

// // Configuração do SDK do OpenTelemetry
// const sdk = new NodeSDK({
//   traceExporter,
//   metricExporter,
//   instrumentations: [getNodeAutoInstrumentations()],
// });

// // Iniciar o SDK do OpenTelemetry
// sdk.start();


/* instrumentations.js */


/*instrumentation.js*/
// const { NodeSDK } = require('@opentelemetry/sdk-node');
// const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-node');
// const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
// const { PeriodicExportingMetricReader, ConsoleMetricExporter } = require('@opentelemetry/sdk-metrics');

// const sdk = new NodeSDK({
//   traceExporter: new ConsoleSpanExporter(),
//   metricReader: new PeriodicExportingMetricReader({
//     exporter: new ConsoleMetricExporter()
//   }),
//   instrumentations: [getNodeAutoInstrumentations()]
// });

// sdk
//   .start()
