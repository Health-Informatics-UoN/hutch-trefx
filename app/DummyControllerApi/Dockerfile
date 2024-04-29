FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["app/DummyControllerApi/DummyControllerApi.csproj", "app/DummyControllerApi/"]
RUN dotnet restore "app/DummyControllerApi/DummyControllerApi.csproj"
COPY . .
WORKDIR "/src/app/DummyControllerApi"
RUN dotnet build "DummyControllerApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DummyControllerApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DummyControllerApi.dll"]
