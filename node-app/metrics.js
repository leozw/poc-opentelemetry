const { MeterProvider } = require('@opentelemetry/metrics');
const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus');

// Cria um provedor de métricas
const createMetricsProvider = () => {
  const meterProvider = new MeterProvider({
    exporter: new PrometheusExporter({
      endpoint: 'http://localhost:8888/metrics', // Endpoint do Prometheus
    }),
    interval: 1000, // Intervalo de exportação das métricas em milissegundos
  });

  return meterProvider;
};

module.exports = createMetricsProvider;
