FROM microsoft/dotnet:2.1.0-aspnetcore-runtime

WORKDIR /app

COPY out/ ./

CMD export ASPNETCORE_URLS=http://*:$PORT && dotnet GymAPI.dll
