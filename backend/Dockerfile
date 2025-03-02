# SDK para desenvolvimento
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dev
WORKDIR /app

# Copiar o código fonte
COPY . .

# Restaurar pacotes
RUN dotnet restore TodoBack.sln

# Habilitar hot reload
CMD ["dotnet", "watch", "--no-restore", "--non-interactive", "--project", "src/Api/Api.csproj", "run"]
