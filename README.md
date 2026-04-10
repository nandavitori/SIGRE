# Projeto Jaca - Sistema de Alocação UEPA

Este repositório contém a stack completa do sistema de gestão de salas e reservas da UEPA, integrando um backend em FastAPI com um frontend em React.

## 🚀 Estrutura do Monorepo

O projeto está organizado da seguinte forma:

-   **/backend**: API REST desenvolvida em FastAPI (Python). [Veja mais](./backend/README.md)
-   **/frontend**: Interface administrativa desenvolvida em React + Vite.

---

## 🛠️ Começando (Docker)

A forma recomendada de executar o projeto é utilizando Docker e Docker Compose, que orquestra ambos os serviços simultaneamente.

### Pré-requisitos
- Docker e Docker Compose instalados.

### Executar o Ambiente
1.  **Configuração de Ambiente**:
    Crie o arquivo [.env](./.env) baseando-se no que foi centralizado na raiz.
    
2.  **Subir os serviços**:
    ```bash
    docker compose up --build -d
    ```

3.  **Encerrar os serviços**:
    ```bash
    docker compose down
    ```

---

## 📖 Acesso aos Serviços

Com o ambiente rodando, você pode acessar:

-   **Frontend (Web)**: [http://localhost:3000](http://localhost:3000)
-   **Backend (API)**: [http://localhost:8000](http://localhost:8000)
-   **Documentação API (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## ⚙️ Variáveis de Ambiente

As configurações são centralizadas no arquivo `.env` na raiz do projeto. As principais variáveis incluem:

-   `DATABASE_URL`: Conexão com o banco de dados.
-   `JWT_SECRET`: Chave para autenticação.
-   `GOOGLE_CLIENT_ID` / `SECRET`: Credenciais para integração com Google Calendar.
-   `BACKEND_PORT` / `FRONTEND_PORT`: Portas de exposição dos serviços.

---

## 🧹 Manutenção Especial

Caso precise realizar um reset completo do ambiente (reconstruir imagens e limpar cache):

```bash
docker compose down -v --rmi local
docker compose up --build -d
```

---

## 👥 Credenciais Padrão (Ambiente de Dev)
- **Usuário**: `admin@uepa.br` (username: `admin`)
- **Senha**: `admin456`
