# SDK para desenvolvimento
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dev
WORKDIR /app

# Instalar dependências
COPY *.csproj ./
RUN dotnet restore

# Copiar o código fonte
COPY . .

# Habilitar hot reload
CMD ["dotnet", "watch", "run", "--no-restore"]
