#include <iostream>
#include <string>
#include <WS2tcpip.h>
#pragma comment(lib, "ws2_32.lib")

int main()
{
    WSADATA data;
    WORD version = MAKEWORD(2, 2);
    int wsResult = WSAStartup(version, &data);

    SOCKET clientSocket = socket(AF_INET, SOCK_STREAM, 0);

    const char* ipAddress = "127.0.0.1";  
    int port = 3000;

    sockaddr_in serverAddress;
    serverAddress.sin_family = AF_INET;
    serverAddress.sin_port = htons(port);
    inet_pton(AF_INET, ipAddress, &(serverAddress.sin_addr));

    int connectResult = connect(clientSocket, (sockaddr*)&serverAddress, sizeof(serverAddress));

    std::cout << "connected: " << ipAddress << ":" << port << std::endl;

    std::string message = "Hello, server!";
    int sendResult = send(clientSocket, message.c_str(), message.size(), 0);

    char buffer[4096];
    memset(buffer, 0, sizeof(buffer));
    int bytesReceived = recv(clientSocket, buffer, sizeof(buffer), 0);

    if (bytesReceived > 0)
    {
        std::cout << "Message from server: " << buffer << std::endl;
    }

    closesocket(clientSocket);
    WSACleanup();

    return 0;
}