FROM microsoft/dotnet:2.1-sdk

COPY ./ app/
WORKDIR /app
RUN dotnet restore && dotnet publish -c Release GymAPI.Web

CMD export ASPNETCORE_URLS=http://*:$PORT && dotnet GymAPI.Web/bin/Release/netcoreapp2.1/publish/GymAPI.dll
