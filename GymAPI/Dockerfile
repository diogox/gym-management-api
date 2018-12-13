FROM microsoft/dotnet:2.1-sdk

COPY ./GymAPI.Web app/web
COPY ./Tests app/tests

WORKDIR /app/tests
RUN dotnet add reference /app/web/GymAPI.csproj
RUN dotnet restore
