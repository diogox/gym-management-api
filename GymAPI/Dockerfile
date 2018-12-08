FROM microsoft/dotnet:2.1-sdk

COPY ./ /app/
WORKDIR /app

RUN dotnet build
RUN dotnet publish -c Release -o ./out

CMD export ASPNETCORE_URLS=http://*:$PORT && dotnet GymAPI.dll
