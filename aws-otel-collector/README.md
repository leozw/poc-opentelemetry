## **🚀 Implantando o AWS OpenTelemetry Collector em uma instância EC2**

Este guia fornece um passo a passo para ajudá-lo a implantar e configurar o AWS OpenTelemetry Collector em uma instância EC2.

### **📋 Pré-requisitos**

- Uma conta AWS.
- Ferramenta AWS CLI configurada (opcional, mas útil para algumas etapas).
- Conhecimento básico de instâncias EC2 e grupos de segurança.

### **🚦 Passo 1: Lance uma instância EC2**

1. Entre no **[AWS Management Console](https://aws.amazon.com/console/)**.
2. Selecione o serviço EC2 e clique em **`Lançar instância`**.
3. Escolha a AMI (Amazon Machine Image) de sua preferência. Para fins deste guia, vamos usar o Amazon Linux 2.
4. Selecione o tipo de instância (por exemplo, **`t2.micro`**).
5. Siga as etapas do assistente de lançamento. Mantenha as configurações padrão, mas preste atenção especial às configurações do grupo de segurança na próxima etapa.

### **🛡 Passo 2: Configurações de Segurança**

Durante a etapa **`Configurar Grupo de Segurança`** do assistente:

1. Crie um novo grupo de segurança ou modifique um existente.
2. Adicione uma regra para permitir o tráfego TCP entrante na porta **`4317`**.

### **🌍 Passo 3: Conecte-se à sua instância EC2**

Depois de lançar sua instância:

1. Obtenha o endereço IP público da sua instância EC2.
2. Use o SSH para se conectar:
    
    ```sql
    ssh ec2-user@YOUR_EC2_IP_ADDRESS -i path_to_your_key.pem
    
    ```
    

### **📦 Passo 4: Instale o AWS OpenTelemetry Collector**

Execute os comandos a seguir:

```bash
curl --location https://github.com/aws-observability/aws-otel-collector/releases/latest/download/aws-otel-collector-x86_64.rpm -o aws-otel-collector.rpm
sudo rpm -Uvh aws-otel-collector.rpm

```

### **🖋 Passo 5: Adicione sua configuração**

1. Copie seu arquivo **`config.yaml`** para a instância EC2 (use **`scp`** ou outro método de sua preferência):
    
    ```bash
    scp -i path_to_your_key.pem config.yaml ec2-user@YOUR_EC2_IP_ADDRESS:~/
    
    ```
    
2. Mova o arquivo de configuração para o diretório apropriado na EC2:
    
    ```bash
    sudo mv config.yaml /etc/otel-collector/config.yaml
    
    ```
    

### **🔄 Passo 6: Inicie o AWS OpenTelemetry Collector**

```bash
sudo systemctl start aws-otel-collector
sudo systemctl enable aws-otel-collector

```

### **✅ Passo 7: Verifique o status**

```bash
sudo systemctl status aws-otel-collector

```

### **📜 Passo 8: Monitore os logs**

```bash
sudo tail -f /var/log/aws-otel-collector/collector.log

```

---

E é isso! Com isso, você terá o AWS OpenTelemetry Collector em execução em sua instância EC2 e pronto para receber e processar dados. Lembre-se de ajustar a configuração e a infraestrutura conforme necessário, dependendo do volume de dados e das necessidades específicas de sua aplicação.