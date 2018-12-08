FROM microsoft/dotnet:2.1-sdk

COPY ./ /app/
WORKDIR /app

RUN dotnet restore GymAPI.csproj
RUN dotnet publish -c Release -o ./out

COPY out/ ./

CMD export ASPNETCORE_URLS=http://*:$PORT && dotnet GymAPI.dll
