# SDK para desenvolvimento
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dev
WORKDIR /app

# Instalar dependências
COPY ./src/Api/Api.csproj ./
RUN dotnet restore

# Copiar o código fonte
COPY . .

# Habilitar hot reload
CMD ["dotnet", "watch", "--no-restore", "--non-interactive", "--project", "src/Api/Api.csproj", "run"]
