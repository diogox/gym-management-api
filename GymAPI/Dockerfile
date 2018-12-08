FROM microsoft/dotnet:2.1-sdk

COPY ./ app/
WORKDIR /app
RUN dotnet restore && dotnet publish -c Release

export ASPNETCORE_URLS=http://*:$PORT && dotnet bin/Release/netcoreapp2.1/publish/GymAPI.dll
