FROM microsoft/dotnet:2.1-sdk

COPY ./ app/
WORKDIR /app
RUN dotnet restore && dotnet publish -c Release
COPY bin/Release/netcoreapp2.1/publish/ ./

CMD export ASPNETCORE_URLS=http://*:$PORT && dotnet GymAPI.dll
