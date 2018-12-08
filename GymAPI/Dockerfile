FROM microsoft/dotnet:2.1-sdk

COPY ./ app/
WORKDIR /app
RUN dotnet restore && dotnet publish -c Release -o ./bin/Release/PublishOutput
COPY bin/Release/PublishOutput/ ./

CMD export ASPNETCORE_URLS=http://*:$PORT && dotnet GymAPI.dll
