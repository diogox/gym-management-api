FROM microsoft/dotnet:2.1-sdk

COPY ./ /root/
WORKDIR /root/

#RUN curl https://api.nuget.org/v3/index.json
RUN dotnet restore GymAPI.csproj

CMD ASPNETCORE_URLS=http://*:$PORT dotnet out/GymAPI.dll
