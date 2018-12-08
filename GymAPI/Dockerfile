FROM microsoft/dotnet:2.1-sdk

WORKDIR /app

COPY bin/Release/PublishOutput/ ./

CMD export ASPNETCORE_URLS=http://*:$PORT && dotnet GymAPI.dll
