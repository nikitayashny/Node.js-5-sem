#define _WINSOCK_DEPRECATED_NO_WARNINGS

#pragma comment(lib, "WS2_32.lib")

#include <iostream>
#include <cstring>
#include <winsock2.h>

const int BUFFER_SIZE = 1024;
const int SERVER_PORT = 3000; // Здесь указывается порт, на котором запущен UDP-сервер

int main() {
    WSADATA wsaData;
    if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0) {
        std::cerr << "Failed to initialize winsock" << std::endl;
        return 1;
    }

    SOCKET clientSocket;
    sockaddr_in serverAddress;
    char buffer[BUFFER_SIZE];

    clientSocket = socket(AF_INET, SOCK_DGRAM, 0);

    serverAddress.sin_family = AF_INET;
    serverAddress.sin_port = htons(SERVER_PORT);

    if (inet_addr("127.0.0.1") == INADDR_NONE) {
        std::cerr << "Invalid server address" << std::endl;
        closesocket(clientSocket);
        WSACleanup();
        return 1;
    }
    serverAddress.sin_addr.s_addr = inet_addr("127.0.0.1");

    const char* message = "Hello, server!";

    int sentBytes = sendto(clientSocket, message, strlen(message), 0,
        (struct sockaddr*)&serverAddress, sizeof(serverAddress));

    sockaddr_in responseAddress;
    int responseAddressLength = sizeof(responseAddress);

    int receivedBytes = recvfrom(clientSocket, buffer, BUFFER_SIZE, 0,
        (struct sockaddr*)&responseAddress, &responseAddressLength);

    std::cout << "Response from server: " << std::string(buffer, receivedBytes) << std::endl;

    closesocket(clientSocket);
    WSACleanup();
    return 0;
}